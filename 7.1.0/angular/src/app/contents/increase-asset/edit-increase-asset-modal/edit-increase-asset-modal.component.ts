import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
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
  depreciationOfAssetMessage ='';
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
    
    // this.submitForm.form.reset();
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
    
    this.modalSave.emit(this.asset);
    this.close();
  }
  close(): void {
    
    // this.active = false;
    // this.userPasswordRepeat = "";
    // this.submitForm.form.reset();
    this.modal.hide();
    // this._router.navigate(['app/contents/increase-asset']);
  }
  // searchAsset(){
  //   var newAsset = new AssetDto;
  //   newAsset =this.asset;
  //   this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
  //   newAsset = this.assetList?.find((item) => item.assetCode == newAsset?.assetCode);
  //   if(!newAsset){
  //     this.resetAsset();
  //     this.assetMessage = "Mã tài sản không tồn tại hoặc đã được ghi tăng";
  //   }
  //   else{
  //     this.asset = newAsset;
  //     this.assetMessage = "";
  //   }
  // }
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
  // getAssets(){
  //   this.assetService.getAssets().subscribe((result)=>{
      
  //     this.assetHaveNotIncreaseList = result.items.filter((item)=> item.increaseAssetId == null);
  //     this.assetList = this.assetHaveNotIncreaseList;
  //   });
   
  // }

  // clickEditAssetSelected(){
  //   // this.searchAsset();
  //   if(this.assetMessage  != ""){
  //     this.message.warn(this.l('Không hợp lệ vui lòng kiểm tra lại'));
  //   }
  //   else{
  //     var newAsset = new AssetDto;
  //     newAsset =this.asset;
  //     this.addAssetToIncreaseList.push(newAsset);
  //     this.asset = new AssetDto;
  //     // 
  //     this.assetList = [];
      
  //   }
   
  // }
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
  onSelecEmployee(){

  }
  onSelectDepartmentFromTable(asset : AssetDto){

  }
  getAmortizationValueAndResidualValue(){
    this.resetResidualValueAndDepreciationOfAsset();
    
    if(this.asset.orginalPrice){
      this.checkDepreciationOfAsset();
      // this.asset.residualValue = this.asset.orginalPrice - this.asset.depreciationOfAsset;
      this.asset.annualAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset)).toFixed(3));
      this.asset.monthlyAmortizationValue = Number((this.asset.annualAmortizationValue/12).toFixed(3));
      // this.checkDepreciationOfAsset();
    }
  }
  checkDepreciationOfAsset(){
    
    if(this.asset.depreciationOfAsset < this.asset.orginalPrice){
      this.asset.residualValue = this.asset.orginalPrice - this.asset.depreciationOfAsset;
      this.depreciationOfAssetMessage = "";
    }
    else{
      this.asset.residualValue = this.asset.orginalPrice;
      this.depreciationOfAssetMessage ="Giá trị không hợp lệ";
    }
    
  }
  resetResidualValueAndDepreciationOfAsset(){
    this.asset.monthlyAmortizationValue = 0;
    this.asset.annualAmortizationValue = 0;
    this.asset.residualValue = 0;
    // this.asset.depreciationOfAsset = 0;
  }
}
