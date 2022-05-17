import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, AssetTransferDto, DepartmentDto, TransferDto, TransferInputDto, TransferServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddAssetTransferComponent } from '../add-asset-transfer/add-asset-transfer.component';

@Component({
  selector: 'app-create-or-edit-transfer',
  templateUrl: './create-or-edit-transfer.component.html',
  styleUrls: ['./create-or-edit-transfer.component.css']
})
export class CreateOrEditTransferComponent extends AppComponentBase implements OnInit {
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('addAssetTransferModal', { static: true }) addAssetTransferModal: AddAssetTransferComponent
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("transferForm", { static: true }) private submitForm: NgForm;
  active = false;
  saving = false;
  loading = false;
  transfer : TransferDto = new TransferDto();
  transferId: number;
  selectedAssetTable: AssetDto[] = [];
  transferList:TransferInputDto[];
  deletedAssetListFromTable : AssetDto[] = [];
  addAssetToTransferList : AssetDto[] = [];
  deleteAssetConfirmedList : AssetTransferDto[] = [];
  employeeList: any;//
  departmentList: DepartmentDto[] = [];
  transferStatusList : TransferDto[]=[]; //
  selectedAny: any; //
        //
        advancedFiltersVisible = false;
        keyword ='';
  constructor( 
    injector: Injector,
    private assetService: AssetServiceProxy,
    private transferService: TransferServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
      super(injector);
      if (this._activatedRoute.snapshot.params['id']) {
        this.transferId = Number(this._activatedRoute.snapshot.params['id']);
        this.getAssetTransfer(this.transferId);
        debugger
      }
   }

  ngOnInit(): void {
    debugger
    this.getTransferForEdit();
    
   this.getTransfers();
   this.getTransferList();
  }
  close(){

  }
  getTransferList(){
    this.transferService.getTransfers()
    .subscribe((result)=>{
        this.transferList = result.items;
    });
  }
  getTransfers(){
    this.transferService.getTransfers().subscribe((result) => {
      this.transferList = result.items;
    });
  }
  getAssetTransfer(transferId: number){
    this.assetService.getTransfer(transferId)
    .subscribe((result) => {
        // this.selectedAssetTable = result.items;
    })
  }
  show(transfer?: TransferInputDto): void {
    // if(suggestionHandling?.id){
    //   this.suggestionHandling = suggestionHandling;
    // }
    this.addAssetTransferModal.show(this.deletedAssetListFromTable);
    this.deletedAssetListFromTable = [];
    
  }
  addAssetTransferToTable(assetList){
    
    this.selectedAssetTable = [ ...this.selectedAssetTable, ...assetList];
    console.log("list =", this.selectedAssetTable);
  }
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      
      this.saving= true;
      // ghi tăng tài sản
      debugger
       //this.transfer.creationTime =  moment.utc(this.transfer.creationTime?.toString());
       this.transfer.dateFound = moment.utc( this.transfer.dateFound.toString());
          this.transferService.insertOrUpdateTransfer(this.transfer)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            debugger
              this.transfer = result;
              this.notify.info(this.l("SavedSuccessfully"));
              this.close();
              // this.modalSave.emit(null);
          });
      }
  }
  validateForm(form) {
    Object.keys(form?.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  deleteAssetItemFromTable(asset : AssetTransferDto){
    debugger
    this.message.confirm(
      this.l('Tài sản với tên ' + asset.assetName+ " sẽ bị xóa khỏi bảng"),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              // this.deletedAssetListFromTable.push(asset);
            //  this.deletedAssetListFromTable.push(asset);
              this.selectedAssetTable = this.selectedAssetTable.filter(x => x.id != asset.id);
              // set tổng nguyên giá
              this.selectedAssetTable.forEach((item) =>{
                // this.suggestionHandling.totalAssetValue += item.orginalPrice;
              })
            //  this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(asset);
            //  });
              // this.deleteAssetList = []; 

          }
      }
  );
  }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.addAssetToTransferList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.addAssetToTransferList.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  getTransferForEdit(){
    forkJoin(
    this.transferService.getTransfer(this.transferId),
    /*this.departmentService.getDepartments(),
    this.employeeService.getEmployees()*/
    )
    .pipe(finalize(() => (this.loading = false)))
      .subscribe(([res1, ]) => {
        
        this.transfer = res1;
        //this.suggestionHandling.creationTime = res1["creationTime"]? res1["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.transfer.dateFound = res1["dateFound"]? res1["dateFound"].format("YYYY-MM-DD"):<any>undefined;
        
      })
  }
  setNumbersTransfer(){

  }
  onSelectDepartmentFromTableFromTable(asset : AssetTransferDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index].employeeId = null;
    this.selectedAssetTable[index].departmentId = asset.departmentId;
  }
  onChangeAny(){}
  selecteAssetListToTransfer(){
    
    this.addAssetTransferModal.show();
  }
  // show(increaseAsset?: IncreaseAssetInputDto): void {
  //   if(increaseAsset?.id){
  //     this.increaseAsset = increaseAsset;
  //     // this.selectedAssetType = this.assetTypeList.find((item)=> item.id == asset.assetTypeId);
  //   }
  //   this.modal.show();
    
  // }
}


