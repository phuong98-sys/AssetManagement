import { Component, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetServiceProxy } from '@shared/service-proxies/service-proxies';

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
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy) {   
        super(injector);
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'assetCode', header: 'Asset Code' },
      { field: 'assetName', header: 'Asset Name' },
      // { field: 'brand', header: 'Brand' },
      // { field: 'color', header: 'Color' }
  ];
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
}
