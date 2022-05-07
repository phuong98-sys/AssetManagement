import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateOrEditAssetComponent } from '../asset/create-or-edit-asset/create-or-edit-asset.component';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends AppComponentBase implements OnInit {
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
    this.assetService.getAssets()
    .subscribe(result => {
      this.loading = false;
        this.assetList = result.items;
        this.totalRecords = this.assetList?.length;
    });
  }

  createOrEditAsset(asset?: AssetDto): void {
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