package com.codeWithProject.ecom.services.admin.coupon;

import com.codeWithProject.ecom.entity.Coupon;

import java.util.List;

public interface AdminCouponService {
    Coupon createCoupon(Coupon coupon);
    List<Coupon> getAllCoupons();
}
