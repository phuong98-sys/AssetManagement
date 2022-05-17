import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { AssetDto, AssetServiceProxy, DepartmentDto, DepartmentServiceProxy, ReasonReduceDto, ReasonReduceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

@Component({
  selector: 'app-add-asset-transfer',
  templateUrl: './add-asset-transfer.component.html',
  styleUrls: ['./add-asset-transfer.component.css']
})
export class AddAssetTransferComponent  extends  AppComponentBase implements OnInit {

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
  selectedAssetTransferList : AssetDto[] = [];
  handlingMethodList : any;//de
  selectedHandlingMethod: any;//
  // lebelTotalAssetSelected = 0;
  totalAsset = 0;
   
  sortOrder = -1;

  sortField = "assetCode";
  departmentList: DepartmentDto[] = [];
  selectedDepartment: DepartmentDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private _router: Router) {   
        super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
  }
  ngOnInit(): void {
    this.getAssets();
    this.getDepartmentList();
  }
  getDepartmentList(){
    this.departmentService.getDepartments()
    .subscribe((result)=>{
        this.departmentList = result.items;
    });
  }

  show(revertAssetList?: AssetDto[]){
    
    if(revertAssetList.length > 0){
      this.assetList = [ ...this.assetList, ...revertAssetList];
    }
    this.assetList.sort((a,b) => a.assetCode.localeCompare(b.assetCode));
    this.modal.show();
    
  }
  getAssets(event?: LazyLoadEvent){
      this.primengTableHelper.showLoadingIndicator();
      this.loading = true;
      this.assetService.getAssets()
      .subscribe(result => {
        this.loading = false;
          this.assetList = result.items.filter((item)=> item.increaseAssetId == null);
          
          this.totalAsset = this.assetList.length-1;
      });
    }
  save(){
    
    this.assetList = this.assetList.filter(x => !this.selectedAssetTransferList.map(y => y?.id).includes(x?.id));
    this.selectedAssetTransferList;
    this.selectedAssetTransferList.map((item) => {
      item.departmentId = this.selectedDepartment.id;
      item.reasonReduceNote = this.asset.reasonReduceNote;
    })
    this.modalSave.emit(this.selectedAssetTransferList);

    this.selectedAssetTransferList = [];
    this.close();
  }
  close(): void {
    this.active = false;
    // this.userPasswordRepeat = "";
    this.modal.hide();
    
    // this.submitForm.form.reset();

  }
  onSelectedAssetReduce(asset : AssetDto, event ){
    
    console.log(event.target.checked);
    
    if(event.target.checked)
    {
      this.selectedAssetTransferList.push(asset);
      // this.lebelTotalAssetSelected ++;
    }
    else{
      var index = this.selectedAssetTransferList?.indexOf(asset);
      if (index !== -1) {
          this.selectedAssetTransferList.splice(index, 1);
      }   
      var a =this.selectedDepartment;
    }

  }
  clickUnTickAssetListSeleted(){
    
      for( let i = this.selectedAssetTransferList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAssetIncrease"]:checked'  ;
        $(selector).click();
    } 
  
    this.selectedAssetTransferList = [];
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
    this.selectedAssetTransferList = [];
    this.selectedDepartment = null;
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
