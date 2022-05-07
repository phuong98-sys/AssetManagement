import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, AssetTypeDto, AssetTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
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
  asset: any;
  assetTypeList: AssetTypeDto[];
  assetList: AssetDto [];
  selectedAssetType: AssetTypeDto;
  assetCodeMessage = '';
  assetId : number;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private assetTypeService: AssetTypeServiceProxy,
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
  // getAssetTypeList(){
  //   this.assetTypeService.getAssetTypes().subscribe((result)=>{
  //     this.assetTypeList = result.items;
  //     this.selectedAssetType = this.assetTypeList.find((item)=> item.id == this.asset.assetTypeId);
  //   });
  // }
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
      this.assetTypeService.getAssetTypes()
  )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2]) => {
          this.asset = res1;
          this.assetTypeList = res2.items;
          this.selectedAssetType = this.assetTypeList.find((item)=> item.id == this.asset.assetTypeId);
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
}
