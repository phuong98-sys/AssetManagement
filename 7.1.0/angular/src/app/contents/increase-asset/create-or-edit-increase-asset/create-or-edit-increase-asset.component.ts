import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, IncreaseAssetDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-edit-increase-asset',
  templateUrl: './create-or-edit-increase-asset.component.html',
  styleUrls: ['./create-or-edit-increase-asset.component.css']
})
export class CreateOrEditIncreaseAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("increaseAssetForm", { static: true }) private submitForm: NgForm;
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
  addAssetToIncreaseList:  AssetDto[] = [];
  assetMessage = '';
  increaseAssetId: number;
  increaseAssetCodeMessage = "";
  // assetTypeList: IncreaseAssetTypeDto[];
  // selectedAssetType: AssetTypeDto;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.increaseAssetId = Number(this._activatedRoute.snapshot.params['id']);
          this.assetService.getAssetIncreased(this.increaseAssetId).subscribe((result)=>{
            debugger
              this.addAssetToIncreaseList = result.items;
          });
        }
  }
  // asset: IncreaseAssetDto;
  ngOnInit(): void {
    this.getAssets();
    this.getIncreaseAssetForEdit();
    this.getIncreaseAssets();
  }
  getIncreaseAssets(){
    this.increaseAssetService.getIncreaseAssets().subscribe((result) => {
      this.increaseAssetList = result.items;
    });
  }
  show(increaseAsset?: IncreaseAssetInputDto): void {
    if(increaseAsset?.id){
      this.increaseAsset = increaseAsset;
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
    if (this.validateForm(this.submitForm?.form)) {
      this.saving= true;
      debugger
       this.increaseAsset.creationTime =  moment.utc(this.increaseAsset.creationTime.toString());
       this.increaseAsset.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
          this.increaseAssetService.insertOrUpdateIncreaseAsset(this.increaseAsset)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((result) => {
            debugger
              this.increaseAsset = result;
              this.addAssetToIncreaseList.map((item) => { 
                debugger
                item.increaseAssetId = this.increaseAsset.id;
                item.increaseAssetDate = moment.utc( this.increaseAsset.increaseAssetDate.toString());
                });
              this.assetService.increaseAssetList(this.addAssetToIncreaseList).subscribe();
              this.notify.info(this.l("SavedSuccessfully"));
              this.close();
              this.modalSave.emit(null);
          });
      }
  }
  close(): void {
    
    this.active = false;
    // this.userPasswordRepeat = "";
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/increase-asset']);
  }
  searchAsset(){
    debugger
    // this.asset = new AssetDto();
    // this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
    debugger
    var newAsset = new AssetDto;
    newAsset =this.asset;
    newAsset = this.assetList?.find((item) => item.assetCode == newAsset?.assetCode);
    if(!newAsset){
      
      this.assetMessage = "Mã tài sản không tồn tại hoặc đã được ghi tăng";
    }
    else{
      this.asset = newAsset;
      this.assetMessage = "";
    }
  }
  renderAmortizationValue(){
    this.asset.amortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  getAssets(){
    this.assetService.getAssets().subscribe((result)=>{
      debugger
      this.assetHaveNotIncreaseList = result.items.filter((item)=> item.increaseAssetId == null);
      this.assetList = this.assetHaveNotIncreaseList;
    });
   
  }

  clickIncreaseAsset(){
    debugger
    var newAsset = new AssetDto;
    newAsset =this.asset;
    this.addAssetToIncreaseList.push(newAsset);
    this.asset = new AssetDto;
    // debugger
     this.assetList = this.assetHaveNotIncreaseList.filter(x => !this.addAssetToIncreaseList.map(y => y?.assetCode).includes(x?.assetCode));
  }
  setIncreaseAssetCode(){
    debugger
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
}
