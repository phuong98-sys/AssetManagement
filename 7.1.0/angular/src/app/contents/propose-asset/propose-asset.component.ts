import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PlaneMaintainInputDto, ProposeAssetInputDto, ProposeAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
//import { CreateOrEditPlaneMaintainComponent } from './create-or-edit-plane-maintain/create-or-edit-plane-maintain.component';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';

@Component({
  selector: 'app-propose-asset',
  templateUrl: './propose-asset.component.html',
  styleUrls: ['./propose-asset.component.css']
})

export class ProposeAssetComponent extends AppComponentBase implements OnInit {
  proposeAssetList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  //@ViewChild('createOrEditPlaneMaintainModal', { static: true }) createOrEditPlaneMaintainModal: CreateOrEditPlaneMaintainComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private proposeAssetService: ProposeAssetServiceProxy,
    private _router: Router
  ) {
    super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
   }

  ngOnInit(): void {
    this.getProposeAssets();
  }
  getProposeAssets(event?: LazyLoadEvent){
    debugger
  this.primengTableHelper.showLoadingIndicator();
    this.loading = true;
    this.proposeAssetService.getProposeAssets()
    .subscribe(result => {
      this.loading = false;
        this.proposeAssetList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.proposeAssetList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }
  createOrEditProposeAsset(proposeAsset?: ProposeAssetInputDto): void {
    if(!proposeAsset)
    this._router.navigate(["/app/contents/propose-asset/create"]);
    else
    this._router.navigate(["/app/contents/propose-asset/" + proposeAsset?.id]);
  }
  deletePlaneMaintain(planeMaintain: PlaneMaintainInputDto){
    /*this.message.confirm(
      this.l('Kế hoạch bảo dưỡng "' + planeMaintain.id + '" này sẽ bị xóa'),
      this.l('Bạn chắc chắn xóa kế hoạch bảo dưỡng này'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              this.planeMaintainService
              .deletePlaneMaintain(planeMaintain.id)
              .pipe(finalize(() => this.loading = false))
              .subscribe(() => {
                debugger
                  this.getPlaneMaintains();
                  this.notify.success(this.l('SuccessfullyDeleted'));
              });
            }
        } 
    );*/
  }
}
