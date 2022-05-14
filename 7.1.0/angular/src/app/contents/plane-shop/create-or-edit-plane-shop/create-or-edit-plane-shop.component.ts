import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, DepartmentDto, PlaneShopDto } from '@shared/service-proxies/service-proxies';
import { AddAssetPlaneShopComponent } from '../add-asset-plane-shop/add-asset-plane-shop.component';

@Component({
  selector: 'app-create-or-edit-plane-shop',
  templateUrl: './create-or-edit-plane-shop.component.html',
  styleUrls: ['./create-or-edit-plane-shop.component.css']
})
export class CreateOrEditPlaneShopComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetPlaneShopModal', { static: true }) addAssetPlaneShopModal: AddAssetPlaneShopComponent
  active = false;
  saving = false;
  loading = false;
  planeShop : PlaneShopDto = new PlaneShopDto();
  addAssetToPlaneShopList : AssetDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  planeShopStatusList : PlaneShopDto[]=[]; //
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
      for( let i = this.addAssetToPlaneShopList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToPlaneShopList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  setNumbersPlaneShop(){

  }
  onChangeAny(){}
  selecteAssetListToPlaneShop(){
    
    this.addAssetPlaneShopModal.show();
  }
  // show(increaseAsset?: IncreaseAssetInputDto): void {
  //   if(increaseAsset?.id){
  //     this.increaseAsset = increaseAsset;
  //     // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
  //   }
  //   this.modal.show();
    
  // }
}


