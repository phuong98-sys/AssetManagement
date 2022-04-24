import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { CreateOrEditAssetComponent } from './create-or-edit-asset/create-or-edit-asset.component';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent extends AppComponentBase implements OnInit {
  assetList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  @ViewChild('createOrEditAssetModal', { static: true }) createOrEditAssetModal: CreateOrEditAssetComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private _router: Router) {   
        super(injector);
        this.primengTableHelper = new PrimengTableHelper();
  }

  ngOnInit(): void {
  this.getAll();
  }
  getAll(event?: LazyLoadEvent){
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator?.changePage(0);
      return;
  }
  this.primengTableHelper.showLoadingIndicator();
    this.loading = true;
    this.assetService.getAll()
    .subscribe(result => {
      this.loading = false;
        this.assetList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.assetList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  createOrEditAsset(asset?: AssetInputDto): void {
    this.createOrEditAssetModal.show(asset);
  }
  deleteAsset(asset: AssetInputDto){
    this.message.confirm(
      this.l('Tài sản tên "' + asset.assetName + '" này sẽ bị xóa'),
      this.l('Bạn chắc chắn xóa tài sản này'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              this.assetService
              .deleteAsset(asset.id)
              .pipe(finalize(() => this.loading = false))
              .subscribe(() => {
                  this.getAll();
                  this.notify.success(this.l('SuccessfullyDeleted'));
              });
          }
      }
  );
  }
}
