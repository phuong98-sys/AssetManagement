import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateOrEditAssetComponent } from './create-or-edit-asset/create-or-edit-asset.component';

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
  @ViewChild('createOrEditAssetModal', { static: true }) createOrEditAssetModal: CreateOrEditAssetComponent;
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
  this.getAll();
  }
  getAll(){
    this.loading = true;
    this.assetService.getAll()
    .subscribe(result => {
      this.loading = false;
        this.assetList = result.items;
        this.totalRecords = this.assetList?.length;
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
