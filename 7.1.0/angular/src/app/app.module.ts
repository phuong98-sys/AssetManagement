import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import {TableModule} from 'primeng/table';
import { TestComponent } from './test/test.component';
import { AssetComponent } from './contents/asset/asset.component';
import { CreateOrEditAssetComponent } from './contents/asset/create-or-edit-asset/create-or-edit-asset.component';
import { DropdownModule } from 'primeng/dropdown';
import { IncreaseAssetComponent } from './contents/increase-asset/increase-asset.component';
import { CreateOrEditIncreaseAssetComponent } from './contents/increase-asset/create-or-edit-increase-asset/create-or-edit-increase-asset.component';
import { ReduceAssetComponent } from './contents/reduce-asset/reduce-asset.component';
import { CreateOrEditReduceAssetComponent } from './contents/reduce-asset/create-or-edit-reduce-asset/create-or-edit-reduce-asset.component';
import { DepartmentComponent } from './contents/department/department.component';
import { PaginatorModule } from 'primeng/paginator';
import { AssetTypeComponent } from './contents/asset-type/asset-type.component';
import { ProposeAssetComponent } from './contents/propose-asset/propose-asset.component';
import { PlaneShopComponent } from './contents/plane-shop/plane-shop.component';
import { PlaneMaintainComponent } from './contents/plane-maintain/plane-maintain.component';
import { CreateOrEditPlaneMaintainComponent } from './contents/plane-maintain/create-or-edit-plane-maintain/create-or-edit-plane-maintain.component';
import { CreateOrEditProposeAssetComponent } from './contents/propose-asset/create-or-edit-propose-asset/create-or-edit-propose-asset.component';
import { CreateOrEditPlaneShopComponent } from './contents/plane-shop/create-or-edit-plane-shop/create-or-edit-plane-shop.component';
import { TransferComponent } from './contents/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    TestComponent,
    AssetComponent,
    CreateOrEditAssetComponent,
    IncreaseAssetComponent,
    CreateOrEditIncreaseAssetComponent,
    ReduceAssetComponent,
    CreateOrEditReduceAssetComponent,
    DepartmentComponent,
    AssetTypeComponent,
    ProposeAssetComponent,
    PlaneShopComponent,
    PlaneMaintainComponent,
    CreateOrEditPlaneMaintainComponent,
    CreateOrEditProposeAssetComponent,
    CreateOrEditPlaneShopComponent,
    TransferComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    TableModule,
    DropdownModule,
    PaginatorModule
  ],
  providers: [],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
  ],
})
export class AppModule {}
