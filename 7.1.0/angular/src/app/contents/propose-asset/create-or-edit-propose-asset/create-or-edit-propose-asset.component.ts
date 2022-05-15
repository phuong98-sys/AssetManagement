import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { ProposeAssetDto, AssetDto, AssetServiceProxy, ProposeAssetInputDto, ProposeAssetServiceProxy, ProposeAssetDetailDto, ProposeAssetDetailInputDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

type NewType = EventEmitter<any>;

@Component({
  selector: 'app-create-or-edit-propose-asset',
  templateUrl: './create-or-edit-propose-asset.component.html',
  styleUrls: ['./create-or-edit-propose-asset.component.css']
})
export class CreateOrEditProposeAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("proposeAssetForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave: NewType = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  proposeAsset: ProposeAssetInputDto = new ProposeAssetInputDto();
  proposeAssetDetail: ProposeAssetDetailInputDto = new ProposeAssetDetailInputDto();
  assetList: AssetDto[];
  proposeAssetList: ProposeAssetDto [];
  selectedAsset: ProposeAssetDetailDto;
  dateFoundInput: any;
  proposeAssetId : number;
  addAssetToProposeAssetList : ProposeAssetDetailDto[] = [];
  keyword ='';
  constructor(
    injector: Injector,
    private proposeAssetService: ProposeAssetServiceProxy,

    private assetService: AssetServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        
        if (this._activatedRoute.snapshot.params['id']) {
          this.proposeAssetId = Number(this._activatedRoute.snapshot.params['id']);
          
      }
  }

  ngOnInit(): void {
    this.getProposeAssetForEdit();
    this.getProposeAssets();

  }
  getProposeAssets(){
    this.proposeAssetService.getProposeAssets().subscribe((result)=>{
      this.proposeAssetList = result.items;
      
    });
  }
  onSelectAsset(){
    this.proposeAssetDetail.assetTypeName=this.selectedAsset.assetTypeName;
    this.proposeAssetDetail.departmentName=this.selectedAsset.departmentName;
    this.proposeAssetDetail.quantity=this.selectedAsset.quantity;
    this.proposeAssetDetail.assetName=this.selectedAsset.assetName;
    this.proposeAssetDetail.describe=this.selectedAsset.describe;
    this.proposeAssetDetail.estimates=this.selectedAsset.estimates;
  }
  show(proposeAsset?: ProposeAssetInputDto): void {
    if(proposeAsset?.id){
      this.proposeAsset = proposeAsset;
      //this.selectedAsset = this.assetList.find((item)=> item.id == planeMaintain.assetId);
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
    /*debugger
    if (this.validateForm(this.submitForm.form)) {
      this.saving= true;
      this.planeMaintain.expectedDate= moment.utc( this.expectedDateInput);

      this.planeMaintainService
      .insertOrUpdatePlaneMaintain(this.planeMaintain)
      .pipe(
          finalize(() => {
              this.saving = false;
          })
      )
      .subscribe(() => {
        this.saving = false;
        if(!this.planeMaintain.id){
          this.notify.info(this.l("SavedSuccessfully"));
        }
        else{
          this.notify.info(this.l("UpdatedSuccessfully"));
        }
          this.close();
          this.modalSave.emit(null);
      });

    }*/
  }
  resetForm(){
    this.proposeAsset.id=null;
  }
  close(): void {
    
    this.active = false;
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/propose-asset']);
  }
  getProposeAssetForEdit(){
    forkJoin(
      this.proposeAssetService.getProposeAsset(this.proposeAssetId),
      this.assetService.getAssets()
  )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2]) => {
          this.proposeAsset = res1;
          this.assetList = res2.items;
          //this.selectedAsset = this.assetList.find((item)=> item.id == this.proposeAsset.assetId);
      });
  }
  selecteAssetListToProposeAsset(){
    
    //this.addAssetTransferModal.show();
  }
  setNumbersProposeAsset(){

  }
}


