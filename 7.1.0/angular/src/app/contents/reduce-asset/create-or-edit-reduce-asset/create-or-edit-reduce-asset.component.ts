import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetDto, AssetServiceProxy, ReduceAssetInputDto, ReduceAssetServiceProxy, ReasonReduceDto, ReasonReduceServiceProxy, DepartmentServiceProxy, EmployeeServiceProxy, DepartmentDto, EmployeeDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AddAssetReduceAssetComponent } from '../add-asset-reduce-asset/add-asset-reduce-asset.component';
import { EditReduceAssetModalComponent } from '../edit-reduce-asset-modal/edit-reduce-asset-modal.component';

@Component({
  selector: 'app-create-or-edit-reduce-asset',
  templateUrl: './create-or-edit-reduce-asset.component.html',
  styleUrls: ['./create-or-edit-reduce-asset.component.css']
})
export class CreateOrEditReduceAssetComponent extends AppComponentBase implements OnInit {
  // @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild("reduceAssetForm", { static: true }) private submitForm: NgForm;
  @ViewChild("createOrEditModal", { static: true }) modal: ModalDirective;
  @ViewChild('editReduceAssetModal', { static: true }) editReduceAssetModal: EditReduceAssetModalComponent;
  @ViewChild('addAssetReduceAssetModal', { static: true }) addAssetReduceAssetModal: AddAssetReduceAssetComponent
  active = false;
  saving = false;
  loading = false;
  canChangeUserName = true;
  reduceAsset: ReduceAssetInputDto = new ReduceAssetInputDto();
  reduceAssetList: ReduceAssetInputDto[];
  asset: AssetDto = new AssetDto();
  assetList: AssetDto[];
  assetHaveNotReduceList: AssetDto[];
  addAssetToReduceList:  any[] = [];
  assetMessage = '';
  reduceAssetId: number;
  reduceAssetCodeMessage = "";
  deleteAssetList : AssetDto[] = [];
  reasonReduceList: ReasonReduceDto[];
  // selectedAssetType: AssetTypeDto;
  isSelectedAsset = false;
  isSelectedAllAsset = false;
  selectedReasonReduce : ReasonReduceDto;
  selectedReasonReduceFromTable : ReasonReduceDto;
  assetId : number;
  selectedTest : ReasonReduceDto;
      //
      advancedFiltersVisible = false;
      keyword ='';
  selectedAssetTable : AssetDto[] = [];
  deletedAssetListFromTable : AssetDto[] = [];
  deleteAssetConfirmedList: AssetDto[] = [];
  departmentList: DepartmentDto[] = [];
  employeeList: EmployeeDto[] = [];
  constructor(
    injector: Injector,
    private assetService: AssetServiceProxy,
    private reduceAssetService:ReduceAssetServiceProxy,
    private departmentService: DepartmentServiceProxy,
    private employeeService: EmployeeServiceProxy,
    private reasonReduceService: ReasonReduceServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
        super(injector);
        if (this._activatedRoute.snapshot.params['id']) {
          this.reduceAssetId = Number(this._activatedRoute.snapshot.params['id']);
          this.getAssetReduced(this.reduceAssetId);
        }
  }

  ngOnInit(): void {
    // this.getAssets();
     this.getReduceAssetForEdit();
     this.getDepartmentList();
     this.getEmployeeList();
    this.getReduceAssets();
    this.getReasonReduceList();
  }
  getReasonReduceList(){
    this.reasonReduceService.getReasonReduces()
    .subscribe((result)=>{
        this.reasonReduceList = result.items;
    });
  }
  getReduceAssets(){
    this.reduceAssetService.getReduceAssets().subscribe((result) => {
      this.reduceAssetList = result.items;
    });
  }
  getAssetReduced(reduceAssetId: number){
    this.assetService.getAssetReduced(reduceAssetId)
    .subscribe((result) => {
        this.selectedAssetTable = result.items;
    })
  }
  show(reduceAsset?: ReduceAssetInputDto): void {
    // if(reduceAsset?.id){
    //   this.reduceAsset = reduceAsset;
    // }
    this.addAssetReduceAssetModal.show(this.deletedAssetListFromTable);
    this.deletedAssetListFromTable = [];
    
  }
  validateForm(form) {
    Object.keys(form.controls).forEach((key) => {
        form.get(key).markAsTouched();
    });

    return form.valid;
}
  save(){
    if (this.validateForm(this.submitForm?.form)) {
      
      this.saving= true;
      // ghi tăng tài sản
      
       this.reduceAsset.creationTime =  moment.utc(this.reduceAsset.creationTime.toString());
       this.reduceAsset.reduceAssetDate = moment.utc( this.reduceAsset.reduceAssetDate.toString());
          this.reduceAssetService.insertOrUpdateReduceAsset(this.reduceAsset)
          .pipe(finalize(() => (this.saving = false)))
          .subscribe((result) => {
            
              this.reduceAsset = result;
              // ghi giảm tài sản
              this.selectedAssetTable.map((item) => { 
                item.reduceAssetId = this.reduceAsset.id;
                //  item.reduceAssetDate = moment.utc( this.reduceAsset.reduceAssetDate.toString());
                  item.creationTime = moment.utc( item.creationTime?.toString());
                  item.startDate = moment.utc( item.startDate?.toString());
                  item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                  item.reduceAssetDate = moment.utc( this.reduceAsset.reduceAssetDate?.toString());
                });
                debugger
              this.assetService.reduceAssetList(0,this.selectedAssetTable).subscribe();
              // xóa tài sản ghi tăng

              if(this.deleteAssetConfirmedList.length > 0 ){
                debugger
                this.deleteAssetConfirmedList.map((item) => { 
                    item.creationTime = moment.utc( item.creationTime?.toString());
                    item.startDate = moment.utc( item.startDate?.toString());
                    item.amortizationDate = moment.utc( item.amortizationDate?.toString());
                    item.reduceAssetDate = moment.utc( item.reduceAssetDate?.toString());
                  });

                this.assetService.reduceAssetList(1,this.deleteAssetConfirmedList).subscribe();
              }
              this.notify.info(this.l("SavedSuccessfully"));
              this.close();
              // this.modalSave.emit(null);
          });
      }
  }
  close(): void {
    
    this.active = false;
    // this.userPasswordRepeat = "";
    this.submitForm.form.reset();
    this._router.navigate(['app/contents/reduce-asset']);
  }
  // searchAsset(){
  //   var newAsset = new AssetDto;
  //   newAsset =this.asset;
  //   this.assetList = this.assetHaveNotReduceList.filter(x => !this.addAssetToReduceList.map(y => y?.assetCode).includes(x?.assetCode));
  //   newAsset = this.assetList?.find((item) => item.assetCode == newAsset?.assetCode);
  //   if(!newAsset){
  //     this.resetAsset();
  //     this.assetMessage = "Mã tài sản không tồn tại hoặc đã được ghi tăng";
  //   }
  //   else{
  //     this.asset = newAsset;
  //     this.assetMessage = "";
  //   }
  // }
  // resetAsset(){
  //   this.asset.monthlyAmortizationValue = null;
  //   this.asset.assetName = null;
  //   this.asset.orginalPrice = null;
  // }
  renderAmortizationValue(){
    this.asset.monthlyAmortizationValue = Number(((this.asset.orginalPrice)/(this.asset.numberOfDayUsedAsset*12)).toFixed(3));
  }
  // renderAmortizationValueOfAssetFromTable(asset : AssetDto){
    
  //   var index = this.addAssetToReduceList.findIndex(c => c.id == asset.id);
  //   this.addAssetToReduceList[index] = asset;
  //   var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
  //   this.addAssetToReduceList[index].amortizationValue = amortizationValue;
  // }
  // getAssets(){
  //   this.assetService.getAssets().subscribe((result)=>{
      
  //     this.assetHaveNotReduceList = result.items.filter((item)=> item.reduceAssetId == null);
  //     this.assetList = this.assetHaveNotReduceList;
  //   });
   
  // }
// getAssetReduceList(){
//   this.assetService.GetAssetReduced()
//   .subscribe((resul))
// }
  clickReduceAsset(){
    // this.searchAsset();
    if(this.assetMessage  != ""){
      this.message.warn(this.l('Không hợp lệ vui lòng kiểm tra lại'));
    }
    else{
      var newAsset = new AssetDto;
      newAsset =this.asset;
      this.addAssetToReduceList.push(newAsset);
      this.asset = new AssetDto;
      // 
      this.assetList = [];
      //  this.assetList = this.assetHaveNotReduceList.filter(x => !this.addAssetToReduceList.map(y => y?.assetCode).includes(x?.assetCode));
    }
   
  }
  setReduceAssetCode(){
    var reduceAsset = this.reduceAssetList.find(x=> x.reduceAssetCode == this.reduceAsset.reduceAssetCode);
    if(reduceAsset && reduceAsset.id != this.reduceAssetId){
      this.reduceAssetCodeMessage ="Mã này đã tồn tại. Vui lòng nhập mã khác";
    }
    else{
      this.reduceAssetCodeMessage = "";
    }
  }
  getReduceAssetForEdit(){
    this.reduceAssetService.getReduceAsset(this.reduceAssetId)
      .subscribe((result) =>{
        
        this.reduceAsset = result;
        this.reduceAsset.creationTime = result["creationTime"]? result["creationTime"].format("YYYY-MM-DD"):<any>undefined;
        this.reduceAsset.reduceAssetDate = result["reduceAssetDate"]? result["reduceAssetDate"].format("YYYY-MM-DD"):<any>undefined;
      })
  }
  onSelectedAsset(assetForEdit : AssetDto, event ){
    
    console.log(event.target.checked);
    debugger
    if(event.target.checked)
    {
      this.deleteAssetList.push(assetForEdit);
    }
    else{
      var index = this.deleteAssetList?.indexOf(assetForEdit);
      if (index !== -1) {
          this.deleteAssetList.splice(index, 1);
      }        
    }

  }
  onDeleteAssetListFromTable(){
    this.message.confirm(
      this.l('Tất cả tài sản đã chọn sẽ bị xóa khỏi bảng tài sản ghi tăng'),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
debugger
              this.selectedAssetTable = this.selectedAssetTable.filter(x => !this.deleteAssetList.map(y => y.id).includes(x?.id));
              // this.deletedAssetListFromTable = this.deleteAssetList;
             this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(item);
             });
             this.deleteAssetList.forEach((item) => {
              this.deletedAssetListFromTable.push(item);
             });
              this.deleteAssetList = []; 
          }
      }
  );
  }
  deleteAssetItemFromTable(asset : AssetDto){
    debugger
    this.message.confirm(
      this.l('Tài sản với tên ' + asset.assetName+ " sẽ bị xóa khỏi bảng"),
      this.l('Bạn chắc chắn thực hiện chức năng này?'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              //xóa ở bảng
              this.deletedAssetListFromTable.push(asset);
            //  this.deletedAssetListFromTable.push(asset);
              this.selectedAssetTable = this.selectedAssetTable.filter(x => x.id != asset.id);
              // set tổng nguyên giá
              this.selectedAssetTable.forEach((item) =>{
                // this.reduceAsset.totalAssetValue += item.orginalPrice;
              })
            //  this.deleteAssetList.forEach((item) => {
              this.deleteAssetConfirmedList.push(asset);
            //  });
              // this.deleteAssetList = []; 

          }
      }
  );
  }
  editAssetItemFromTable(asset : AssetDto){
    // this.editReduceAssetModal.show(asset);
  }
  // editReduceAsset(asset : AssetDto){
  //   console.log("event =", asset);

  // }
  onSelectedAllAsset(event){
    if(event.target.checked){
      for( let i = this.selectedAssetTable.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:not(:checked)'  ;
        $(selector).click();
    } 
  }   
    else{
      for( let i = this.selectedAssetTable.length-1; i>= 0; i-- ){
        
        var selector = 'input[name="selectedAsset"]:checked'  ;
        $(selector).click();
    }  
    }
  }
  onSelectDepartmet(){

  }
  onSelectReasonReduceFromTable(asset : AssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index] = asset;
    this.selectedAssetTable[index].reasonReduceId = asset.reasonReduceId;

    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToReduceList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  onSelectReasonReduceNoteFromTable(asset : AssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index] = asset;
    this.selectedAssetTable[index].reasonReduceNote = asset.reasonReduceNote;

    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToReduceList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  onSelectRecoverableValueFromTable(asset : AssetDto){
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    this.selectedAssetTable[index] = asset;
    this.selectedAssetTable[index].recoverableValue = asset.recoverableValue;

    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToReduceList[index].amortizationValue = amortizationValue;
    // this.selectedAssetTable[]
    // this.getEmployeeListByDepartment(asset.departmentId);
  }
  addAssetReduceToTable(assetList){
    debugger
    this.selectedAssetTable = [ ...this.selectedAssetTable, ...assetList];
    console.log("list =", this.selectedAssetTable);
  }
  getDepartmentList(){
    
    this.departmentService.getDepartments()
    .subscribe((result)=>{
      this.departmentList = result.items;
    })
  }
  // onSelectEmployeeFromTable(asset: AssetDto){
  //   
  //   console.log(  )
  //   this.getEmployeeListByDepartment(asset.departmentId);
  // }
  // getEmployeeListByDepartment(departmentId: number){
  //   this.employeeService.getEmployeeByDepartment(departmentId)
  //   .subscribe((result)=>{
  //     var employeeList = result.items;
  //   })
  // }
  getEmployeeList(){
    this.employeeService.getEmployees()
    .subscribe((result)=>{
      this.employeeList = result.items;
    })
  }
  editSelectedAsset(asset){
    console.log("asset=", asset);
    var index = this.selectedAssetTable.findIndex(c => c.id == asset.id);
    console.log("index=", index);
    this.selectedAssetTable[index] = asset;
    console.log("selected asset =",  this.selectedAssetTable[index]);
    // var amortizationValue = Number(((asset.orginalPrice)/(asset.numberOfDayUsedAsset*12)).toFixed(3));
    // this.addAssetToReduceList[index].amortizationValue = amortizationValue;
  }
}
