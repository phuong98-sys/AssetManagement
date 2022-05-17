import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, DepartmentDto, ProposeAssetDto, ProposeAssetInputDto, ProposeAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddAssetProposeAssetComponent } from '../add-asset-propose-asset/add-asset-propose-asset.component';

@Component({
  selector: 'app-create-or-edit-propose-asset',
  templateUrl: './create-or-edit-propose-asset.component.html',
  styleUrls: ['./create-or-edit-propose-asset.component.css']
})
export class CreateOrEditProposeAssetComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetProposeAssetModal', { static: true }) addAssetProposeAssetModal: AddAssetProposeAssetComponent
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("proposeAssetForm", { static: true }) private submitForm: NgForm;
  active = false;
  saving = false;
  loading = false;
  proposeAsset : ProposeAssetDto = new ProposeAssetDto();
  proposeAssetId: number;
  selectedAssetTable: AssetDto[] = [];
  proposeAssetList:ProposeAssetInputDto[];
  deletedAssetListFromTable : AssetDto[] = [];
  addAssetToProposeAssetList : AssetDto[] = [];
  //deleteAssetConfirmedList : AssetProposeAssetDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  proposeAssetStatusList : ProposeAssetDto[]=[]; //
  selectedAny: any; //
        //
        advancedFiltersVisible = false;
        keyword ='';
  constructor( 
    injector: Injector,
    private assetService: AssetServiceProxy,
    private proposeAssetService: ProposeAssetServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
      super(injector);
      if (this._activatedRoute.snapshot.params['id']) {
        this.proposeAssetId = Number(this._activatedRoute.snapshot.params['id']);
        this.getAssetProposeAsset(this.proposeAssetId);
        debugger
      }
   }

  ngOnInit(): void {
    debugger
    this.getProposeAssetForEdit();
    
   this.getProposeAssets();
   this.getProposeAssetList();
  }
  close(){

  }
  getProposeAssetList(){
    this.proposeAssetService.getProposeAssets()
    .subscribe((result)=>{
        this.proposeAssetList = result.items;
    });
  }
  getProposeAssets(){
    this.proposeAssetService.getProposeAssets().subscribe((result) => {
      this.proposeAssetList = result.items;
    });
  }
  getAssetProposeAsset(proposeAssetId: number){
    /*this.assetService.getProposeAsset(proposeAssetId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })*/
  }
  show(proposeAsset?: ProposeAssetInputDto): void {
    // if(suggestionHandling?.id){
    //   this.suggestionHandling = suggestionHandling;
    // }
    //this.addAssetProposeAssetModal.show(this.deletedAssetListFromTable);
    this.deletedAssetListFromTable = [];
    
  }
  addAssetProposeAssetToTable(assetList){
    
    this.selectedAssetTable = [ ...this.selectedAssetTable, ...assetList];
    console.log("list =", this.selectedAssetTable);
  }
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      
      this.saving= true;
      // ghi tăng tài sản
      debugger
       this.proposeAsset.creationTime =  moment.utc(this.proposeAsset.creationTime.toString());
       this.proposeAsset.dateFound = moment.utc( this.proposeAsset.dateFound.toString());
          this.proposeAssetService.insertOrUpdateProposeAsset(this.proposeAsset)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            debugger
              this.proposeAsset = result;
              this.notify.info(this.l("SavedSuccessfully"));
              this.close();
              // this.modalSave.emit(null);
          });
      }
  }
  validateForm(form) {
    Object.keys(form?.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
/*
  deleteAssetItemFromTable(asset : AssetProposeAssetDto){
    debugger
    this.message.confirm(
      this.l('Tài sản với tên ' + asset.assetName+ " sẽ bị xóa khỏi bảng"),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              this.deletedAssetListFromTable.push(asset);
            //  this.deletedAssetListFromTable.push(asset);
              this.selectedAssetTable = this.selectedAssetTable.filter(x => x.id != asset.id);
              // set tổng nguyên giá
              this.selectedAssetTable.forEach((item) =>{
                // this.suggestionHandling.totalAssetValue += item.orginalPrice;
              })
            //  this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(asset);
            //  });
              // this.deleteAssetList = []; 

          }
      }
  );
  }
  */
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
  getProposeAssetForEdit(){
    forkJoin(
    this.proposeAssetService.getProposeAsset(this.proposeAssetId),
    /*this.departmentService.getDepartments(),
    this.employeeService.getEmployees()*/
    )
    .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, ]) => {
        
        this.proposeAsset = res1;
        //this.suggestionHandling.creationTime = res1["creationTime"]? res1["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.proposeAsset.dateFound = res1["dateFound"]? res1["dateFound"].format("YYYY-MM-DD"):<any>undefined;
        
      })
  }
  setNumbersProposeAsset(){

  }
  /*
  onSelectDepartmentFromTableFromTable(asset : AssetProposeAssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].employeeId = null;
    this.selectedAssetTable[index].departmentId = asset.departmentId;
  }
  */
  onChangeAny(){}
  selecteAssetListToProposeAsset(){
    
    //this.addAssetProposeAssetModal.show();
  }
  // show(increaseAsset?: IncreaseAssetInputDto): void {
  //   if(increaseAsset?.id){
  //     this.increaseAsset = increaseAsset;
  //     // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
  //   }
  //   this.modal.show();
    
  // }
}


