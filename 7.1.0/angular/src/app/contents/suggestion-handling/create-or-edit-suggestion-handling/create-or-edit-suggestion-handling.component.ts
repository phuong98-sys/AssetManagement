
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { AddAssetSuggestionHandlingComponent } from '../add-asset-suggestion-handling/add-asset-suggestion-handling.component';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentComponent } from '@app/contents/department/department.component';
import { AssetInputDto,  SuggestionHandlingDto, SuggestionHandlingInputDto, SuggestionHandlingServiceProxy, DepartmentDto, DepartmentServiceProxy, EmployeeServiceProxy, EmployeeDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-create-or-edit-suggestion-handling',
  templateUrl: './create-or-edit-suggestion-handling.component.html',
  styleUrls: ['./create-or-edit-suggestion-handling.component.css']
})
export class CreateOrEditSuggestionHandlingComponent extends AppComponentBase implements OnInit {
  @ViewChild('addAssetSuggestionHandlingModal', { static: true }) addAssetSuggestionHandlingModal: AddAssetSuggestionHandlingComponent
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("increaseAssetForm", { static: true }) private submitForm: NgForm;
  // @ViewChild('editIncreaseAssetModal', { static: true }) editIncreaseAssetModal: EditIncreaseAssetModalComponent;
  // @ViewChild('addAssetIncreaseAssetModal', { static: true }) addAssetIncreaseAssetModal: AddAssetIncreaseAssetComponent
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  suggestionHandlingAsset: SuggestionHandlingInputDto = new SuggestionHandlingInputDto();
  suggestionHandlingList:SuggestionHandlingInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  assetHaveNotIncreaseList: AssetDto[];
  addAssetToIncreaseList:  any[] = [];
  assetMessage = '';
  increaseAssetId: number;
  increaseAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  deleteAssetConfirmedList : AssetDto[] = [];
  departmentList : DepartmentDto[] = [];
  // selectedDepartment: DepartmentDto;
  employeeList : EmployeeDto[] =[];
  // selectedEmployee: EmployeeDto;
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  isSelectedAsset = false;
  isSelectedAllAsset = false;
    //
    advancedFiltersVisible = false;
    keyword ='';
  selectedAssetTable: AssetDto[] = [];
  deletedAssetListFromTable : AssetDto[] = [];
  suggestionHandling : SuggestionHandlingDto = new SuggestionHandlingDto();
  addAssetToSuggestionHandlingList : AssetDto[] = [];
  suggestionHandlingStatusList : SuggestionHandlingDto[]=[]; //
  selectedPetitioner: any; //
  suggestionHandlingId: number;
  suggestionHandlingCodeMessage = '';
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private suggestionHandlingService: SuggestionHandlingServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.suggestionHandlingId = Number(this._activatedRoute.snapshot.params['id']);
          this.getAssetIncreased(this.suggestionHandlingId);
        }
  }

  ngOnInit(): void {
    // this.getAssets();
     this.getSuggestionHandlingForEdit();
     this.getDepartmentList();
     this.getEmployeeList();
    this.getSuggestionHandlings();
  }
  getSuggestionHandlings(){
    this.suggestionHandlingService.getSuggestionHandlings().subscribe((result) => {
      this.suggestionHandlingList = result.items;
    });
  }
  getAssetIncreased(suggestionHandlingId: number){
    this.assetService.getAssetIncreased(suggestionHandlingId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })
  }
  show(suggestionHandling?: SuggestionHandlingInputDto): void {
    // if(suggestionHandling?.id){
    //   this.suggestionHandling = suggestionHandling;
    // }
    // this.addAssetSuggestionHandlingModal.show(this.deletedAssetListFromTable);
    this.deletedAssetListFromTable = [];
    
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
      
       this.suggestionHandling.creationTime =  moment.utc(this.suggestionHandling.creationTime.toString());
       this.suggestionHandling.suggestionHandlingDate = moment.utc( this.suggestionHandling.suggestionHandlingDate.toString());
          this.suggestionHandlingService.insertOrUpdateSuggestionHandling(this.suggestionHandling)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            
              this.suggestionHandling = result;
              // ghi tăng gtafi sản
              this.selectedAssetTable.map((item) => { 
                  item.creationTime = moment.utc( item.creationTime?.toString());
                  item.startDate = moment.utc( item.startDate?.toString());
                  item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                });
                debugger
              this.assetService.suggestionHandlingList(this.selectedAssetTable, this.suggestionHandling.id).subscribe();
              // xóa tài sản ghi tăng

              // if(this.deleteAssetConfirmedList.length > 0 ){
              //   debugger
              //   this.deleteAssetConfirmedList.map((item) => { 
              //       item.creationTime = moment.utc( item.creationTime?.toString());
              //       item.startDate = moment.utc( item.startDate?.toString());
              //       item.amortizationDate = moment.utc( item.amortizationDate?.toString());
              //     });

              //   this.assetService.suggestionHandlingList(this.deleteAssetConfirmedList, this.suggestionHandling).subscribe();
              // }
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
  // resetAsset(){
  //   this.asset.monthlyAmortizationValue = null;
  //   this.asset.assetName = null;
  //   this.asset.orginalPrice = null;
  // }
  renderAmortizationValue(){
    this.asset.monthlyAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  // renderAmortizationValueOfAssetFromTable(asset : AssetDto){
    
  //   var index = this.addAssetToIncreaseList.findIndex(c => c.id == asset.id);
  //   this.addAssetToIncreaseList[index] = asset;
  //   var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
  //   this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
  // }
  // getAssets(){
  //   this.assetService.getAssets().subscribe((result)=>{
      
  //     this.assetHaveNotIncreaseList = result.items.filter((item)=> item.suggestionHandlingId == null);
  //     this.assetList = this.assetHaveNotIncreaseList;
  //   });
   
  // }
// getAssetIncreaseList(){
//   this.assetService.GetAssetIncreased()
//   .subscribe((resul))
// }
  clickSuggestionHandling(){
    // this.searchAsset();
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
  setSuggestionHandlingCode(){
    var suggestionHandling = this.suggestionHandlingList.find(x=> x.suggestionHandlingCode == this.suggestionHandling.suggestionHandlingCode);
    if(suggestionHandling && suggestionHandling.id != this.suggestionHandlingId){
      this.suggestionHandlingCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.suggestionHandlingCodeMessage = "";
    }
  }
  getSuggestionHandlingForEdit(){
    this.suggestionHandlingService.getSuggestionHandling(this.suggestionHandlingId)
      .subscribe((result) =>{
        
        this.suggestionHandling = result;
        this.suggestionHandling.creationTime = result["creationTime"]? result["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.suggestionHandling.suggestionHandlingDate = result["suggestionHandlingDate"]? result["suggestionHandlingDate"].format("YYYY-MM-DD"):<any>undefined;
      })
  }
  onSelectedAsset(assetForEdit : AssetDto, event ){
    
    console.log(event.target.checked);
    debugger
    if(event.target.checked)
    {
      this.deleteAssetList.push(assetForEdit);
    }
    else{
      var index = this.deleteAssetList?.indexOf(assetForEdit);
      if (index !== -1) {
          this.deleteAssetList.splice(index, 1);
      }        
    }

  }
  onDeleteAssetListFromTable(){
    this.message.confirm(
      this.l('Tất cả tài sản đã chọn sẽ bị xóa khỏi bảng tài sản ghi tăng'),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
debugger
              this.selectedAssetTable = this.selectedAssetTable.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              // this.deletedAssetListFromTable = this.deleteAssetList;
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
             this.deleteAssetList.forEach((item) => {
              this.deletedAssetListFromTable.push(item);
             });
              this.deleteAssetList = []; 
          }
      }
  );
  }
  deleteAssetItemFromTable(asset : AssetDto){
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
  editAssetItemFromTable(asset : AssetDto){
    // this.editSuggestionHandlingModal.show(asset);
  }
  // editSuggestionHandling(asset : AssetDto){
  //   console.log("event =", asset);

  // }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.selectedAssetTable.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.selectedAssetTable.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  onSelectDepartmet(){

  }
  onSelectDepartmentFromTable(asset : AssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].employeeId = null;
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  addAssetIncreaseToTable(assetList){
    
    this.selectedAssetTable = [ ...this.selectedAssetTable, ...assetList];
    console.log("list =", this.selectedAssetTable);
  }
  getDepartmentList(){
    
    this.departmentService.getDepartments()
    .subscribe((result)=>{
      this.departmentList = result.items;
    })
  }
  // onSelectEmployeeFromTable(asset: AssetDto){
  //   
  //   console.log(  )
  //   this.getEmployeeListByDepartment(asset.departmentId);
  // }
  // getEmployeeListByDepartment(departmentId: number){
  //   this.employeeService.getEmployeeByDepartment(departmentId)
  //   .subscribe((result)=>{
  //     var employeeList = result.items;
  //   })
  // }
  getEmployeeList(){
    this.employeeService.getEmployees()
    .subscribe((result)=>{
      this.employeeList = result.items;
    })
  }
  editSelectedAsset(asset){
    console.log("asset=", asset);
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    console.log("index=", index);
    this.selectedAssetTable[index] = asset;
    console.log("selected asset =",  this.selectedAssetTable[index]);
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
  }
}
