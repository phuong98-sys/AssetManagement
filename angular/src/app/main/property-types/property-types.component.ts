import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PropertyTypeServiceProxy } from "@shared/service-proxies/service-proxies";

@Component({
    selector: 'app-property-types',
    templateUrl: './property-types.component.html',
    styleUrls: ['./property-types.component.css']
  })
  export class PropertyTypeComponent extends AppComponentBase implements OnInit {
    propertyTypeList;
    constructor(
        injector: Injector,
        private propertyTypeService: PropertyTypeServiceProxy) {   
            super(injector);
      }
    ngOnInit() {
        this.getAll()
    }
    getAll(){
        this.propertyTypeService.getAll()
        .subscribe(result => {
            debugger
            this.propertyTypeList = result;
        });
    }
  }