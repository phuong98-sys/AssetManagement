import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AssetTypeServiceProxy } from '@shared/service-proxies/service-proxies';
@Component({
  templateUrl: './asset-type.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTypeComponent extends AppComponentBase implements OnInit{
  assetTypeList;
  cols: any[];
  loading =  false;
  totalRecords: number;
    constructor(
        injector: Injector,
        private assetTypeService: AssetTypeServiceProxy) {   
            super(injector);
      }
    ngOnInit() {
        this.getAll();
        this.cols = [
          { field: 'assetTypeCode', header: 'Asset Type Code', width: '20%' },
          { field: 'assetTypeName', header: 'Asset Type Name' },
        ];
    

    }
    loadCarsLazy(event) {
    // this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a network
  
  }
    getAll(){
      this.loading = true;
        this.assetTypeService.getAll()
        .subscribe(result => {
          this.loading = false;
            this.assetTypeList = result.items;
            this.totalRecords = this.assetTypeList?.length;
        });
    }
}
