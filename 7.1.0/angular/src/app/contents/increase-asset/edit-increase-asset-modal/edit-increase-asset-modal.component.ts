import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, DepartmentDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-increase-asset-modal',
  templateUrl: './edit-increase-asset-modal.component.html',
  styleUrls: ['./edit-increase-asset-modal.component.css']
})
export class EditIncreaseAssetModalComponent extends AppComponentBase implements OnInit {
  @ViewChild("EditAssetIncreaseModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  asset: AssetDto = new AssetDto();
  increaseAsset: IncreaseAssetInputDto = new IncreaseAssetInputDto();
  increaseAssetList: IncreaseAssetInputDto[];
  assetList: AssetDto[];
  assetHaveNotIncreaseList: AssetDto[];
  addAssetToIncreaseList:  any[] = [];
  assetMessage = '';
  increaseAssetId: number;
  increaseAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  deleteAssetConfirmedList : any[] = [];
  departmentList : DepartmentDto[] = [];
  selectedDepartment: DepartmentDto;
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  isSelectedAsset = false;
  isSelectedAllAsset = false;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { 
    super(injector);
    if (this._activatedRoute.snapshot.params['id']) {
      this.increaseAssetId = Number(this._activatedRoute.snapshot.params['id']);
      this.assetService.getAssetIncreased(this.increaseAssetId).subscribe((result)=>{
        
          this.addAssetToIncreaseList = result.items;
      });
    }
  }

  ngOnInit(): void {
  }
  show(asset?: AssetDto): void {
    this.asset = asset;
    this.modal.show();
    
  }
  
  renderAmortizationValue(){
    this.asset.monthlyAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  getIncreaseAssets(){
    this.increaseAssetService.getIncreaseAssets().subscribe((result) => {
      this.increaseAssetList = result.items;
    });
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
                this.assetService.test(1,this.deleteAssetConfirmedList).subscribe();
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
    this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
    newAsset = this.assetList?.find((item) => item.assetCode == newAsset?.assetCode);
    if(!newAsset){
      this.resetAsset();
      this.assetMessage = "Mã tài sản không tồn tại hoặc đã được ghi tăng";
    }
    else{
      this.asset = newAsset;
      this.assetMessage = "";
    }
  }
  resetAsset(){
    this.asset.monthlyAmortizationValue = null;
    this.asset.assetName = null;
    this.asset.orginalPrice = null;
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
    this.searchAsset();
    if(this.assetMessage  != ""){
      this.message.warn(this.l('Không hợp lệ vui lòng kiểm tra lại'));
    }
    else{
      var newAsset = new AssetDto;
      newAsset =this.asset;
      this.addAssetToIncreaseList.push(newAsset);
      this.asset = new AssetDto;
      // 
      this.assetList = [];
      //  this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
    }
   
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
  onSelectDepartmet(){

  }
  onSelectDepartmentFromTable(asset : AssetDto){

  }
}
