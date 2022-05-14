import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PlaneMaintainDto, PlaneMaintainInputDto, PlaneMaintainServiceProxy, AssetDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

type NewType = EventEmitter<any>;

@Component({
  selector: 'app-create-or-edit-plane-maintain',
  templateUrl: './create-or-edit-plane-maintain.component.html',
  styleUrls: ['./create-or-edit-plane-maintain.component.css']
})
export class CreateOrEditPlaneMaintainComponent extends AppComponentBase implements OnInit {
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("planeMaintainForm", { static: true }) private submitForm: NgForm;
  @Output() modalSave: NewType = new EventEmitter<any>();
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  planeMaintain: PlaneMaintainInputDto = new PlaneMaintainInputDto();
  assetList: AssetDto[];
  planeMaintainList: PlaneMaintainDto [];
  selectedAsset: AssetDto;
  expectedDateInput: any;
  planeMaintainId : number;
  constructor(
    injector: Injector,
    private planeMaintainService: PlaneMaintainServiceProxy,
    private assetService: AssetServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {
        super(injector);
        debugger
        if (this._activatedRoute.snapshot.params['id']) {
          this.planeMaintainId = Number(this._activatedRoute.snapshot.params['id']);
          
      }
  }

  ngOnInit(): void {
    this.getPlaneMaintainForEdit();
    this.getPlaneMaintains();

  }
  getPlaneMaintains(){
    this.planeMaintainService.getPlaneMaintains().subscribe((result)=>{
      this.planeMaintainList = result.items;
      
    });
  }
  onSelectAsset(){
    this.planeMaintain.assetId = this.selectedAsset.id;
    this.planeMaintain.assetTypeName=this.selectedAsset.assetTypeName;
    this.planeMaintain.departmentName=this.selectedAsset.departmentName;
  }
  show(planeMaintain?: PlaneMaintainInputDto): void {
    if(planeMaintain?.id){
      this.planeMaintain = planeMaintain;
      this.selectedAsset = this.assetList.find((item)=> item.id == planeMaintain.assetId);
    }
    this.modal.show();
    
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
  }
  /*
  save(){
    if (this.validateForm(this.submitForm.form)) {
      this.saving= true;
      if(!this.planeMaintain.id){
        this.planeMaintainService
        .insertOrUpdatePlaneMaintain(this.planeMaintain)
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
      if(this.planeMaintain.id){
        this.planeMaintainService
        .insertOrUpdatePlaneMaintain(this.planeMaintain)
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
  */
  save(){
    debugger
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

    }
  }
  resetForm(){
    this.planeMaintain.id=null;
  }
  close(): void {
    debugger
    this.active = false;
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/plane-maintain']);
  }
  getPlaneMaintainForEdit(){
    forkJoin(
      this.planeMaintainService.getPlaneMaintain(this.planeMaintainId),
      this.assetService.getAssets()
  )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, res2]) => {
          this.planeMaintain = res1;
          this.assetList = res2.items;
          this.selectedAsset = this.assetList.find((item)=> item.id == this.planeMaintain.assetId);
      });
  }
}


