import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentComponent } from '@app/contents/department/department.component';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, IncreaseAssetDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy, DepartmentDto, DepartmentServiceProxy, EmployeeServiceProxy, EmployeeDto } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { LazyLoadEvent } from 'primeng/api';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
// import { AddAssetIncreaseAssetComponent } from '../add-asset-increase-asset/add-asset-increase-asset.component';
import { EditIncreaseAssetModalComponent } from '../edit-increase-asset-modal/edit-increase-asset-modal.component';
declare var $:any;
@Component({
  selector: 'app-create-or-edit-increase-asset',
  templateUrl: './create-or-edit-increase-asset.component.html',
  styleUrls: ['./create-or-edit-increase-asset.component.css']
})
export class CreateOrEditIncreaseAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("increaseAssetForm", { static: true }) private submitForm: NgForm;
  @ViewChild('editIncreaseAssetModal', { static: true }) editIncreaseAssetModal: EditIncreaseAssetModalComponent;
  // @ViewChild('addAssetIncreaseAssetModal', { static: true }) addAssetIncreaseAssetModal: AddAssetIncreaseAssetComponent
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  increaseAsset: IncreaseAssetInputDto = new IncreaseAssetInputDto();
  increaseAssetList: IncreaseAssetInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  assetHaveNotIncreaseList: AssetDto[];
  addAssetToIncreaseList:  any[] = [];
  assetMessage = '';
  increaseAssetId: number;
  increaseAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  deleteAssetConfirmedList : any[] = [];
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
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.increaseAssetId = Number(this._activatedRoute.snapshot.params['id']);
          this.getAssetIncreased(this.increaseAssetId);
        }
  }

  ngOnInit(): void {
    // this.getAssets();
     this.getIncreaseAssetForEdit();
     this.getDepartmentList();
     this.getEmployeeList();
    // this.getIncreaseAssets();
  }
  // getIncreaseAssets(){
  //   this.increaseAssetService.getIncreaseAssets().subscribe((result) => {
  //     this.increaseAssetList = result.items;
  //   });
  // }
  getAssetIncreased(increaseAssetId: number){
    this.assetService.getAssetIncreased(increaseAssetId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })
  }
  show(increaseAsset?: IncreaseAssetInputDto): void {
    // if(increaseAsset?.id){
    //   this.increaseAsset = increaseAsset;
    // }
    // this.addAssetIncreaseAssetModal.show();
    
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      debugger
      this.saving= true;
      // ghi tăng tài sản
       this.increaseAsset.creationTime =  moment.utc(this.increaseAsset.creationTime.toString());
       this.increaseAsset.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
          this.increaseAssetService.insertOrUpdateIncreaseAsset(this.increaseAsset)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            debugger
              this.increaseAsset = result;
              this.selectedAssetTable.map((item) => { 
                item.increaseAssetId = this.increaseAsset.id;
                debugger
                //  item.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
                  item.creationTime = moment.utc( item.creationTime.toString());
                  item.startDate = moment.utc( item.startDate.toString());
                  item.amortizationDate = moment.utc( item.amortizationDate.toString());
                  item.increaseAssetDate = moment.utc( item.increaseAssetDate.toString());
                });
                debugger
              // this.assetService.increaseAssetList(this.selectedAssetTable).subscribe();
              // xóa tài sản ghi tăng
              
              // if(this.deleteAssetConfirmedList.length > 0 ){
              //   this.assetService.test(1,this.deleteAssetConfirmedList).subscribe();
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
      
  //     this.assetHaveNotIncreaseList = result.items.filter((item)=> item.increaseAssetId == null);
  //     this.assetList = this.assetHaveNotIncreaseList;
  //   });
   
  // }
// getAssetIncreaseList(){
//   this.assetService.GetAssetIncreased()
//   .subscribe((resul))
// }
  clickIncreaseAsset(){
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
  setIncreaseAssetCode(){
    var increaseAsset = this.increaseAssetList.find(x=> x.increaseAssetCode == this.increaseAsset.increaseAssetCode);
    if(increaseAsset && increaseAsset.id != this.increaseAssetId){
      this.increaseAssetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.increaseAssetCodeMessage = "";
    }
  }
  getIncreaseAssetForEdit(){
    this.increaseAssetService.getIncreaseAsset(this.increaseAssetId)
      .subscribe((result) =>{
        
        this.increaseAsset = result;
        this.increaseAsset.creationTime = result["creationTime"]? result["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.increaseAsset.increaseAssetDate = result["increaseAssetDate"]? result["increaseAssetDate"].format("YYYY-MM-DD"):<any>undefined;
      })
  }
  onSelectedAsset(assetForEdit : AssetDto, event ){
    
    console.log(event.target.checked);
    
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

              this.addAssetToIncreaseList = this.addAssetToIncreaseList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 
          }
      }
  );
  }
  deleteAssetItemFromTable(asset : AssetDto){
    this.message.confirm(
      this.l('Tài sản với tên ' + asset.assetName+ " sẽ bị xóa"),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              this.deleteAssetList.push(asset);
              this.addAssetToIncreaseList = this.addAssetToIncreaseList.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
              this.deleteAssetList = []; 

          }
      }
  );
  }
  editAssetItemFromTable(asset : AssetDto){
    this.editIncreaseAssetModal.show(asset);
  }
  // editIncreaseAsset(asset : AssetDto){
  //   console.log("event =", asset);

  // }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.addAssetToIncreaseList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToIncreaseList.length-1; i>= 0; i-- ){
        
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
    debugger
    this.departmentService.getDepartments()
    .subscribe((result)=>{
      this.departmentList = result.items;
    })
  }
  // onSelectEmployeeFromTable(asset: AssetDto){
  //   debugger
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
    debugger
    console.log("asset=", asset);
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    console.log("index=", index);
    this.selectedAssetTable[index] = asset;
    console.log("selected asset =",  this.selectedAssetTable[index]);
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToIncreaseList[index].amortizationValue = amortizationValue;
  }
}
