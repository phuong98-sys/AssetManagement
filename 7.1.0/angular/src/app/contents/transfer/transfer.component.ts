import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { TransferInputDto, TransferServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent extends AppComponentBase implements OnInit {

  transferList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  //@ViewChild('createOrEditPlaneMaintainModal', { static: true }) createOrEditPlaneMaintainModal: CreateOrEditPlaneMaintainComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private transferService: TransferServiceProxy,
    private _router: Router
  ) {
    super(injector);
      
        this.primengTableHelper = new PrimengTableHelper();
   }

  ngOnInit(): void {
    this.getTransfers();
  }
  getTransfers(event?: LazyLoadEvent){
    debugger
  this.primengTableHelper.showLoadingIndicator();
    this.loading = true;
    this.transferService.getTransfers()
    .subscribe(result => {
      this.loading = false;
        this.transferList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.transferList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }
  createOrEditTransfer(transfer?: TransferInputDto): void {
    if(!transfer)
    this._router.navigate(["/app/contents/transfer/create"]);
    else
    this._router.navigate(["/app/contents/transfer/" + transfer?.id]);
  }
  deleteTransfer(transfer: TransferInputDto){
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
