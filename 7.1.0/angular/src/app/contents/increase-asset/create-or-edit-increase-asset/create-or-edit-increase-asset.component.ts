import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, IncreaseAssetDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { EditIncreaseAssetModalComponent } from '../edit-increase-asset-modal/edit-increase-asset-modal.component';
declare var $:any;
@Component({
  selector: 'app-create-or-edit-increase-asset',
  templateUrl: './create-or-edit-increase-asset.component.html',
  styleUrls: ['./create-or-edit-increase-asset.component.css']
})
export class CreateOrEditIncreaseAssetComponent extends AppComponentBase implements OnInit {
  // @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("increaseAssetForm", { static: true }) private submitForm: NgForm;
  @ViewChild('editIncreaseAssetModal', { static: true }) editIncreaseAssetModal: EditIncreaseAssetModalComponent;
  // @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  increaseAsset: IncreaseAssetInputDto = new IncreaseAssetInputDto();
  increaseAssetList: IncreaseAssetInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  assetHaveNotIncreaseList: AssetDto[];
  addAssetToIncreaseList:  any[] = [];
  assetMessage = '';
  increaseAssetId: number;
  increaseAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  deleteAssetConfirmedList : any[] = [];
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  isSelectedAsset = false;
  isSelectedAllAsset = false;
  
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.increaseAssetId = Number(this._activatedRoute.snapshot.params['id']);
          this.assetService.getAssetIncreased(this.increaseAssetId).subscribe((result)=>{
            
              this.addAssetToIncreaseList = result.items;
          });
        }
  }

  ngOnInit(): void {
    this.getAssets();
    this.getIncreaseAssetForEdit();
    this.getIncreaseAssets();
  }
  getIncreaseAssets(){
    this.increaseAssetService.getIncreaseAssets().subscribe((result) => {
      this.increaseAssetList = result.items;
    });
  }
  show(increaseAsset?: IncreaseAssetInputDto): void {
    if(increaseAsset?.id){
      this.increaseAsset = increaseAsset;
      // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
    }
    // this.modal.show();
    
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      this.saving= true;
      // ghi tăng tài sản
       this.increaseAsset.creationTime =  moment.utc(this.increaseAsset.creationTime.toString());
       this.increaseAsset.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
          this.increaseAssetService.insertOrUpdateIncreaseAsset(this.increaseAsset)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((result) => {
              this.increaseAsset = result;
              this.addAssetToIncreaseList.map((item) => { 
                item.increaseAssetId = this.increaseAsset.id;
                item.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
                });
              this.assetService.increaseAssetList(this.addAssetToIncreaseList).subscribe();
              // xóa tài sản ghi tăng
              
              if(this.deleteAssetConfirmedList.length > 0 ){
                this.assetService.test(this.deleteAssetConfirmedList).subscribe();
              }
              this.notify.info(this.l("SavedSuccessfully"));
              this.close();
              // this.modalSave.emit(null);
          });
      }
  }
  close(): void {
    
    this.active = false;
    // this.userPasswordRepeat = "";
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/increase-asset']);
  }
  searchAsset(){
    var newAsset = new AssetDto;
    newAsset =this.asset;
    newAsset = this.assetList?.find((item) => item.assetCode == newAsset?.assetCode);
    if(!newAsset){
      
      this.assetMessage = "Mã tài sản không tồn tại hoặc đã được ghi tăng";
    }
    else{
      this.asset = newAsset;
      this.assetMessage = "";
    }
  }
  renderAmortizationValue(){
    this.asset.amortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  renderAmortizationValueOfAssetFromTable(asset : AssetDto){
    
    var index = this.addAssetToIncreaseList.findIndex(c => c.id == asset.id);
    this.addAssetToIncreaseList[index] = asset;
    var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
  }
  getAssets(){
    this.assetService.getAssets().subscribe((result)=>{
      
      this.assetHaveNotIncreaseList = result.items.filter((item)=> item.increaseAssetId == null);
      this.assetList = this.assetHaveNotIncreaseList;
    });
   
  }

  clickIncreaseAsset(){
    var newAsset = new AssetDto;
    newAsset =this.asset;
    this.addAssetToIncreaseList.push(newAsset);
    this.asset = new AssetDto;
    // 
     this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
  }
  setIncreaseAssetCode(){
    var increaseAsset = this.increaseAssetList.find(x=> x.increaseAssetCode == this.increaseAsset.increaseAssetCode);
    if(increaseAsset && increaseAsset.id != this.increaseAssetId){
      this.increaseAssetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.increaseAssetCodeMessage = "";
    }
  }
  getIncreaseAssetForEdit(){
    this.increaseAssetService.getIncreaseAsset(this.increaseAssetId)
      .subscribe((result) =>{
        
        this.increaseAsset = result;
        this.increaseAsset.creationTime = result["creationTime"]? result["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.increaseAsset.increaseAssetDate = result["increaseAssetDate"]? result["increaseAssetDate"].format("YYYY-MM-DD"):<any>undefined;
      })
  }
  onSelectedAsset(assetForEdit : AssetDto, event ){
    
    console.log(event.target.checked);
    debugger
    if(event.target.checked)
    {
      this.deleteAssetList.push(assetForEdit);
    }
    else{
      var index = this.deleteAssetList?.indexOf(assetForEdit);
      if (index !== -1) {
          this.deleteAssetList.splice(index, 1);
      }        
    }

  }
  onDeleteAssetListFromTable(){
    this.message.confirm(
      this.l('Tất cả tài sản đã chọn sẽ bị xóa khỏi bảng tài sản ghi tăng'),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              // this.deleteAssetList.forEach(assetId => {
              //   var index = this.addAssetToIncreaseList.indexOf(assetId);
              //   if (index !== -1) {
              //       this.deleteAssetList.splice(index, 1);
              //   }   
              // })

              this.addAssetToIncreaseList = this.addAssetToIncreaseList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 
              // this.assetService
              // .deleteAsset(asset.id)
              // .pipe(finalize(() => this.loading = false))
              // .subscribe(() => {
              //   
              //     this.getAssets();
              //     this.notify.success(this.l('SuccessfullyDeleted'));
              // });
          }
      }
  );
  }
  deleteAssetItemFromTable(asset : AssetDto){
    this.message.confirm(
      this.l('Tài sản với tên ' + asset.assetName+ " sẽ bị xóa"),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              this.deleteAssetList.push(asset);
              this.addAssetToIncreaseList = this.addAssetToIncreaseList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 

          }
      }
  );
  }
  editAssetItemFromTable(asset : AssetDto){
    this.editIncreaseAssetModal.show(asset);
  }
  // editIncreaseAsset(asset : AssetDto){
  //   console.log("event =", asset);

  // }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.addAssetToIncreaseList.length-1; i>= 0; i-- ){
        debugger
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToIncreaseList.length-1; i>= 0; i-- ){
        debugger
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    // var checkboxes = document.getElementsByName('selectedAsset');
    // for(var checkbox in checkboxes){
    //   checkbox = event.target.checked;
    // }
    // var checkboxes = document.getElementsByName('vehicle');
    // for (var checkbox in checkboxes) {
    //     checkbox.checked = this.checked;
    // }
    }
  }
}
