import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { CreateOrEditAssetComponent } from './create-or-edit-asset/create-or-edit-asset.component';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import * as moment from 'moment';
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent extends AppComponentBase implements OnInit {
  assetList;
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
  this.getAssets();
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
        this.assetList.map((item)=>{ 
          item.creationTime = item.creationTime? moment(item.creationTime).format("DD-MM-YYYY") : undefined;
          item.increaseAssetDate = item.increaseAssetDate ? moment(item.increaseAssetDate).format("DD-MM-YYYY") : undefined});
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.assetList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  createOrEditAsset(asset?: AssetInputDto): void {
    if(!asset)
    this._router.navigate(["/app/contents/asset/create"]);
    else
    this._router.navigate(["/app/contents/asset/" + asset?.id]);
    // this.createOrEditAssetModal.show(asset);
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
                  this.getAssets();
                  this.notify.success(this.l('SuccessfullyDeleted'));
              });
          }
      }
  );
  }
}
