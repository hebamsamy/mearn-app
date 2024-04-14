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
import { FQAComponent } from './Components/FQA/FQA.component';
import { OurTeamComponent } from './Components/our-team/our-team.component';
import { PricingComponent } from './Components/pricing/pricing.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { MyOrdersComponent } from './Components/my-orders/my-orders.component';
import { OrderCompletedComponent } from './Components/my-orders/components/order-completed/order-completed.component';
import { OrderCanceledComponent } from './Components/my-orders/components/order-canceled/order-canceled.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UserAccountLayoutComponent } from './Components/user-account-layout/user-account-layout.component';
import { PendingComponent } from './Components/my-orders/components/pending/pending.component';
import { OnthewayComponent } from './Components/my-orders/components/ontheway/ontheway.component';
import { CanceledComponent } from './Components/my-orders/components/canceled/canceled.component';
import { CompletedComponent } from './Components/my-orders/components/completed/completed.component';
import { TrackOrderComponent } from './Components/my-orders/components/track-order/track-order.component';
import { MyAddressesComponent } from './Components/my-addresses/my-addresses.component';

export const routes: Routes = [
    {
        path: "", component: UserLayoutComponent, children: [
            { path: "", redirectTo: "/home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "fqa", component: FQAComponent },
            { path: "our-team", component: OurTeamComponent },
            { path: "contact-us", component: ContactUsComponent },
            { path: "about-us", component: AboutUsComponent },
            { path: "pricing", component: PricingComponent },

            { path: "products", component: ProductListComponent },
            { path: "details/:id", component: ProductDetailsComponent },
            { path: "wishlist", component: WishlistComponent, canActivate: [authGuard] },
            { path: "cartlist", component: CartlistComponent, canActivate: [authGuard] },
            { path: "checkout", component: CheckoutComponent, canActivate: [authGuard] },
            {
                path: "account", component: UserAccountLayoutComponent,
                children: [
                    { path: "", redirectTo: "/account/profile", pathMatch: "full" },
                    { path: "profile", component: ProfileComponent },
                    { path: "my-addresses", component: MyAddressesComponent },
                    { path: "track-order/:id", component: TrackOrderComponent },
                    {
                        path: "my-order", component: MyOrdersComponent,
                        children: [
                            { path: "", redirectTo: "/account/my-order/pending", pathMatch: "full" },
                            { path: "pending", component: PendingComponent },
                            { path: "no-the-way", component: OnthewayComponent, },
                            { path: "cancelled", component: CanceledComponent },
                            { path: "completed", component: CompletedComponent },
                        ],
                    },

                ],
                canActivate: [authGuard]
            },
            { path: "blogs", component: BlogsComponent },
            { path: "blog-details/:id", component: BlogDetailsComponent },
        ]
    },
    { path: "order-completed", component: OrderCompletedComponent },
    { path: "order-canceled", component: OrderCanceledComponent },
    {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'admin', component: LayoutComponent,
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [authGuard]
    },
    {
        path: 'vendor', component: VendorLayoutComponent,
        loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule),
        canActivate: [VendorGuard]
    },
    { path: "landing", component: LandingComponent },
    { path: "server-error", component: InternalServerErrorComponent },
    { path: "**", component: NotFoundComponent }
];
