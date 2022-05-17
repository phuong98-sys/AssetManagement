import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, PlaneShopInputDto, PlaneShopDto, PlaneShopServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
//import { AddAssetProposeAssetComponent } from '../add-asset-propose-asset/add-asset-propose-asset.component';

type NewType = EventEmitter<any>;

@Component({
  selector: 'app-create-or-edit-plane-shop',
  templateUrl: './create-or-edit-plane-shop.component.html',
  styleUrls: ['./create-or-edit-plane-shop.component.css']
})
export class CreateOrEditPlaneShopComponent extends AppComponentBase implements OnInit {
  //@ViewChild('addAssetProposeAssetModal', { static: true }) addAssetProposeAssetModal: AddAssetProposeAssetComponent
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("planeShopForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave: NewType = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  planeShop: PlaneShopInputDto = new PlaneShopInputDto();
  //proposeAssetDetail: ProposeAssetDetailInputDto = new ProposeAssetDetailInputDto();
  assetList: AssetDto[];
  planeShopList: PlaneShopDto [];
  //selectedAsset: ProposeAssetDetailDto;
  dateFoundInput: any;
  planeShopId : number;
  //addAssetToProposeAssetList : ProposeAssetDetailDto[] = [];
  keyword ='';
  constructor(
    injector: Injector,
    private planeShopService: PlaneShopServiceProxy,

    private assetService: AssetServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        
        if (this._activatedRoute.snapshot.params['id']) {
          this.planeShopId = Number(this._activatedRoute.snapshot.params['id']);
          
      }
  }

  ngOnInit(): void {
    this.getPlaneShopForEdit();
    this.getPlaneShops();

  }
  getPlaneShops(){
    this.planeShopService.getPlaneShops().subscribe((result)=>{
      this.planeShopList = result.items;
      
    });
  }
  onSelectAsset(){
    /*this.proposeAssetDetail.assetTypeName=this.selectedAsset.assetTypeName;
    this.proposeAssetDetail.departmentName=this.selectedAsset.departmentName;
    this.proposeAssetDetail.quantity=this.selectedAsset.quantity;
    this.proposeAssetDetail.assetName=this.selectedAsset.assetName;
    this.proposeAssetDetail.describe=this.selectedAsset.describe;
    this.proposeAssetDetail.estimates=this.selectedAsset.estimates;*/
  }
  show(planeShop?: PlaneShopInputDto): void {
    if(planeShop?.id){
      this.planeShop = planeShop;
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
    this.planeShop.id=null;
  }
  close(): void {
    
    this.active = false;
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/propose-asset']);
  }
  getPlaneShopForEdit(){
    forkJoin(
      this.planeShopService.getPlaneShop(this.planeShopId),
      this.assetService.getAssets()
  )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2]) => {
          this.planeShop= res1;
          this.assetList = res2.items;
          //this.selectedAsset = this.assetList.find((item)=> item.id == this.proposeAsset.assetId);
      });
  }
  selecteAssetListToProposeAsset(){
    
    //this.addAssetProposeAssetModal.show();
  }
  setNumbersProposeAsset(){

  }
}


