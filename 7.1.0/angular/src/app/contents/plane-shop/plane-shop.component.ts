import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { PlaneShopInputDto,PlaneShopServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-plane-shop',
  templateUrl: './plane-shop.component.html',
  styleUrls: ['./plane-shop.component.css']
})
export class PlaneShopComponent extends AppComponentBase implements OnInit {
  planeShopList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  //@ViewChild('createOrEditPlaneMaintainModal', { static: true }) createOrEditPlaneMaintainModal: CreateOrEditPlaneMaintainComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private planeShopService: PlaneShopServiceProxy,
    private _router: Router
  ) {
    super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
   }

  ngOnInit(): void {
    this.getPlaneShops();
  }
  getPlaneShops(event?: LazyLoadEvent){
    
  this.primengTableHelper.showLoadingIndicator();
    this.loading = true;
    this.planeShopService.getPlaneShops()
    .subscribe(result => {
      this.loading = false;
        this.planeShopList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.planeShopList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }
  createOrEditPlaneShop(planeShop?: PlaneShopInputDto): void {
    if(!planeShop)
    this._router.navigate(["/app/contents/plane-shop/create"]);
    else
    this._router.navigate(["/app/contents/plane-shop/" + planeShop?.id]);
  }
  deletePlaneShop(planeShop: PlaneShopInputDto){
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
                
                  this.getPlaneMaintains();
                  this.notify.success(this.l('SuccessfullyDeleted'));
              });
            }
        } 
    );*/
  }

}
