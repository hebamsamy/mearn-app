import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HomeComponent } from "./Components/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./Components/footer/footer.component";
import { NavComponent } from "./Components/nav/nav.component";
import { RateComponent } from "./shared/rate/rate.component";
import { CartListService } from "./Services/cart-list.service";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { ProductListComponent } from "./Components/product-list/product-list.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./Services/Interceptors/auth.interceptor";
import { WishlistComponent } from "./Components/wishlist/wishlist.component";
import { LoaderComponent } from "./Components/loader/loader.component";
import { LoaderInterceptor } from "./Services/Interceptors/loader.Interceptor";
import { UserLayoutComponent } from "./Components/user-layout/user-layout.component";
import { CheckoutComponent } from "./Components/checkout/checkout.component";
import { CartlistComponent } from "./Components/cartlist/cartlist.component";
import { ProductDetailsComponent } from "./Components/product-details/product-details.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InternalServerErrorComponent } from "./Components/InternalServerError/InternalServerError.component";
import { LandingComponent } from "./Components/landing/landing.component";
import { FQAComponent } from "./Components/FQA/FQA.component";
import { OurTeamComponent } from "./Components/our-team/our-team.component";
import { PricingComponent } from "./Components/pricing/pricing.component";
import { ContactUsComponent } from "./Components/contact-us/contact-us.component";
import { AboutUsComponent } from "./Components/about-us/about-us.component";
import { BlogDetailsComponent } from "./Components/blog-details/blog-details.component";
import { BlogsComponent } from "./Components/blogs/blogs.component";
import { MyOrdersComponent } from "./Components/my-orders/my-orders.component";
import { OrderCanceledComponent } from "./Components/my-orders/components/order-canceled/order-canceled.component";
import { OrderCompletedComponent } from "./Components/my-orders/components/order-completed/order-completed.component";
import { NotFoundComponent } from "./Components/not-found/not-found.component";
import { SharedModule } from "./shared/shared.module";
import { UserAccountLayoutComponent } from "./Components/user-account-layout/user-account-layout.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { PendingComponent } from "./Components/my-orders/components/pending/pending.component";
import { OnthewayComponent } from "./Components/my-orders/components/ontheway/ontheway.component";
import { CanceledComponent } from "./Components/my-orders/components/canceled/canceled.component";
import { CompletedComponent } from "./Components/my-orders/components/completed/completed.component";
import { TrackOrderComponent } from "./Components/my-orders/components/track-order/track-order.component";
import { MyAddressesComponent } from "./Components/my-addresses/my-addresses.component";

@NgModule({
    declarations: [
        AppComponent,
        UserLayoutComponent,
        FooterComponent,
        NavComponent,

        HomeComponent,
        AboutUsComponent,
        ContactUsComponent,
        OurTeamComponent,
        FQAComponent,
        PricingComponent,

        ProductListComponent,
        ProductDetailsComponent,

        UserAccountLayoutComponent,
        ProfileComponent,
        WishlistComponent,
        CartlistComponent,
        CheckoutComponent,
        MyAddressesComponent,
        MyOrdersComponent,
        PendingComponent,
        OnthewayComponent,
        CanceledComponent,
        CompletedComponent,
        TrackOrderComponent,
        OrderCanceledComponent,
        OrderCompletedComponent,


        BlogDetailsComponent,
        BlogsComponent,

        LoaderComponent,

        LandingComponent,
        InternalServerErrorComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            // preventDuplicates: true,
          }),
          SharedModule
    ],
    bootstrap: [AppComponent],
    providers: [
        CartListService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ]
})



export class AppModule {

}