import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { AssetDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

@Component({
  selector: 'app-add-asset-transfer',
  templateUrl: './add-asset-transfer.component.html',
  styleUrls: ['./add-asset-transfer.component.css']
})
export class AddAssetTransferComponent  extends  AppComponentBase implements OnInit {

  @ViewChild("EditAssetIncreaseModal", { static: true }) modal: ModalDirective;
  @ViewChild("assetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[] =[];
  totalRecords = 0;
  handlingMethodList : any;//
  selectedHandlingMethod: any;//
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private _router: Router) {   
        super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
  }
  ngOnInit(): void {
    this.getAssets();
  }
  show(asset?: AssetDto): void {
    
    this.asset = asset;
    this.modal.show();
    
  }
  getAssets(event?: LazyLoadEvent){
    //   if (this.primengTableHelper.shouldResetPaging(event)) {
    //     this.paginator?.changePage(0);
    //     return;
    // }
    this.primengTableHelper.showLoadingIndicator();
      this.loading = true;
      this.assetService.getAssets()
      .subscribe(result => {
        this.loading = false;
          this.assetList = result.items;
          // this.assetList.map((item)=>{ 
          //   item.creationTime = item.creationTime? moment(item.creationTime).format("DD-MM-YYYY") : undefined;
          //   item.increaseAssetDate = item.increaseAssetDate ? moment(item.increaseAssetDate).format("DD-MM-YYYY") : undefined});
          this.primengTableHelper.totalRecordsCount = result.items.length;
          this.primengTableHelper.records = result.items;
          this.primengTableHelper.hideLoadingIndicator();
      });
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
