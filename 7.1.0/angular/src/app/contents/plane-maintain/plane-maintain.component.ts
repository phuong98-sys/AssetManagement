import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PlaneMaintainInputDto, PlaneMaintainServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { CreateOrEditPlaneMaintainComponent } from './create-or-edit-plane-maintain/create-or-edit-plane-maintain.component';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';

@Component({
  selector: 'app-plane-maintain',
  templateUrl: './plane-maintain.component.html',
  styleUrls: ['./plane-maintain.component.css']
})

export class PlaneMaintainComponent extends AppComponentBase implements OnInit {
  planeMaintainList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  @ViewChild('createOrEditPlaneMaintainModal', { static: true }) createOrEditPlaneMaintainModal: CreateOrEditPlaneMaintainComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private planeMaintainService: PlaneMaintainServiceProxy,
    private _router: Router
  ) {
    super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
   }

  ngOnInit(): void {
    this.getPlaneMaintains();
  }
  getPlaneMaintains(event?: LazyLoadEvent){
    debugger
  this.primengTableHelper.showLoadingIndicator();
    this.loading = true;
    this.planeMaintainService.getPlaneMaintains()
    .subscribe(result => {
      this.loading = false;
        this.planeMaintainList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.planeMaintainList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }
  createOrEditPlaneMaintain(planeMaintain?: PlaneMaintainInputDto): void {
    if(!planeMaintain)
    this._router.navigate(["/app/contents/plane-maintain/create"]);
    else
    this._router.navigate(["/app/contents/plane-maintain/" + planeMaintain?.id]);
  }
  deletePlaneMaintain(planeMaintain: PlaneMaintainInputDto){
    this.message.confirm(
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
    );
  }
}
