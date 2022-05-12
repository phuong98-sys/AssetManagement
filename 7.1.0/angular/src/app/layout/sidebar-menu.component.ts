import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '@shared/app-component-base';
import {
    Router,
    RouterEvent,
    NavigationEnd,
    PRIMARY_OUTLET
} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {MenuItem} from '@shared/layout/menu-item';

@Component({
    selector: 'sidebar-menu',
    templateUrl: './sidebar-menu.component.html'
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
    menuItems: MenuItem[];
    menuItemsMap: { [key: number]: MenuItem } = {};
    activatedMenuItems: MenuItem[] = [];
    routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
    homeRoute = '/app/contents/asset';

    constructor(injector: Injector, private router: Router) {
        super(injector);
        this.router.events.subscribe(this.routerEvents);
    }

    ngOnInit(): void {
        this.menuItems = this.getMenuItems();
        this.patchMenuItems(this.menuItems);
        this.routerEvents
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                const currentUrl = event.url !== '/' ? event.url : this.homeRoute;
                const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
                    .children[PRIMARY_OUTLET];
                if (primaryUrlSegmentGroup) {
                    this.activateMenuItems('/' + primaryUrlSegmentGroup.toString());
                }
            });
    }

    getMenuItems(): MenuItem[] {
        return [
            // new MenuItem(this.l('About'), '/app/about', 'fas fa-info-circle'),
            new MenuItem(this.l('Trang chủ'), '/app/home', 'fas fa-home'),
            new MenuItem(
                this.l('Quản lí vai trò người dùng'),
                '/app/roles',
                'fas fa-theater-masks',
                'Pages.Roles'
            ),
            // new MenuItem(
            //     this.l('Tenants'),
            //     '/app/tenants',
            //     'fas fa-building',
            //     'Pages.Tenants'
            // ),
            new MenuItem(
                this.l('Người dùng'),
                '/app/users',
                'fas fa-users',
                'Pages.Users'
            ),
            // new MenuItem(this.l('MultiLevelMenu'), '', 'fas fa-circle', '', [
            //     new MenuItem('ASP.NET Boilerplate', '', 'fas fa-dot-circle', '', [
            //         new MenuItem(
            //             'Home',
            //             'https://aspnetboilerplate.com?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Templates',
            //             'https://aspnetboilerplate.com/Templates?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Samples',
            //             'https://aspnetboilerplate.com/Samples?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Documents',
            //             'https://aspnetboilerplate.com/Pages/Documents?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //     ]),
            //     new MenuItem('ASP.NET Zero', '', 'fas fa-dot-circle', '', [
            //         new MenuItem(
            //             'Home',
            //             'https://aspnetzero.com?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Features',
            //             'https://aspnetzero.com/Features?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Pricing',
            //             'https://aspnetzero.com/Pricing?ref=abptmpl#pricing',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Faq',
            //             'https://aspnetzero.com/Faq?ref=abptmpl',
            //             'far fa-circle'
            //         ),
            //         new MenuItem(
            //             'Documents',
            //             'https://aspnetzero.com/Documents?ref=abptmpl',
            //             'far fa-circle'
            //         )
            //     ])
            // ]),
            new MenuItem(this.l('Quản lí tài sản'),'','fas fa-th-list','',[
                new MenuItem('Tài sản','/app/contents/asset',''),
                new MenuItem('Ghi tăng','/app/contents/increase-asset',''),
                new MenuItem('Khấu hao tài sản','/app/contents/depreciation-asset',''),
                new MenuItem('Thay đổi thông tin','/app/contents/change-information','s'),
                new MenuItem('Chuyển đổi','/app/contents/transfer',''),
                new MenuItem('Ghi giảm tài sản','/app/contents/reduce-asset',''),
                new MenuItem('Kiểm kê tài sản','/app/contents/inventory-asset','')
            ]),
            new MenuItem(this.l('Danh mục'),'','fas fa-list-alt','',[
                new MenuItem('Loại tài sản','/app/contents/asset-type','',''),
                new MenuItem('Thống kê','/app/contents/asset-statistic',''),
                new MenuItem('Bộ phận','/app/contents/department','')
            ]),
            new MenuItem(this.l('Báo cáo'),'','fas fa-file','',[
                new MenuItem('Tạo báo cáo','/app/contents/create-report',''),
            ]),
            new MenuItem(this.l('Khác'),'','fas fa-tasks','',[
                new MenuItem('Lập phiếu đề nghị trang cấp','/app/contents/propose-asset',''),
                new MenuItem('Lập kế hoạch mua sắm','/app/contents/plane-shop',''),
                new MenuItem('Lập kế hoạch bảo dưỡng','/app/contents/plane-maintain',''),
                new MenuItem('Lập phiếu yêu cầu xử lí','/app/contents/suggestion-handling','')
            ]),
        ];
    }

    patchMenuItems(items: MenuItem[], parentId?: number): void {
        items.forEach((item: MenuItem, index: number) => {
            item.id = parentId ? Number(parentId + '' + (index + 1)) : index + 1;
            if (parentId) {
                item.parentId = parentId;
            }
            if (parentId || item.children) {
                this.menuItemsMap[item.id] = item;
            }
            if (item.children) {
                this.patchMenuItems(item.children, item.id);
            }
        });
    }

    activateMenuItems(url: string): void {
        this.deactivateMenuItems(this.menuItems);
        this.activatedMenuItems = [];
        const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
        foundedItems.forEach((item) => {
            this.activateMenuItem(item);
        });
    }

    deactivateMenuItems(items: MenuItem[]): void {
        items.forEach((item: MenuItem) => {
            item.isActive = false;
            item.isCollapsed = true;
            if (item.children) {
                this.deactivateMenuItems(item.children);
            }
        });
    }

    findMenuItemsByUrl(
        url: string,
        items: MenuItem[],
        foundedItems: MenuItem[] = []
    ): MenuItem[] {
        items.forEach((item: MenuItem) => {
            if (item.route === url) {
                foundedItems.push(item);
            } else if (item.children) {
                this.findMenuItemsByUrl(url, item.children, foundedItems);
            }
        });
        return foundedItems;
    }

    activateMenuItem(item: MenuItem): void {
        item.isActive = true;
        if (item.children) {
            item.isCollapsed = false;
        }
        this.activatedMenuItems.push(item);
        if (item.parentId) {
            this.activateMenuItem(this.menuItemsMap[item.parentId]);
        }
    }

    isMenuItemVisible(item: MenuItem): boolean {
        if (!item.permissionName) {
            return true;
        }
        return this.permission.isGranted(item.permissionName);
    }
}
