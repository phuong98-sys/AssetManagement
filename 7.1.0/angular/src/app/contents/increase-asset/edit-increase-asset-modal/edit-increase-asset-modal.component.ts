import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetDto } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

@Component({
  selector: 'app-edit-increase-asset-modal',
  templateUrl: './edit-increase-asset-modal.component.html',
  styleUrls: ['./edit-increase-asset-modal.component.css']
})
export class EditIncreaseAssetModalComponent implements OnInit {
  @ViewChild("EditAssetIncreaseModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  asset: AssetDto = new AssetDto();
  constructor() { }

  ngOnInit(): void {
  }
  show(asset?: AssetDto): void {
    this.asset = asset;
    this.modal.show();
    
  }
  save(){
    // if (this.validateForm(this.submitForm.form)) {
    //   this.saving= true;
    //     // this.asset.usageStatus="Chưa sử dụng";
    //     this.increaseAssetService
    //     .insertOrUpdateIncreaseAsset(this.increaseAsset)
    //     .pipe(
    //         finalize(() => {
    //             this.saving = false;
    //         })
    //     )
    //     .subscribe(() => {
    //         this.notify.info(this.l("SavedSuccessfully"));
    //         this.close();
    //         this.modalSave.emit(null);
    //     });
    //   }
    
    this.modalSave.emit(this.asset);
    this.close();
  }
  close(): void {
    this.active = false;
    // this.userPasswordRepeat = "";
    this.modal.hide();
    this.submitForm.form.reset();

  }
  renderAmortizationValue(){
    this.asset.amortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
}
