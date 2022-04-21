import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, AssetTypeDto, AssetTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

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
  asset: AssetInputDto = new AssetInputDto();
  assetTypeList: AssetTypeDto[];
  selectedAssetType: AssetTypeDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private assetTypeService: AssetTypeServiceProxy) {
        super(injector);
  }

  ngOnInit(): void {
    // this.resetForm();
    this.getAssetTypeList();
  }
  getAssetTypeList(){
    this.assetTypeService.getAll().subscribe((result)=>{
      this.assetTypeList = result.items;
    });
  }
  onSelectAssetType(){
    // this.asset.assetTypeId 
    this.asset.assetTypeId = this.selectedAssetType.id;
  }
  show(asset?: AssetInputDto): void {
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
      // let input = new AssetInputDto();

      // input = this.asset;
      // input.setRandomPassword = this.setRandomPassword;
      // input.sendActivationEmail = this.sendActivationEmail;
      // input.assignedRoleNames = _.map(
      //     _.filter(this.roles, {
      //         isAssigned: true,
      //         inheritedFromOrganizationUnit: false,
      //     }),
      //     (role) => role.roleName
      // );

      // if (!input.assignedRoleNames.length) {
      //     abp.message.error("Please select the user role(s).");
      //     return;
      // }

      // this.saving = true;
      this.saving= true;
      if(!this.asset.id){
        this.asset.usageStatus="Chưa sử dụng";
        this.assetService
        .insertAsset(this.asset)
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
        .updateAsset(this.asset)
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
    this.modal.hide();
    this.submitForm.form.reset();
  }
}
