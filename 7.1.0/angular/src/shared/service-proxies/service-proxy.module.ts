import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.AssetTypeServiceProxy,
        ApiServiceProxies.AssetServiceProxy,
        ApiServiceProxies.IncreaseAssetServiceProxy,
        ApiServiceProxies.ReduceAssetServiceProxy,
        ApiServiceProxies.ReasonReduceServiceProxy,
        ApiServiceProxies.PlaneMaintainServiceProxy,
        ApiServiceProxies.ProposeAssetServiceProxy,
        ApiServiceProxies.PlaneShopServiceProxy,
        ApiServiceProxies.TransferServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
