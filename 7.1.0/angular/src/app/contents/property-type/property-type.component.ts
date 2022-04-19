import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PropertyTypeServiceProxy } from '@shared/service-proxies/service-proxies';
@Component({
  templateUrl: './property-type.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyTypeComponent extends AppComponentBase implements OnInit{
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
            this.propertyTypeList = result.items;
        });
    }
}
