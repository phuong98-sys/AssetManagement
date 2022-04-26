import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { TestComponent } from './test/test.component';
import { AssetTypeComponent } from './contents/asset-type/asset-type.component';
import { AssetComponent } from './contents/asset/asset.component';
import { CreateOrEditAssetComponent } from './contents/asset/create-or-edit-asset/create-or-edit-asset.component';
import { IncreaseAssetComponent } from './contents/increase-asset/increase-asset.component';
import { ReduceAssetComponent } from './contents/reduce-asset/reduce-asset.component';
import { DepartmentComponent } from './contents/department/department.component';
import { CreateOrEditIncreaseAssetComponent } from './contents/increase-asset/create-or-edit-increase-asset/create-or-edit-increase-asset.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'contents', children:[
                        {path: 'asset-type', component: AssetTypeComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset-statistic', component: TestComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset', component: AssetComponent, canActivate: [AppRouteGuard], children: [
                            {path: 'create', component: CreateOrEditAssetComponent, canActivate: [AppRouteGuard]}
                        ] },
                        {path: 'increase-asset', component: IncreaseAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'increase-asset/create', component: CreateOrEditIncreaseAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'reduce-asset', component: ReduceAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'department', component: DepartmentComponent, canActivate: [AppRouteGuard] },
                    ], canActivate: [AppRouteGuard] },
                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
