import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditIncreaseAssetModalComponent } from '@app/contents/increase-asset/edit-increase-asset-modal/edit-increase-asset-modal.component';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, DepartmentDto, DepartmentServiceProxy, DepreciationDto, DepreciationInputDto, DepreciationServiceProxy, EmployeeDto, EmployeeServiceProxy, IncreaseAssetInputDto, IncreaseAssetServiceProxy, ReasonReduceServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddAssetDepreciationAssetComponent } from '../add-asset-depreciation-asset/add-asset-depreciation-asset.component';

@Component({
  selector: 'app-create-or-edit-depreciation-asset',
  templateUrl: './create-or-edit-depreciation-asset.component.html',
  styleUrls: ['./create-or-edit-depreciation-asset.component.css']
})
export class CreateOrEditDepreciationAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild('addAssetDepreciationModal', { static: true }) addAssetDepreciationModal: AddAssetDepreciationAssetComponent
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("depreciationForm", { static: true }) private submitForm: NgForm;
  // @ViewChild('editIncreaseAssetModal', { static: true }) editIncreaseAssetModal: EditIncreaseAssetModalComponent;
   @ViewChild('addAssetDepreciationAssetModal', { static: true }) addAssetDepreciationAssetModal: AddAssetDepreciationAssetComponent
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  depreciationAsset: DepreciationInputDto = new DepreciationInputDto();
  depreciationList:DepreciationInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[] = [];
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
  depreciation : DepreciationDto = new DepreciationDto();
  addAssetToDepreciationList : any[] = [];
  selectedPetitioner: EmployeeDto; //ge
  depreciationId: number;
  depreciationCodeMessage = '';
  selectedHandlingStatus : any;
  selectedDepartment: DepartmentDto;
  depreciationStatusList  = [
    {id: 1, name : 'chưa phê duyệt'},
    {id: 2, name : 'đã phê duyệt'},
  ]
  // assetListCopy: AssetDepreciationDto = new AssetDepreciationDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private depreciationService: DepreciationServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private reasonReduceService: ReasonReduceServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.depreciationId = Number(this._activatedRoute.snapshot.params['id']);
          this.getAssetDepreciation(this.depreciationId);
        }
        this.getDepartmentList();
        this.getEmployeeList();
  }

  ngOnInit(): void {
    this.getAssets();
    debugger
     this.getDepreciationForEdit();
     
    this.getDepreciations();
    // this.getReasonReduceList();
    this.getDepartmentList();
    this.getEmployeeList();
  }
  // getReasonReduceList(){
  //   this.reasonReduceService.getReasonReduces()
  //   .subscribe((result)=>{
  //       this.reasonReduceList = result.items;
  //   });
  // }
  getDepreciations(){
    this.depreciationService.getDepreciations().subscribe((result) => {
      this.depreciationList = result.items;
    });
  }
  getAssetDepreciation(depreciationId: number){
    this.assetService.getDepreciation(depreciationId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })
  }
  show(depreciation?: DepreciationInputDto): void {
    // if(depreciation?.id){
    //   this.depreciation = depreciation;
    // }
    debugger
    console.log("table =",this.selectedAssetTable);
    console.log("de =",this.deletedAssetListFromTable);
    this.addAssetDepreciationAssetModal.show(this.deletedAssetListFromTable, this.selectedAssetTable);
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
       this.depreciation.creationTime =  moment.utc(this.depreciation.creationTime.toString());
       this.depreciation.depreciationDate = moment.utc( this.depreciation.depreciationDate.toString());
      
       this.depreciation.creatorUserName = this.appSession.user.name;
          this.depreciationService.insertOrUpdateDepreciation(this.depreciation)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            debugger
              this.depreciation = result;
              // ghi tăng gtafi sản
              this.selectedAssetTable.map((item) => { 
                  item.creationTime = moment.utc( item.creationTime?.toString());
                  item.startDate = moment.utc( item.startDate?.toString());
                  item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                });
                debugger
              this.assetService.depreciationList( this.depreciation.id,0, this.selectedAssetTable).subscribe();
              // //xóa tài sản ghi tăng

              if(this.deleteAssetConfirmedList.length > 0 ){
                debugger
                this.deleteAssetConfirmedList.map((item) => { 
                    item.creationTime = moment.utc( item.creationTime?.toString());
                    item.startDate = moment.utc( item.startDate?.toString());
                    item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                  });

                this.assetService.depreciationList(this.depreciation.id,1, this.deleteAssetConfirmedList).subscribe();
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
    this._router.navigate(['app/contents/depreciation-asset']);
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
  getAssets(){
    this.assetService.getAssets().subscribe((result)=>{ 
      this.assetList = result.items;
    });
   
 }
// getAssetIncreaseList(){
//   this.assetService.GetAssetIncreased()
//   .subscribe((resul))
// }
  clickDepreciation(){
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
  setDepreciationCode(){
    var depreciation = this.depreciationList.find(x=> x.depreciationCode == this.depreciation.depreciationCode);
    if(depreciation && depreciation.id != this.depreciationId){
      this.depreciationCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.depreciationCodeMessage = "";
    }
  }
  getDepreciationForEdit(){
    forkJoin(
    this.depreciationService.getDepreciation(this.depreciationId),
    this.departmentService.getDepartments(),
    this.employeeService.getEmployees()
    )
    .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2,res3]) => {
        
        this.depreciation = res1;
        this.depreciation.creationTime = res1["creationTime"]? res1["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.depreciation.depreciationDate = res1["depreciationDate"]? res1["depreciationDate"].format("YYYY-MM-DD"):<any>undefined;
        // this.selectedDepartment = res2.items.find( x => x.id == this.depreciation.departmentId);
        // this.selectedPetitioner = this.employeeList.find( x => x.id == this.depreciation.petitionerId);
        // this.selectedHandlingStatus = this.depreciationStatusList.find(x => x.id == this.depreciation.depreciationStatus)
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
                // this.depreciation.totalAssetValue += item.orginalPrice;
              })
            //  this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(asset);
            //  });
              // this.deleteAssetList = []; 

          }
      }
  );
  }
  // editAssetItemFromTable(asset : AssetDto){
  //   this.editDepreciationAssetModal.show(asset);
  // }
  // editDepreciation(asset : AssetDto){
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
  onSelectHandlingMethodFromTableFromTable(asset : AssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].employeeId = null;
    // this.selectedAssetTable[index].handlingMethodId = asset.handlingMethodId;
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  onSelectReasonReduceNoteFromTable(asset , handlingMethod){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    // this.selectedAssetTable[index].handlingMethod =handlingMethod;
  }
  // onSelectRecoverableValueFromTable(asset : AssetDto){
  //   var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
  
  //   this.selectedAssetTable[index].recoverableValue = asset.recoverableValue;
  // }
  addAssetDepreciationToTable(assetList: any){
    debugger

    // assetList.forEach((item) =>{
       
    //   this.assetListCopy.id = item.id;
    //   this.assetListCopy.assetCode = item.assetCode;
    //   this.assetListCopy.assetName = item.assetName;
    //   this.assetListCopy.departmentId = item.departmentId;
    //       this.selectedAssetTable.push(this.assetListCopy);

    // });
    
    console.log("list  1=", assetList);
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
  }
  // onChangePetitioner(){
  //   debugger
  //   this.depreciation.petitionerId = this.selectedPetitioner.id;
  //   this.depreciation.petitionerName = this.selectedPetitioner.employeeName;
  // }
  
  // onChangeDepartment(){
  //   this.depreciation.departmentId = this.selectedDepartment.id;
  //   this.depreciation.departmentName = this.selectedDepartment.departmentName;
  // }
  // onChangeStatus(){
  //   this.depreciation.depreciationStatus = this.selectedHandlingStatus.id;
  //   this.depreciation.depreciationStatusName = this.selectedHandlingStatus.name;
  // }
  // onSelectReasonReduceFromTable(asset : AssetDepreciationDto){
  //   var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
  //   this.selectedAssetTable[index].handlingMethodId = asset.handlingMethodId;
  // }
  showDepreciation(){
    if(!this.depreciation.month || !this.depreciation.year){
      this.message.warn("Bạn cần nhập năm và tháng để trích khấu hao");
    }
    else{
      this.getAssets();
      this.assetList = this.assetList.filter(x => this.selectedAssetTable.map(y => y?.id).includes(x?.id));
      this.selectedAssetTable.map((item) =>{
        item.initialAmortizationValue = 0;
        item.isDepreciation = true;
      });
      this.assetService.test(this.depreciation.year, this.depreciation.month, this.assetList)
      .subscribe((result) =>{
         this.selectedAssetTable = result.items;
          console.log("selectedAssetTable = ", this.selectedAssetTable);
      });
    }
   
  }
  
}
