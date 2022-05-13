import { Type } from '@angular/compiler';
import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, AssetTypeDto, AssetTypeServiceProxy, DepartmentDto, DepartmentServiceProxy, EmployeeDto, EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as internal from 'stream';

type NewType = EventEmitter<any>;

@Component({
  selector: 'app-create-or-edit-asset',
  templateUrl: './create-or-edit-asset.component.html',
  styleUrls: ['./create-or-edit-asset.component.css']
})
export class CreateOrEditAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave: NewType = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  asset: AssetDto = new AssetDto();
  assetTypeList: AssetTypeDto[];
  assetList: AssetDto [];
  selectedAssetType: AssetTypeDto;
  assetCodeMessage = '';
  numberUsedAssetMessage = '';
  assetId : number;
  departmentList: DepartmentDto[] = [];
  selectedDepartment: DepartmentDto;
  employeeList: EmployeeDto[] = [];
  selectedEmployee: EmployeeDto;
  minUsedAsset: number;
  maxUsedAsset: number;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private assetTypeService: AssetTypeServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.assetId = Number(this._activatedRoute.snapshot.params['id']);
          
      }
  }

  ngOnInit(): void {
    // this.resetForm();
    this.getAssetForEdit();
    // this.getAssetTypeList();
    this.getAssets();

  }
  getAssets(){
    this.assetService.getAssets().subscribe((result)=>{
      this.assetList = result.items;
      
    });
  }
  onSelectAssetType(){
    // this.asset.assetTypeId 
    this.asset.assetTypeId = this.selectedAssetType.id;
    this.getNumberUsedAssetValid();
  }
  getNumberUsedAssetValid(){
    var assetType = this.assetTypeList.find(x=> x.id == this.asset.assetTypeId);
    this.minUsedAsset = assetType?.minNumberOfYearDepreciation;
    this.maxUsedAsset = assetType?.maxNumberOfYearDepreciation;
  }
  onSelectDepartment(){
    this.asset.departmentId = this.selectedDepartment.id;
  }
  onSelectEmployee(){
    this.asset.employeeId = this.selectedEmployee.id;
  }
  show(asset?: AssetDto): void {
    if(asset?.id){
      this.asset = asset;
      this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
    }
    this.modal.show();
    
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
    if (this.validateForm(this.submitForm.form)) {
      this.saving= true;
      if(!this.asset.id){
        this.asset.assetStatusId = 1;
        this.assetService
        .insertOrUpdateAsset(this.asset)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        )
        .subscribe(() => {
          this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this.close();
            this.modalSave.emit(null);
        });
      }
      if(this.asset.id){
        this.assetService
        .insertOrUpdateAsset(this.asset)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        )
        .subscribe(() => {
          this.saving = false;
            this.notify.info(this.l("UpdatedSuccessfully"));
            this.close();
            this.modalSave.emit(null);
        });
      }
  }
  }
  resetForm(){
    this.asset.id=null;
    this.asset.assetCode=null;
    this.asset.assetName=null;
  }
  close(): void {
    
    this.active = false;
    // this.userPasswordRepeat = "";
    // this.modal.hide();
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/asset']);
  }
  getAssetForEdit(){
    forkJoin(
      this.assetService.getAsset(this.assetId),
      this.assetTypeService.getAssetTypes(),
      this.departmentService.getDepartments(),
      this.employeeService.getEmployees()

  )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2,res3, res4]) => {
          this.asset = res1;
          this.assetTypeList = res2.items;
          this.departmentList = res3.items;
          this.employeeList = res4.items;
          this.selectedAssetType = this.assetTypeList.find((item)=> item.id == this.asset.assetTypeId);
          if(this.onSelectAssetType){
            
            this.getNumberUsedAssetValid();
          }
          this.selectedDepartment = this.departmentList.find((item)=> item.id == this.asset.departmentId);
          this.selectedEmployee = this.employeeList.find((item)=> item.id == this.asset.employeeId);
      });
  }
  setAssetCode(){
    var asset = this.assetList.find(x=> x.assetCode == this.asset.assetCode);
    if(asset && asset.id != this.assetId){
      this.assetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.assetCodeMessage = "";
    }
  }
  setNumberOfDayUsedAsset(){
    debugger
    if(this.asset.assetTypeId){
      if(this.asset.numberOfDayUsedAsset >= this.minUsedAsset && this.asset.numberOfDayUsedAsset <= this.maxUsedAsset ){

        this.numberUsedAssetMessage = "";
      }
      else{
        this.numberUsedAssetMessage ="Giá trị không hợp lệ";
      }
    }
    else{
      this.numberUsedAssetMessage ="Không hợp lệ. Cần chọn loại tài sản trước";
    }
  }
  getAmortizationValue(){
    if(this.asset.numberOfDayUsedAsset && this.asset.orginalPrice){
      this.asset.annualAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset)).toFixed(3));
      this.asset.monthlyAmortizationValue = Number((this.asset.annualAmortizationValue/12).toFixed(3));
    }
  }
}
