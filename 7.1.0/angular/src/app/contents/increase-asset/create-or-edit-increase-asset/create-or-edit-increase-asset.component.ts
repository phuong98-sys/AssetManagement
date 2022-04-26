import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, IncreaseAssetDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-increase-asset',
  templateUrl: './create-or-edit-increase-asset.component.html',
  styleUrls: ['./create-or-edit-increase-asset.component.css']
})
export class CreateOrEditIncreaseAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  increaseAsset: IncreaseAssetInputDto = new IncreaseAssetInputDto();
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  addAssetToIncreaseList:  AssetDto[] = [];
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _router: Router) {
        super(injector);
  }
  // asset: IncreaseAssetDto;
  ngOnInit(): void {
    // this.resetForm();
    // this.getAssetTypeList();
    this.getAssets();
  }
  show(asset?: IncreaseAssetInputDto): void {
    if(asset?.id){
      this.increaseAsset = asset;
      // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
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
        // this.asset.usageStatus="Chưa sử dụng";
        this.increaseAssetService
        .insertOrUpdateIncreaseAsset(this.increaseAsset)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        )
        .subscribe(() => {
            this.notify.info(this.l("SavedSuccessfully"));
            this.close();
            this.modalSave.emit(null);
        });
      }
  }
  close(): void {
    
    this.active = false;
    // this.userPasswordRepeat = "";
    this.modal.hide();
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/increase-asset']);
  }
  searchAsset(){
    debugger
    // this.asset = new AssetDto();
      this.asset = this.assetList.find((item) => item.assetCode = this.asset.assetCode);
  }
  renderAmortizationValue(){
    debugger
    this.asset.amortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  getAssets(){
    debugger
    this.assetService.getAll().subscribe((result)=>{
      this.assetList = result.items.filter((item)=> item.increaseAssetId <= 0);
    });
  }
  clickIncreaseAsset(){
    debugger
    // this.assetService.updateAsset(this.asset).subscribe();
    var a = this.asset;
    let asset = new AssetDto();
      asset = this.asset;
   this.addAssetToIncreaseList.push(asset);
  }
}
