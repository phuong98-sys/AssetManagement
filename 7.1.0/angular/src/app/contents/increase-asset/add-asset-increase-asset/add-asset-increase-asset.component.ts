import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { AssetDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

@Component({
  selector: 'app-add-asset-increase-asset',
  templateUrl: './add-asset-increase-asset.component.html',
  styleUrls: ['./add-asset-increase-asset.component.css']
})
export class AddAssetIncreaseAssetComponent extends  AppComponentBase implements OnInit {

  @ViewChild("AddAssetIncreaseModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  // @Input() revertAssetList : AssetDto [] = [];
  active = false;
  saving = false;
  loading = false;
  asset: AssetDto = new AssetDto();
  assetList : AssetDto[];
  totalRecords = 0;
  selectedAssetIncreaseList : AssetDto[] = [];
  handlingMethodList : any;//
  selectedHandlingMethod: any;//
  // lebelTotalAssetSelected = 0;
  totalAsset = 0;
   
  sortOrder = -1;

  sortField = "assetCode";

  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private _router: Router) {   
        super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
  }
  ngOnInit(): void {
    this.getAssets();
  }
  // onSort(event) {
  //   console.log(document.getElementsByTagName('tr'))
  //   console.log(document.getElementById('row-0')[0])
  //   console.log(document.getElementsByClassName('.p-selectable-row'))
  //   if (document.getElementsByTagName('tr')[0]) {
  //     document.getElementsByTagName('tr')[0].click
  //     document.getElementById('row-0')[0].click

  //   }
  // }

  show(revertAssetList?: AssetDto[]){
    debugger
    if(revertAssetList.length > 0){
      this.assetList = [ ...this.assetList, ...revertAssetList];
    }
    this.assetList.sort((a,b) => a.assetCode.localeCompare(b.assetCode));
    this.modal.show();
    
  }
  // getAssets(){
  //   this.assetService.getAssets().subscribe((result)=>{
      
  //     this.assetHaveNotIncreaseList = result.items.filter((item)=> item.increaseAssetId == null);
  //     this.assetList = this.assetHaveNotIncreaseList;
  //   });
   
  // }
  getAssets(event?: LazyLoadEvent){
    //   if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator?.changePage(0);
    //     return;
    // }
    
    this.primengTableHelper.showLoadingIndicator();
      this.loading = true;
      this.assetService.getAssets()
      .subscribe(result => {
        this.loading = false;
          this.assetList = result.items.filter((item)=> item.increaseAssetId == null);
          debugger
          this.totalAsset = this.assetList.length-1;
          // this.assetList.map((item)=>{ 
          //   // item.creationTime = item.creationTime? moment(item.creationTime).format("DD/MM/YYYY") : undefined;
          //   // item.increaseAssetDate = item.increaseAssetDate ? moment(item.increaseAssetDate).format("DD/MM/YYYY") : undefined
          // });
          // this.primengTableHelper.totalRecordsCount = result.items.length;
          // this.primengTableHelper.records = result.items;
          // this.primengTableHelper.hideLoadingIndicator();
      });
    }
  save(){
    // if (this.validateForm(this.submitForm.form)) {
    //   this.saving= true;
    //     // this.asset.usageStatus="Chưa sử dụng";
    //     this.increaseAssetService
    //     .insertOrUpdateIncreaseAsset(this.increaseAsset)
    //     .pipe(
    //         finalize(() => {
    //             this.saving = false;
    //         })
    //     )
    //     .subscribe(() => {
    //         this.notify.info(this.l("SavedSuccessfully"));
    //         this.close();
    //         this.modalSave.emit(null);
    //     });
    //   }
    debugger
    this.assetList = this.assetList.filter(x => !this.selectedAssetIncreaseList.map(y => y?.id).includes(x?.id));
    this.modalSave.emit(this.selectedAssetIncreaseList);
    this.selectedAssetIncreaseList = [];
    this.close();
  }
  close(): void {
    this.active = false;
    // this.userPasswordRepeat = "";
    this.modal.hide();
    
    // this.submitForm.form.reset();

  }
  // renderAmortizationValue(){
  //   this.asset.monthlyAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  // }
  onSelectedAssetIncreasse(asset : AssetDto, event ){
    debugger
    console.log(event.target.checked);
    
    if(event.target.checked)
    {
      this.selectedAssetIncreaseList.push(asset);
      // this.lebelTotalAssetSelected ++;
    }
    else{
      var index = this.selectedAssetIncreaseList?.indexOf(asset);
      if (index !== -1) {
          this.selectedAssetIncreaseList.splice(index, 1);
      }   
      // this.lebelTotalAssetSelected--;     
    }

  }
  clickUnTickAssetListSeleted(){
    debugger
      for( let i = this.selectedAssetIncreaseList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAssetIncrease"]:checked'  ;
        $(selector).click();
    } 
  
    this.selectedAssetIncreaseList = [];
    // this.lebelTotalAssetSelected = 0;
  }
  onSelectedAllAsset(event){
    debugger
    if(event.target.checked){
      for( let i = this.totalAsset; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAssetIncrease"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.totalAsset; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAssetIncrease"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}
}
