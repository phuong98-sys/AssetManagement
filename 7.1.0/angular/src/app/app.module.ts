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
import { EditIncreaseAssetModalComponent } from './contents/increase-asset/edit-increase-asset-modal/edit-increase-asset-modal.component';
import * as $ from "jquery";
import { CreateOrEditDepartmentComponent } from './contents/department/create-or-edit-department/create-or-edit-department.component';
import { BsDatepickerConfig, BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { SuggestionHandlingComponent } from './contents/suggestion-handling/suggestion-handling.component';
import { CreateOrEditSuggestionHandlingComponent } from './contents/suggestion-handling/create-or-edit-suggestion-handling/create-or-edit-suggestion-handling.component';
import { AddAssetSuggestionHandlingComponent } from './contents/suggestion-handling/add-asset-suggestion-handling/add-asset-suggestion-handling.component';
import { CreateOrEditAssetTypeComponent } from './contents/asset-type/create-or-edit-asset-type/create-or-edit-asset-type.component';
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
    EditIncreaseAssetModalComponent,
    CreateOrEditDepartmentComponent,
    SuggestionHandlingComponent,
    CreateOrEditSuggestionHandlingComponent,
    AddAssetSuggestionHandlingComponent,
    CreateOrEditAssetTypeComponent,
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
    PaginatorModule,
    BsDatepickerModule.forRoot() ,
  ],
  providers: [ BsDatepickerConfig],
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
