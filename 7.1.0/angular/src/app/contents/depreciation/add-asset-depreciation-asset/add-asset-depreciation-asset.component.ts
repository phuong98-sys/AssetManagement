import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { AssetDto, AssetServiceProxy, AssetSuggestionHandlingDto, ReasonReduceDto, ReasonReduceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

@Component({
  selector: 'app-add-asset-depreciation',
  templateUrl: './add-asset-depreciation-asset.component.html',
  styleUrls: ['./add-asset-depreciation-asset.component.css']
})
export class AddAssetDepreciationAssetComponent extends  AppComponentBase implements OnInit {
  @ViewChild("AddAssetReduceModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  // @Input() revertAssetList : AssetDto [] = [];
  active = false;
  saving = false;
  loading = false;
  asset: AssetDto = new AssetDto();
  assetList : AssetDto[];
  totalRecords = 0;
  selectedAssetReduceList : AssetDto[] = [];
  handlingMethodList : any;//
  selectedHandlingMethod: any;//
  // lebelTotalAssetSelected = 0;
  totalAsset = 0;
   
  sortOrder = -1;

  sortField = "assetCode";
  reasonReduceList: ReasonReduceDto[] = [];
  selectedReasonReduce: ReasonReduceDto;
  assetListCopy: AssetDto[] = [];
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private reasonReduceService: ReasonReduceServiceProxy,
    private _router: Router) {   
        super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
  }
  ngOnInit(): void {
    this.getAssets();
    this.getReasonReduceList();
  }
  getReasonReduceList(){
    this.reasonReduceService.getReasonReduces()
    .subscribe((result)=>{
        this.reasonReduceList = result.items;
    });
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

  show(revertAssetList?: any[], selectedAssetList? : any[]){
    
    if(revertAssetList?.length > 0){
      this.assetList = [ ...this.assetList, ...revertAssetList];
    }
    if(selectedAssetList?.length > 0)
    {
      this.assetList = this.assetList.filter(x => !selectedAssetList.map(y => y?.id).includes(x?.id));
    }
      this.assetService.getAssets()
      .subscribe((ressult)=>{
        this.assetList = ressult.items.filter(x => this.assetList.map(y => y?.id).includes(x?.id));
        this.assetList.sort((a,b) => a.assetCode.localeCompare(b.assetCode));
        this.modal.show();
      });
  }
  getAsseCopys(){
    this.assetService.getAssets().subscribe((result)=>{
      this.assetService.getAssets()
      .subscribe((ressult)=>{
        this.assetListCopy = ressult.items;
      });
    });
   
  }
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
        
          this.assetList = result.items.filter((item)=> item.increaseAssetId != null && item.reduceAssetId == null);
        
          this.totalAsset = this.assetList.length-1;

      });
    }
  save(){
  
    
    this.assetList = this.assetList.filter(x => !this.selectedAssetReduceList.map(y => y?.id).includes(x?.id));
    this.modalSave.emit(this.selectedAssetReduceList);

    this.selectedAssetReduceList = [];
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
  onSelectedAssetReduce(asset : AssetDto, event ){
    
    console.log(event.target.checked);
    
    if(event.target.checked)
    {
      this.selectedAssetReduceList.push(asset);
      // this.lebelTotalAssetSelected ++;
    }
    else{
      var index = this.selectedAssetReduceList?.indexOf(asset);
      if (index !== -1) {
          this.selectedAssetReduceList.splice(index, 1);
      }   
      var a =this.selectedReasonReduce;
    }

  }
  clickUnTickAssetListSeleted(){
    
      for( let i = this.selectedAssetReduceList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAssetIncrease"]:checked'  ;
        $(selector).click();
    } 
  
    this.selectedAssetReduceList = [];
    // this.lebelTotalAssetSelected = 0;
  }
  onSelectedAllAsset(event){
    
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
  cancel(){
    this.selectedAssetReduceList = [];
    this.selectedReasonReduce = null;
    this.asset.reasonReduceNote = null;
    this.clickUnTickAssetListSeleted();
    this.close();
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
