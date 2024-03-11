import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { LayoutComponent } from './admin/components/layout/layout.component';
import { UserLayoutComponent } from './Components/user-layout/user-layout.component';
import { VendorLayoutComponent } from './vendor/Compoments/vendor-layout/vendor-layout.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartlistComponent } from './Components/cartlist/cartlist.component';
import { authGuard } from './Services/Guards/auth.guard';
import { VendorGuard } from './Services/Guards/vendor.guard';
import { LandingComponent } from './Components/landing/landing.component';
import { InternalServerErrorComponent } from './Components/InternalServerError/InternalServerError.component';

export const routes: Routes = [
    {
        path: "", component: UserLayoutComponent, children: [
            { path: "", redirectTo: "/home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "products", component: ProductListComponent },
            { path: "details/:id", component: ProductDetailsComponent },
            { path: "wishlist", component: WishlistComponent, canActivate: [authGuard] },
            { path: "cartlist", component: CartlistComponent, canActivate: [authGuard] },
            { path: "checkout", component: CheckoutComponent, canActivate: [authGuard] },
        ]
    },
    { path: "landing", component: LandingComponent },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'admin', component: LayoutComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        , canActivate: [authGuard]
    },
    {
        path: 'vendor', component: VendorLayoutComponent,
        loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule)
        , canActivate: [VendorGuard]
    },
    { path: "server-error", component: InternalServerErrorComponent },
    { path: "**", component: NotFoundComponent }
];
