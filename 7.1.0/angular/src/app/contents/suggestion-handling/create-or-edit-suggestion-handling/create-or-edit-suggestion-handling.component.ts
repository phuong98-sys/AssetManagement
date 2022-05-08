import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, DepartmentDto, SuggestionHandlingDto } from '@shared/service-proxies/service-proxies';
import { AddAssetSuggestionHandlingComponent } from '../add-asset-suggestion-handling/add-asset-suggestion-handling.component';

@Component({
  selector: 'app-create-or-edit-suggestion-handling',
  templateUrl: './create-or-edit-suggestion-handling.component.html',
  styleUrls: ['./create-or-edit-suggestion-handling.component.css']
})
export class CreateOrEditSuggestionHandlingComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetSuggestionHandlingModal', { static: true }) addAssetSuggestionHandlingModal: AddAssetSuggestionHandlingComponent
  active = false;
  saving = false;
  loading = false;
  suggestionHandling : SuggestionHandlingDto = new SuggestionHandlingDto();
  addAssetToSuggestionHandlingList : AssetDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  suggestionHandlingStatusList : SuggestionHandlingDto[]=[]; //
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
  onSelectedAllAsset(a?:any){

  }
  setSuggestionHandlingCode(){

  }
  onChangeAny(){}
  selecteAssetListToSuggestionHandling(){
    
    this.addAssetSuggestionHandlingModal.show();
  }
  // show(increaseAsset?: IncreaseAssetInputDto): void {
  //   if(increaseAsset?.id){
  //     this.increaseAsset = increaseAsset;
  //     // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
  //   }
  //   this.modal.show();
    
  // }
}
