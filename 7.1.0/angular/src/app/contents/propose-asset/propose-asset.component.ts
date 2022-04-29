import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { Paginator } from 'primeng/paginator';
import { finalize } from 'rxjs/operators';
import { CreateOrEditProposeComponent } from './create-or-edit-propose/create-or-edit-propose.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-propose-asset',
  templateUrl: './propose-asset.component.html',
  styleUrls: ['./propose-asset.component.css']
})
export class ProposeAssetComponent extends AppComponentBase implements OnInit {
  assetList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  primengTableHelper: PrimengTableHelper;
  @ViewChild('createOrEditProposeModal', { static: true }) createOrEditProposeModal: CreateOrEditProposeComponent;
  @ViewChild("paginator", { static: true }) paginator: Paginator;

  constructor(
    injector: Injector,
    /*private assetService: AssetServiceProxy,*/
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
  }
  /*createOrEditAsset(asset?: AssetInputDto): void {
    this.createOrEditAssetModal.show(asset);
  }*/

}
