import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, DepartmentDto, TransferDto } from '@shared/service-proxies/service-proxies';
import { AddAssetTransferComponent } from '../add-asset-transfer/add-asset-transfer.component';

@Component({
  selector: 'app-create-or-edit-transfer',
  templateUrl: './create-or-edit-transfer.component.html',
  styleUrls: ['./create-or-edit-transfer.component.css']
})
export class CreateOrEditTransferComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetTransferModal', { static: true }) addAssetTransferModal: AddAssetTransferComponent
  active = false;
  saving = false;
  loading = false;
  transfer : TransferDto = new TransferDto();
  addAssetToTransferList : AssetDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  transferStatusList : TransferDto[]=[]; //
  selectedAny: any; //
        //
        advancedFiltersVisible = false;
        keyword ='';
  constructor( injector: Injector) {
    super(injector);
   }

  ngOnInit(): void {
  }
  close(){

  }
  save(a? : any){

  }
  onDeleteAssetListFromTable(a?: any){

  }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.addAssetToTransferList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToTransferList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  setNumbersTransfer(){

  }
  onChangeAny(){}
  selecteAssetListToTransfer(){
    
    this.addAssetTransferModal.show();
  }
  // show(increaseAsset?: IncreaseAssetInputDto): void {
  //   if(increaseAsset?.id){
  //     this.increaseAsset = increaseAsset;
  //     // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
  //   }
  //   this.modal.show();
    
  // }
}


