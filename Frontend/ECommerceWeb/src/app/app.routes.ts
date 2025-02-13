import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { PostCategoryComponent } from './admin/components/post-category/post-category.component';
import { PostProductComponent } from './admin/components/post-product/post-product.component';
import { DashboardComponent as CustomerDashboard } from './customer/components/dashboard/dashboard.component';
import { CartComponent } from './customer/components/cart/cart.component';
import { PostCouponComponent } from './admin/components/post-coupon/post-coupon.component';
import { CouponsComponent } from './admin/components/coupons/coupons.component';
import { OrdersComponent } from './admin/components/orders/orders.component';
import { MyOrdersComponent } from './customer/components/my-orders/my-orders.component';
import { PostProductFaqComponent } from './admin/components/post-product-faq/post-product-faq.component';
import { UpdateProductComponent } from './admin/components/update-product/update-product.component';
import { ViewOrderedProductsComponent } from './customer/components/view-ordered-products/view-ordered-products.component';
import { ReviewOrderedProductComponent } from './customer/components/review-ordered-product/review-ordered-product.component';
import { ViewProductDetailComponent } from './customer/components/view-product-detail/view-product-detail.component';
import { ViewWishlistComponent } from './customer/components/view-wishlist/view-wishlist.component';
import { TrackOrderComponent } from './track-order/track-order.component';
import { AnalyticsComponent } from './admin/components/analytics/analytics.component';
export const routes: Routes = [
    
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignupComponent
    },
    {
        // path:'admin',
        // component:AdminComponent,
        // children:[
        //     {
        //         path:'dashboard',
        //         loadComponent:()=> import('./admin/components/dashboard/dashboard.component').then(m=>m.DashboardComponent)
        //     },
            // {
            //     path:'product',
            //     loadComponent:()=> import('./admin/components/post-product/post-product.component').then(m=>m.PostProductComponent)
            // }
        //]
        path:'admin/dashboard',
        component:DashboardComponent
    },
    {
        path:'admin/category',
        component:PostCategoryComponent
    },
    {
        path:'admin/product',
        component:PostProductComponent
    },
    {
        
             path: 'customer/dashboard',
            component:CustomerDashboard

    },
    {
        path: 'customer/cart',
        component:CartComponent
    },
    {
        path: 'admin/post-coupon',
        component:PostCouponComponent
    },
    {
        path:'admin/coupons',
        component:CouponsComponent
    },
    {
        path:'admin/orders',
        component:OrdersComponent
    },
    {
        path: 'customer/my_orders',
        component:MyOrdersComponent
    },
    {
        path:'admin/faq/:productId',
        component:PostProductFaqComponent
    },
    {
        path:'admin/product/:productId',
        component:UpdateProductComponent
    },
    {
        path:'customer/ordered_products/:orderId',
        component:ViewOrderedProductsComponent
    },
    {
        path: 'customer/review/:productId',
        component: ReviewOrderedProductComponent
    },
    {
        path: 'customer/product/:productId',
        component:ViewProductDetailComponent
    },
    {
        path: 'customer/wishlist',
        component:ViewWishlistComponent
    },
    {
        path:'order',
        component:TrackOrderComponent
    },
    {
        path:'admin/analytics',
        component:AnalyticsComponent
    }
    
  
];
