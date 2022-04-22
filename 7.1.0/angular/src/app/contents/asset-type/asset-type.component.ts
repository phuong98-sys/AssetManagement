import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AssetInputDto, AssetServiceProxy, AssetTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
@Component({
  templateUrl: './asset-type.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent extends AppComponentBase implements OnInit{
  assetTypeList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  assetList;
    constructor(
        injector: Injector,
        private assetTypeService: AssetTypeServiceProxy,
        private assetService: AssetServiceProxy) {   
            super(injector);
      }
    ngOnInit() {
        this.getAll();
        this.cols = [
          { field: 'assetTypeCode', header: 'Asset Type Code', width: '20%' },
          { field: 'assetTypeName', header: 'Asset Type Name' },
        ];
    }
  
    getAll(){
      this.loading = true;
      debugger
        this.assetTypeService.getAll()
        .subscribe(result => {
          debugger
          this.loading = false;
            this.assetTypeList = result.items;
            this.totalRecords = this.assetTypeList?.length;
        });
        this.assetService.getAll().subscribe( result =>{
          debugger
          this.assetList = result.items;
        })
    }
    createOrEditAsset(asset?: AssetInputDto): void {
      // this.createOrEditAssetModal.show(asset);
    }
    deleteAsset(asset: AssetInputDto){
      this.message.confirm(
        this.l('Tài sản tên "' + asset.assetName + '" này sẽ bị xóa'),
        this.l('Bạn chắc chắn xóa tài sản này'),
        (isConfirmed) => {
            if (isConfirmed) {
                this.loading = true;
                // this.assetService
                // .deleteAsset(asset.id)
                // .pipe(finalize(() => this.loading = false))
                // .subscribe(() => {
                //     this.getAll();
                //     this.notify.success(this.l('SuccessfullyDeleted'));
                // });
            }
        }
    );
    }
}
