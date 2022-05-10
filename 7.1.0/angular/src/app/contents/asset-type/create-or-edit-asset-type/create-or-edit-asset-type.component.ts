import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetTypeDto, AssetTypeServiceProxy, DepartmentDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-asset-type',
  templateUrl: './create-or-edit-asset-type.component.html',
  styleUrls: ['./create-or-edit-asset-type.component.css']
})
export class CreateOrEditAssetTypeComponent extends AppComponentBase implements OnInit {
  @ViewChild("departmentForm", { static: true }) private submitForm: NgForm;
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  assetType:AssetTypeDto = new AssetTypeDto();
  assetTypeCodeMessage = '';
  assetTypeId : number;
  selectedassetTypeParent: AssetTypeDto;
  assetTypeParentList: AssetTypeDto[] = [];
  constructor(
    injector: Injector,
    private departmentService: AssetTypeServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.assetTypeId = Number(this._activatedRoute.snapshot.params['id']);
          
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
  //     if(!this.assetType.id){
  //       this.assetType.assetStatusId = 1;
  //       this.assetService
  //       .insertOrUpdateAsset(this.assetType)
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
  //     if(this.assetType.id){
  //       this.assetService
  //       .insertOrUpdateAsset(this.assetType)
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
    this.assetType.id=null;
    this.assetType.assetTypeCode=null;
    this.assetType.assetTypeName=null;
  }
  close(): void {
    
    // this.active = false;
    // // this.userPasswordRepeat = "";
    // // this.modal.hide();
    // this.submitForm.form.reset();
    // this._router.navigate(['app/contents/assetType']);
  }
  getAssetForEdit(){
  //   forkJoin(
  //     this.assetService.getAsset(this.assetId),
  //     this.assetTypeService.getAssetTypes()
  // )
  //     .pipe(finalize(() => (this.loading = false)))
  //     .subscribe(([res1, res2]) => {
  //         this.assetType = res1;
  //         this.assetTypeList = res2.items;f
  //         this.selectedAssetType = this.assetTypeList.find((item)=> item.id == this.assetType.assetTypeId);
  //     });
  }
  setAssetTypeCode(){
    
    // var assetType = this.assetList.find(x=> x.assetCode == this.assetType.assetCode);
    // if(assetType && assetType.id != this.assetId){
    //   this.assetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    // }
    // else{
    //   this.assetCodeMessage = "";
    // }
  }

}
