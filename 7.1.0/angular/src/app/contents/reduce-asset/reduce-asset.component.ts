import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { IncreaseAssetInputDto, IncreaseAssetServiceProxy, ReduceAssetInputDto, ReduceAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { CreateOrEditReduceAssetComponent } from './create-or-edit-reduce-asset/create-or-edit-reduce-asset.component';

@Component({
  selector: 'app-reduce-asset',
  templateUrl: './reduce-asset.component.html',
  styleUrls: ['./reduce-asset.component.css']
})
export class ReduceAssetComponent extends AppComponentBase implements OnInit {
  reduceAssetList;
  loading =  false;
  totalRecords: number;
  @ViewChild('createOrEditIncreaseAssetModal', { static: true }) createOrEditIncreaseAssetModal: CreateOrEditReduceAssetComponent;
  constructor(
    injector: Injector,
    private reduceAssetService: ReduceAssetServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
    this.getAll();
    }
    getAll(){
      this.loading = true;
      this.reduceAssetService.getReduceAssets()
      .subscribe(result => {
        this.loading = false;
          this.reduceAssetList = result.items;
          this.reduceAssetList.map((item)=>{ 
            item.creationTime = moment(item.creationTime).format("DD-MM-YYYY");
            item.reduceAssetDate = moment(item.reduceAssetDate).format("DD-MM-YYYY")});
          this.totalRecords = this.reduceAssetList?.length;
      });
    }
  
    createOrEditReduceAsset(reduceAsset?: ReduceAssetInputDto): void {
      
      if(!reduceAsset)
      this._router.navigate(["/app/contents/reduce-asset/create"]);
      else
      this._router.navigate(["/app/contents/reduce-asset/" + reduceAsset?.id]);
    }
    deleteReduceAsset(reduceAsset: ReduceAssetInputDto){
      this.message.confirm(
        this.l('Chứng từ này sẽ bị xóa'),
        this.l('Bạn chắc chắn xóa chứng từ này'),
        (isConfirmed) => {
            if (isConfirmed) {
                this.loading = true;
                this.reduceAssetService
                .deleteReduceAsset(reduceAsset.id)
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
