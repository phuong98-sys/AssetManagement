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
import { ProposeAssetComponent } from './contents/propose-asset/propose-asset.component';
import { PlaneShopComponent } from './contents/plane-shop/plane-shop.component';
import { PlaneMaintainComponent } from './contents/plane-maintain/plane-maintain.component';
import { EditIncreaseAssetModalComponent } from './contents/increase-asset/edit-increase-asset-modal/edit-increase-asset-modal.component';
import { CreateOrEditReduceAssetComponent } from './contents/reduce-asset/create-or-edit-reduce-asset/create-or-edit-reduce-asset.component';
import { CreateOrEditDepartmentComponent } from './contents/department/create-or-edit-department/create-or-edit-department.component';
import { SuggestionHandlingComponent } from './contents/suggestion-handling/suggestion-handling.component';
import { CreateOrEditSuggestionHandlingComponent } from './contents/suggestion-handling/create-or-edit-suggestion-handling/create-or-edit-suggestion-handling.component';
import { AddAssetSuggestionHandlingComponent } from './contents/suggestion-handling/add-asset-suggestion-handling/add-asset-suggestion-handling.component';
import { CreateOrEditAssetTypeComponent } from './contents/asset-type/create-or-edit-asset-type/create-or-edit-asset-type.component';
import { DepreciationAssetComponent } from './aontents/depreciation-asset/depreciation-asset.component';
import { CreateOrEditDepreciationAssetComponent } from './aontents/depreciation-asset/create-or-edit-depreciation-asset/create-or-edit-depreciation-asset.component';
import { TransferComponent } from './contents/transfer/transfer.component';
import { CreateOrEditTransferComponent } from './contents/transfer/create-or-edit-transfer/create-or-edit-transfer.component';
import { AddAssetTransferComponent } from './contents/transfer/add-asset-transfer/add-asset-transfer.component';
import { CreateOrEditPlaneMaintainComponent } from './contents/plane-maintain/create-or-edit-plane-maintain/create-or-edit-plane-maintain.component';
import { CreateOrEditProposeAssetComponent } from './contents/propose-asset/create-or-edit-propose-asset/create-or-edit-propose-asset.component';
import { CreateOrEditPlaneShopComponent } from './contents/plane-shop/create-or-edit-plane-shop/create-or-edit-plane-shop.component';
import { AddAssetProposeAssetComponent } from './contents/propose-asset/add-asset-propose-asset/add-asset-propose-asset.component';

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
                        {path: 'asset-type/create', component: CreateOrEditAssetTypeComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset-type/:id', component: CreateOrEditAssetTypeComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset-statistic', component: TestComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset', component: AssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset/create', component: CreateOrEditAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'asset/:id', component: CreateOrEditAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'increase-asset', component: IncreaseAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'increase-asset/create', component: CreateOrEditIncreaseAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'increase-asset/:id', component: CreateOrEditIncreaseAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'increase-asset-detail/editAsset', component: EditIncreaseAssetModalComponent, canActivate: [AppRouteGuard] },
                        {path: 'reduce-asset', component: ReduceAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'reduce-asset/create', component: CreateOrEditReduceAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'reduce-asset/:id', component: CreateOrEditReduceAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'department', component: DepartmentComponent, canActivate: [AppRouteGuard] },
                        {path: 'department/create', component: CreateOrEditDepartmentComponent, canActivate: [AppRouteGuard] },
                        {path: 'department/:id', component: CreateOrEditDepartmentComponent, canActivate: [AppRouteGuard] },
                        {path: 'propose-asset', component: ProposeAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'propose-asset/create', component: CreateOrEditProposeAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'propose-asset/:id', component: CreateOrEditProposeAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'propose-asset/addAsset', component: AddAssetProposeAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-shop', component: PlaneShopComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-shop/create', component: CreateOrEditPlaneShopComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-shop/:id', component: CreateOrEditPlaneShopComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-maintain', component: PlaneMaintainComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-maintain/create', component: CreateOrEditPlaneMaintainComponent, canActivate: [AppRouteGuard] },
                        {path: 'plane-maintain/:id', component: CreateOrEditPlaneMaintainComponent, canActivate: [AppRouteGuard] },
                        {path: 'suggestion-handling', component: SuggestionHandlingComponent, canActivate: [AppRouteGuard] },
                        {path: 'suggestion-handling/create', component: CreateOrEditSuggestionHandlingComponent, canActivate: [AppRouteGuard] },
                        {path: 'suggestion-handling/:id', component: CreateOrEditSuggestionHandlingComponent, canActivate: [AppRouteGuard] },
                        {path: 'suggestion-handling/addAsset', component: AddAssetSuggestionHandlingComponent, canActivate: [AppRouteGuard] },
                        {path: 'depreciation-asset', component: DepreciationAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'depreciation-asset/create', component: CreateOrEditDepreciationAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'depreciation-asset/:id', component: CreateOrEditDepreciationAssetComponent, canActivate: [AppRouteGuard] },
                        {path: 'transfer', component: TransferComponent, canActivate: [AppRouteGuard] },
                        {path: 'transfer/create', component: CreateOrEditTransferComponent, canActivate: [AppRouteGuard] },
                        {path: 'transfer/:id', component: CreateOrEditTransferComponent, canActivate: [AppRouteGuard] },
                        {path: 'transfer/addAsset', component: AddAssetTransferComponent, canActivate: [AppRouteGuard] },
                    ], canActivate: [AppRouteGuard] },
                    
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
