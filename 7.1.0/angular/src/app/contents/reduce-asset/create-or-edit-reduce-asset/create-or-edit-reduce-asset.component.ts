import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-reduce-asset',
  templateUrl: './create-or-edit-reduce-asset.component.html',
  styleUrls: ['./create-or-edit-reduce-asset.component.css']
})
export class CreateOrEditReduceAssetComponent extends AppComponentBase implements OnInit {
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
  addAssetToIncreaseList: Array<AssetDto>= [];
  increaseAssetId: number;
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;

  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _activatedRoute: ActivatedRoute,) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.increaseAssetId = Number(this._activatedRoute.snapshot.params['id']);
        }
  }
  // asset: IncreaseAssetDto;
  ngOnInit(): void {
    // this.resetForm();
    // this.getAssetTypeList();
    // getIncreaseForEdit();
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
    this.assetService.getAssets().subscribe((result)=>{
      this.assetList = result.items.filter((item)=> item.amortizationValue <= 0);
    });
  }
  clickIncreaseAsset(){
    debugger
    if(this.asset.numberOfDayUsedAsset > 0){
      this.assetService.insertOrUpdateAsset(this.asset);
    }
  }
}
