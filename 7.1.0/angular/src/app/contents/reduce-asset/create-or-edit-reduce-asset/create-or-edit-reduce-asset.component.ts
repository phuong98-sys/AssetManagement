import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, ReduceAssetInputDto, ReduceAssetServiceProxy, AssetInputDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-reduce-asset',
  templateUrl: './create-or-edit-reduce-asset.component.html',
  styleUrls: ['./create-or-edit-reduce-asset.component.css']
})
export class CreateOrEditReduceAssetComponent extends AppComponentBase implements OnInit {
  // @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("reduceAssetForm", { static: true }) private submitForm: NgForm;
  // @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  reduceAsset: ReduceAssetInputDto = new ReduceAssetInputDto();
  reduceAssetList: ReduceAssetInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  assetHaveNotReduceList: AssetDto[];
  addAssetToReduceList:  any[] = [];
  assetMessage = '';
  reduceAssetId: number;
  reduceAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  deleteAssetConfirmedList : any[] = [];
  // assetTypeList: ReduceAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  isSelectedAsset = false;
  isSelectedAllAsset = false;
  
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private reduceAssetService: ReduceAssetServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.reduceAssetId = Number(this._activatedRoute.snapshot.params['id']);
          this.assetService.getAssetReduced(this.reduceAssetId).subscribe((result)=>{
            
              this.addAssetToReduceList = result.items;
          });
        }
  }

  ngOnInit(): void {
    this.getAssets();
    this.getReduceAssetForEdit();
    this.getReduceAssets();
  }
  getReduceAssets(){
    this.reduceAssetService.getReduceAssets().subscribe((result) => {
      this.reduceAssetList = result.items;
    });
  }
  show(reduceAsset?: ReduceAssetInputDto): void {
    if(reduceAsset?.id){
      this.reduceAsset = reduceAsset;
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
       this.reduceAsset.creationTime =  moment.utc(this.reduceAsset.creationTime.toString());
       this.reduceAsset.reduceAssetDate = moment.utc( this.reduceAsset.reduceAssetDate.toString());
          this.reduceAssetService.insertOrUpdateReduceAsset(this.reduceAsset)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((result) => {
              this.reduceAsset = result;
              this.addAssetToReduceList.map((item) => { 
                item.reduceAssetId = this.reduceAsset.id;
                item.reduceAssetDate = moment.utc( this.reduceAsset.reduceAssetDate.toString());
                });
              this.assetService.reduceAssetList(this.addAssetToReduceList).subscribe();
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
    this._router.navigate(['app/contents/reduce-asset']);
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
    
    var index = this.addAssetToReduceList.findIndex(c => c.id == asset.id);
    this.addAssetToReduceList[index] = asset;
    var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    this.addAssetToReduceList[index].amortizationValue = amortizationValue;
  }
  getAssets(){
    this.assetService.getAssets().subscribe((result)=>{
      
      this.assetHaveNotReduceList = result.items.filter((item)=> item.reduceAssetId == null);
      this.assetList = this.assetHaveNotReduceList;
    });
   
  }

  clickReduceAsset(){
    var newAsset = new AssetDto;
    newAsset =this.asset;
    this.addAssetToReduceList.push(newAsset);
    this.asset = new AssetDto;
    // 
     this.assetList = this.assetHaveNotReduceList.filter(x => !this.addAssetToReduceList.map(y => y?.assetCode).includes(x?.assetCode));
  }
  setReduceAssetCode(){
    var reduceAsset = this.reduceAssetList.find(x=> x.reduceAssetCode == this.reduceAsset.reduceAssetCode);
    if(reduceAsset && reduceAsset.id != this.reduceAssetId){
      this.reduceAssetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.reduceAssetCodeMessage = "";
    }
  }
  getReduceAssetForEdit(){
    this.reduceAssetService.getReduceAsset(this.reduceAssetId)
      .subscribe((result) =>{
        
        this.reduceAsset = result;
        this.reduceAsset.creationTime = result["creationTime"]? result["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.reduceAsset.reduceAssetDate = result["reduceAssetDate"]? result["reduceAssetDate"].format("YYYY-MM-DD"):<any>undefined;
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

              this.addAssetToReduceList = this.addAssetToReduceList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 
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
              this.addAssetToReduceList = this.addAssetToReduceList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 

          }
      }
  );
  }
  editAssetItemFromTable(asset : AssetDto){
    // this.editReduceAssetModal.show(asset);s
  }
  // editReduceAsset(asset : AssetDto){
  //   console.log("event =", asset);

  // }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.addAssetToReduceList.length-1; i>= 0; i-- ){
        debugger
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToReduceList.length-1; i>= 0; i-- ){
        debugger
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
}
