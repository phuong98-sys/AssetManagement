
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, AssetSuggestionHandlingDto, ReasonReduceDto, ReasonReduceServiceProxy } from '@shared/service-proxies/service-proxies';
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
  @ViewChild("suggestionHandlingForm", { static: true }) private submitForm: NgForm;
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
  deleteAssetList : AssetSuggestionHandlingDto[] = [];
  deleteAssetConfirmedList : AssetSuggestionHandlingDto[] = [];
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
  selectedAssetTable: any[] = [];
  deletedAssetListFromTable : AssetDto[] = [];
  suggestionHandling : SuggestionHandlingDto = new SuggestionHandlingDto();
  addAssetToSuggestionHandlingList : any[] = [];
  selectedPetitioner: EmployeeDto; //ge
  suggestionHandlingId: number;
  suggestionHandlingCodeMessage = '';
  selectedHandlingStatus : any;
  selectedDepartment: DepartmentDto;
  suggestionHandlingStatusList  = [
    {id: 1, name : 'chưa phê duyệt'},
    {id: 2, name : 'đã phê duyệt'},
  ]
  reasonReduceList: ReasonReduceDto[] = [];
  assetListCopy: AssetSuggestionHandlingDto = new AssetSuggestionHandlingDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private suggestionHandlingService: SuggestionHandlingServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private reasonReduceService: ReasonReduceServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.suggestionHandlingId = Number(this._activatedRoute.snapshot.params['id']);
          this.getAssetSuggestionHandling(this.suggestionHandlingId);
        }
        this.getDepartmentList();
        this.getEmployeeList();
  }

  ngOnInit(): void {
    // this.getAssets();
    debugger
     this.getSuggestionHandlingForEdit();
     
    this.getSuggestionHandlings();
    this.getReasonReduceList();
    this.getDepartmentList();
    this.getEmployeeList();
  }
  getReasonReduceList(){
    this.reasonReduceService.getReasonReduces()
    .subscribe((result)=>{
        this.reasonReduceList = result.items;
    });
  }
  getSuggestionHandlings(){
    this.suggestionHandlingService.getSuggestionHandlings().subscribe((result) => {
      this.suggestionHandlingList = result.items;
    });
  }
  getAssetSuggestionHandling(suggestionHandlingId: number){
    this.assetService.getSuggestionHandling(suggestionHandlingId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })
  }
  show(suggestionHandling?: SuggestionHandlingInputDto): void {
    // if(suggestionHandling?.id){
    //   this.suggestionHandling = suggestionHandling;
    // }
    debugger
    console.log("fi =",this.selectedAssetTable);
    this.addAssetSuggestionHandlingModal.show(this.deletedAssetListFromTable, this.selectedAssetTable);
    this.deletedAssetListFromTable = [];
    
  }
  validateForm(form) {
    Object.keys(form?.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      
      this.saving= true;
      // ghi tăng tài sản
      debugger
       this.suggestionHandling.creationTime =  moment.utc(this.suggestionHandling.creationTime.toString());
       this.suggestionHandling.suggestionHandlingDate = moment.utc( this.suggestionHandling.suggestionHandlingDate.toString());
       this.suggestionHandling.implementationDate = moment.utc( this.suggestionHandling.suggestionHandlingDate.toString());
       this.suggestionHandling.creatorUserName = this.appSession.user.name;
          this.suggestionHandlingService.insertOrUpdateSuggestionHandling(this.suggestionHandling)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            debugger
              this.suggestionHandling = result;
              // ghi tăng gtafi sản
              this.selectedAssetTable.map((item) => { 
                  item.creationTime = moment.utc( item.creationTime?.toString());
                  item.startDate = moment.utc( item.startDate?.toString());
                  item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                });
                debugger
              this.assetService.suggestionHandlingList( this.suggestionHandling.id,0, this.selectedAssetTable).subscribe();
              //xóa tài sản ghi tăng

              if(this.deleteAssetConfirmedList.length > 0 ){
                debugger
                this.deleteAssetConfirmedList.map((item) => { 
                    item.creationTime = moment.utc( item.creationTime?.toString());
                    item.startDate = moment.utc( item.startDate?.toString());
                    item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                  });

                this.assetService.suggestionHandlingList(this.suggestionHandling.id,1, this.deleteAssetConfirmedList).subscribe();
              }
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
    this._router.navigate(['app/contents/suggestion-handling']);
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
    forkJoin(
    this.suggestionHandlingService.getSuggestionHandling(this.suggestionHandlingId),
    this.departmentService.getDepartments(),
    this.employeeService.getEmployees()
    )
    .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2,res3]) => {
        
        this.suggestionHandling = res1;
        this.suggestionHandling.creationTime = res1["creationTime"]? res1["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.suggestionHandling.suggestionHandlingDate = res1["suggestionHandlingDate"]? res1["suggestionHandlingDate"].format("YYYY-MM-DD"):<any>undefined;
        this.selectedDepartment = res2.items.find( x => x.id == this.suggestionHandling.departmentId);
        this.selectedPetitioner = this.employeeList.find( x => x.id == this.suggestionHandling.petitionerId);
        this.selectedHandlingStatus = this.suggestionHandlingStatusList.find(x => x.id == this.suggestionHandling.suggestionHandlingStatus)
      })
  }
  onSelectedAsset(assetForEdit : AssetSuggestionHandlingDto, event ){
    
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
  deleteAssetItemFromTable(asset : AssetSuggestionHandlingDto){
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
  onSelectHandlingMethodFromTableFromTable(asset : AssetSuggestionHandlingDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].employeeId = null;
    this.selectedAssetTable[index].handlingMethodId = asset.handlingMethodId;
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  onSelectReasonReduceNoteFromTable(asset , handlingMethod){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].handlingMethod =handlingMethod;
  }
  // onSelectRecoverableValueFromTable(asset : AssetDto){
  //   var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
  
  //   this.selectedAssetTable[index].recoverableValue = asset.recoverableValue;
  // }
  addAssetSuggestionHandlingToTable(assetList: any){
    debugger
    assetList.map((item)=>{
      item.handlingMethodId = item.reasonReduceId,
      item.handlingMethod = item.reasonReduceNote
    });
    assetList.forEach((item) =>{
       
      this.assetListCopy.id = item.id;
      this.assetListCopy.assetCode = item.assetCode;
      this.assetListCopy.assetName = item.assetName;
      this.assetListCopy.handlingMethodId = item.reasonReduceId;
      this.assetListCopy.handlingMethod = item.reasonReduceNote;
      this.assetListCopy.departmentId = item.departmentId;
          this.selectedAssetTable.push(this.assetListCopy);

    });
    
    console.log("list  1=", assetList);
    // this.selectedAssetTable = [ ...this.selectedAssetTable, ...a];
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
  onChangePetitioner(){
    debugger
    this.suggestionHandling.petitionerId = this.selectedPetitioner.id;
    this.suggestionHandling.petitionerName = this.selectedPetitioner.employeeName;
  }
  
  onChangeDepartment(){
    this.suggestionHandling.departmentId = this.selectedDepartment.id;
    this.suggestionHandling.departmentName = this.selectedDepartment.departmentName;
  }
  onChangeStatus(){
    this.suggestionHandling.suggestionHandlingStatus = this.selectedHandlingStatus.id;
    this.suggestionHandling.suggestionHandlingStatusName = this.selectedHandlingStatus.name;
  }
  onSelectReasonReduceFromTable(asset : AssetSuggestionHandlingDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].handlingMethodId = asset.handlingMethodId;

    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToReduceList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  
}
