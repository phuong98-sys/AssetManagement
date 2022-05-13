import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetTypeDto, IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
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
  increaseAssetList;
  loading =  false;
  totalRecords: number;
  userId : number;
  //
  keyword = '';
  advancedFiltersVisible = false;
  advancedFiltersAreShown = false;
  maxDateFilter: moment.Moment;
  minDateFilter: moment.Moment;
  selectedAssetType : AssetTypeDto;
  selectedAssetStatus: any;
  selectedReasonReduce: any;
  assetTypeList : AssetInputDto[] = [];
  filterText = '';
 //
  constructor(
    injector: Injector,
    private increaseAssetService: IncreaseAssetServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    this.userId = this.appSession.user.id;
    
    }
    getAll(){
      this.loading = true;
      this.increaseAssetService.getIncreaseAssets()
      .subscribe(result => {
        this.loading = false;
          this.increaseAssetList = result.items;
          
          this.increaseAssetList.map((item)=>{ 
            item.creationTime = moment(item.creationTime).format("DD/MM/YYYY");
            item.increaseAssetDate = moment(item.increaseAssetDate).format("DD/MM/YYYY")});
          this.totalRecords = this.increaseAssetList?.length;
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
                this.increaseAssetService
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
