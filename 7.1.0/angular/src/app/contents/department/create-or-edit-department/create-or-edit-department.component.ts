import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentDto, DepartmentServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-department',
  templateUrl: './create-or-edit-department.component.html',
  styleUrls: ['./create-or-edit-department.component.css']
})
export class CreateOrEditDepartmentComponent extends AppComponentBase implements OnInit {
  @ViewChild("departmentForm", { static: true }) private submitForm: NgForm;
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  department: DepartmentDto = new DepartmentDto();
  departmentCodeMessage = '';
  departmentId : number;
  constructor(
    injector: Injector,
    private departmentService: DepartmentServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.departmentId = Number(this._activatedRoute.snapshot.params['id']);
          
      }
  }

  ngOnInit(): void {
    // this.resetForm();
    // this.getDepartmentForEdit();
    // this.getAssetTypeList();
    this.getDepartments();

  }
  getDepartments(){
    // this.assetService.getAssets().subscribe((result)=>{
    //   this.assetList = result.items;
      
    // });
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
  //   if (this.validateForm(this.submitForm.form)) {
  //     this.saving= true;
  //     if(!this.department.id){
  //       this.department.assetStatusId = 1;
  //       this.assetService
  //       .insertOrUpdateAsset(this.department)
  //       .pipe(
  //           finalize(() => {
  //               this.saving = false;
  //           })
  //       )
  //       .subscribe(() => {
  //         this.saving = false;
  //           this.notify.info(this.l("SavedSuccessfully"));
  //           this.close();
  //           this.modalSave.emit(null);
  //       });
  //     }
  //     if(this.department.id){
  //       this.assetService
  //       .insertOrUpdateAsset(this.department)
  //       .pipe(
  //           finalize(() => {
  //               this.saving = false;
  //           })
  //       )
  //       .subscribe(() => {
  //         this.saving = false;
  //           this.notify.info(this.l("UpdatedSuccessfully"));
  //           this.close();
  //           this.modalSave.emit(null);
  //       });
  //     }
  // }
  }
  resetForm(){
    this.department.id=null;
    this.department.departmentCode=null;
    this.department.departmentName=null;
  }
  close(): void {
    
    // this.active = false;
    // // this.userPasswordRepeat = "";
    // // this.modal.hide();
    // this.submitForm.form.reset();
    // this._router.navigate(['app/contents/department']);
  }
  getAssetForEdit(){
  //   forkJoin(
  //     this.assetService.getAsset(this.assetId),
  //     this.assetTypeService.getAssetTypes()
  // )
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe(([res1, res2]) => {
  //         this.department = res1;
  //         this.assetTypeList = res2.items;
  //         this.selectedAssetType = this.assetTypeList.find((item)=> item.id == this.department.assetTypeId);
  //     });
  }
  setDepartmentCode(){
    
    // var department = this.assetList.find(x=> x.assetCode == this.department.assetCode);
    // if(department && department.id != this.assetId){
    //   this.assetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    // }
    // else{
    //   this.assetCodeMessage = "";
    // }
  }

}
