import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { HomeComponent } from "./Components/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FooterComponent } from "./Components/footer/footer.component";
import { NavComponent } from "./Components/nav/nav.component";
import { RateComponent } from "./Components/rate/rate.component";
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

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        NavComponent,
        RateComponent,
        ProductListComponent,
        WishlistComponent,
        LoaderComponent,
        UserLayoutComponent,
        CheckoutComponent,
        CartlistComponent,
        ProductDetailsComponent,
        InternalServerErrorComponent,
        LandingComponent
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