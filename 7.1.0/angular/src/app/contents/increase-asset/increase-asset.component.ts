import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { CreateOrEditIncreaseAssetComponent } from './create-or-edit-increase-asset/create-or-edit-increase-asset.component';

@Component({
  selector: 'app-increase-asset',
  templateUrl: './increase-asset.component.html',
  styleUrls: ['./increase-asset.component.css']
})
export class IncreaseAssetComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditIncreaseAssetModal', { static: true }) createOrEditIncreaseAssetModal: CreateOrEditIncreaseAssetComponent;
  assetList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  constructor(
    injector: Injector,
    private assetService: IncreaseAssetServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    }
    getAll(){
      this.loading = true;
      this.assetService.getIncreaseAssets()
      .subscribe(result => {
        this.loading = false;
          this.assetList = result.items;
          
          this.assetList.map((item)=>{ 
            item.creationTime = moment(item.creationTime).format("DD-MM-YYYY");
            item.increaseAssetDate = moment(item.increaseAssetDate).format("DD-MM-YYYY")});
          this.totalRecords = this.assetList?.length;
      });
    }
  
    createOrEditIncreaseAsset(increaseAsset?: IncreaseAssetInputDto): void {
      if(!increaseAsset)
      this._router.navigate(["/app/contents/increase-asset/create"]);
      else
      this._router.navigate(["/app/contents/increase-asset/" + increaseAsset?.id]);
    }
    deleteIncreaseAsset(increaseAsset: IncreaseAssetInputDto){
      this.message.confirm(
        this.l('Chứng từ này sẽ bị xóa'),
        this.l('Bạn chắc chắn xóa chứng từ này'),
        (isConfirmed) => {
            if (isConfirmed) {
                this.loading = true;
                this.assetService
                .deleteIncreaseAsset(increaseAsset.id)
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
