import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateOrEditDepreciationAssetComponent } from '@app/contents/depreciation/create-or-edit-depreciation-asset/create-or-edit-depreciation-asset.component';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetTypeDto, DepreciationInputDto, DepreciationServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.css']
})
export class DepreciationComponent extends AppComponentBase implements OnInit {
  @ViewChild('createOrEditDepreciationModal', { static: true }) createOrEditDepreciationModal: CreateOrEditDepreciationAssetComponent;
  depreciationList;
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
  appSession: any;
 //
  constructor(
    injector: Injector,
    private depreciationService: DepreciationServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    this.userId = this.appSession.user.id;
    
    }
    getAll(){
      this.loading = true;
      this.depreciationService.getDepreciations()
      .subscribe(result => {
        this.loading = false;
          this.depreciationList = result.items;
          
          this.depreciationList.map((item)=>{ 
            item.creationTime = moment(item.creationTime).format("DD/MM/YYYY");
            item.depreciationDate = moment(item.depreciationDate).format("DD/MM/YYYY")});
          this.totalRecords = this.depreciationList?.length;
      });
    }
  
    createOrEditDepreciation(depreciation?: DepreciationInputDto): void {
      if(!depreciation)
      this._router.navigate(["/app/contents/depreciation-asset/create"]);
      else
      this._router.navigate(["/app/contents/depreciation-asset/" + depreciation?.id]);
    }
    deleteDepreciation(depreciation: DepreciationInputDto){
      this.message.confirm(
        this.l('Chứng từ này sẽ bị xóa'),
        this.l('Bạn chắc chắn xóa chứng từ này'),
        (isConfirmed) => {
            if (isConfirmed) {
                this.loading = true;
                this.depreciationService
                .deleteDepreciation(depreciation.id)
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
