import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { AssetInputDto, AssetTypeDto, SuggestionHandlingDto, SuggestionHandlingServiceProxy } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-suggestion-handling',
  templateUrl: './suggestion-handling.component.html',
  styleUrls: ['./suggestion-handling.component.css']
})
export class SuggestionHandlingComponent extends AppComponentBase implements OnInit {

  suggestionHandlingList;
  cols: any[];
  loading =  false;
  totalRecords: number;
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
    private suggestionHandlingService: SuggestionHandlingServiceProxy,
    private _router: Router) {   
        super(injector);
  }

  ngOnInit(): void {
  this.getAll();
  }
  getAll(){
    this.loading = true;
    this.suggestionHandlingService.getSuggestionHandlings()
    .subscribe(result => {
      this.loading = false;
      
        this.suggestionHandlingList = result.items;
        this.suggestionHandlingList.map((item)=>{ 
        });
        this.totalRecords = this.suggestionHandlingList?.length;
    });
  }

  createOrEditSuggestionHandling(suggestionHandling?: SuggestionHandlingDto): void {
    
    if(!suggestionHandling)
    this._router.navigate(["/app/contents/suggestion-handling/create"]);
    else
    this._router.navigate(["/app/contents/suggestion-handling/" + suggestionHandling?.id]);
    // this.createOrEditAssetModal.show(asset);
  }
  deleteSuggestionHandling(suggestionHandling : SuggestionHandlingDto){
    this.message.confirm(
      this.l('Phiếu mã số "' + suggestionHandling.suggestionHandlingCode + '" này sẽ bị xóa'),
      this.l('Bạn chắc chắn xóa phiếu này'),
      (isConfirmed) => {
          if (isConfirmed) {
              this.loading = true;
              this.suggestionHandlingService
              .deleteSuggestionHandling(suggestionHandling.id)
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
