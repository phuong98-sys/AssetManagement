import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { IncreaseAssetInputDto, IncreaseAssetServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateOrEditReduceAssetComponent } from './create-or-edit-reduce-asset/create-or-edit-reduce-asset.component';

@Component({
  selector: 'app-reduce-asset',
  templateUrl: './reduce-asset.component.html',
  styleUrls: ['./reduce-asset.component.css']
})
export class ReduceAssetComponent extends AppComponentBase implements OnInit {
  assetList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  @ViewChild('createOrEditIncreaseAssetModal', { static: true }) createOrEditIncreaseAssetModal: CreateOrEditReduceAssetComponent;
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
          this.totalRecords = this.assetList?.length;
      });
    }
  
    createOrEditINcreaseAsset(asset?: IncreaseAssetInputDto): void {
      debugger
      this.createOrEditIncreaseAssetModal.show(asset);
    }
    deleteAsset(asset: IncreaseAssetInputDto){
      this.message.confirm(
        this.l('Chứng từ này sẽ bị xóa'),
        this.l('Bạn chắc chắn xóa tài sản này'),
        (isConfirmed) => {
            if (isConfirmed) {
                this.loading = true;
                this.assetService
                .deleteIncreaseAsset(asset.id)
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
