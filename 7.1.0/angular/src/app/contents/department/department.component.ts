import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetInputDto, AssetServiceProxy, DepartmentDto, DepartmentServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateOrEditAssetComponent } from '../asset/create-or-edit-asset/create-or-edit-asset.component';
import * as moment from 'moment';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends AppComponentBase implements OnInit {
  departmentList;
  cols: any[];
  loading =  false;
  totalRecords: number;
  @ViewChild('createOrEditAssetModal', { static: true }) createOrEditAssetModal: CreateOrEditAssetComponent;
  constructor(
    injector: Injector,
    private departmentService: DepartmentServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
  this.getAll();
  }
  getAll(){
    this.loading = true;
    this.departmentService.getDepartments()
    .subscribe(result => {
      this.loading = false;
        this.departmentList = result.items;
        this.departmentList.map((item)=>{ 
          item.creationTime = moment(item.creationTime).format("DD-MM-YYYY");
          item.lastModificationTime = moment(item.lastModificationTime).format("DD-MM-YYYY")});
        this.totalRecords = this.departmentList?.length;
    });
  }

  createOrEditDepartment(department?: DepartmentDto): void {
    if(!department)
    this._router.navigate(["/app/contents/department/create"]);
    else
    this._router.navigate(["/app/contents/department/" + department?.id]);
    // this.createOrEditAssetModal.show(asset);
  }
  deleteDepartment(department : DepartmentDto){
    this.message.confirm(
      this.l('Bộ phận tên "' + department.departmentName + '" này sẽ bị xóa'),
      this.l('Bạn chắc chắn xóa bộ phận này'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              // this.departmentService
              // .deleteAsset(asset.id)
              // .pipe(finalize(() => this.loading = false))
              // .subscribe(() => {
              //     this.getAll();
              //     this.notify.success(this.l('SuccessfullyDeleted'));
              //});
          }
      }
  );
  }
}