import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, DepartmentDto, ProposeAssetDto } from '@shared/service-proxies/service-proxies';
import { AddAssetProposeAssetComponent } from '../add-asset-propose-asset/add-asset-propose-asset.component';

@Component({
  selector: 'app-create-or-edit-propose-asset',
  templateUrl: './create-or-edit-propose-asset.component.html',
  styleUrls: ['./create-or-edit-propose-asset.component.css']
})
export class CreateOrEditProposeAssetComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetProposeAssetModal', { static: true }) addAssetProposeAssetModal: AddAssetProposeAssetComponent
  active = false;
  saving = false;
  loading = false;
  proposeAsset : ProposeAssetDto = new ProposeAssetDto();
  addAssetToProposeAssetList : AssetDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  //transferStatusList : TransferDto[]=[]; //
  selectedAny: any; //
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
      for( let i = this.addAssetToProposeAssetList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToProposeAssetList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  setNumbersProposeAsset(){

  }
  onChangeAny(){}
  selecteAssetListToProposeAsset(){
    
    this.addAssetProposeAssetModal.show();
  }
  
}


