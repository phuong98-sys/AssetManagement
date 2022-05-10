import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetServiceProxy, AssetTypeInputDto, AssetTypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
@Component({
  selector: 'app-asset-type',
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent extends AppComponentBase implements OnInit {
  assetTypeList;
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  data =
  [
      {
          "data":{
              "name":"Documents",
              "size":"75kb",
              "type":"Folder"
          },
          "children":[
              {
                  "data":{
                      "name":"Work",
                      "size":"55kb",
                      "type":"Folder"
                  },
                  "children":[
                      {
                          "data":{
                              "name":"Expenses.doc",
                              "size":"30kb",
                              "type":"Document"
                          }
                      },
                      {
                          "data":{
                              "name":"Resume.doc",
                              "size":"25kb",
                              "type":"Resume"
                          }
                      }
                  ]
              },
              {
                  "data":{
                      "name":"Home",
                      "size":"20kb",
                      "type":"Folder"
                  },
                  "children":[
                      {
                          "data":{
                              "name":"Invoices",
                              "size":"20kb",
                              "type":"Text"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "data":{
              "name":"Pictures",
              "size":"150kb",
              "type":"Folder"
          },
          "children":[
              {
                  "data":{
                      "name":"barcelona.jpg",
                      "size":"90kb",
                      "type":"Picture"
                  }
              },
              {
                  "data":{
                      "name":"primeui.png",
                      "size":"30kb",
                      "type":"Picture"
                  }
              },
              {
                  "data":{
                      "name":"optimus.jpg",
                      "size":"30kb",
                      "type":"Picture"
                  }
              }
          ]
      }
  ]
  @ViewChild("paginator", { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private assetTypeService: AssetTypeServiceProxy,
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
    this.assetTypeService.getAssetTypes()
    .subscribe(result => {
      this.loading = false;
        this.assetTypeList = result.items;
        this.primengTableHelper.totalRecordsCount = result.items.length;
        this.primengTableHelper.records = result.items;
        this.totalRecords = this.assetTypeList?.length;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  createOrEditAssetType(assetType?: AssetTypeInputDto): void {
    if(!assetType)
    this._router.navigate(["/app/contents/asset-type/create"]);
    else
    this._router.navigate(["/app/contents/asset-type/" + assetType?.id]);
  }
  deleteAsset(asset: AssetInputDto){
  //   this.message.confirm(
  //     this.l('Tài sản tên "' + asset.assetName + '" này sẽ bị xóa'),
  //     this.l('Bạn chắc chắn xóa tài sản này'),
  //     (isConfirmed) => {
  //         if (isConfirmed) {
  //             this.loading = true;
  //             this.assetTypeServ
  //             .deleteAssetType(asset.id)
  //             .pipe(finalize(() => this.loading = false))
  //             .subscribe(() => {
  //                 this.getAll();
  //                 this.notify.success(this.l('SuccessfullyDeleted'));
  //             });
  //         }
  //     }
  // );
  }
}
