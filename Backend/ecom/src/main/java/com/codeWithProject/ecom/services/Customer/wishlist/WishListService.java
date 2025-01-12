package com.codeWithProject.ecom.services.Customer.wishlist;

import com.codeWithProject.ecom.dto.WishListDto;

import java.util.List;

public interface WishListService {

    WishListDto addProductToWishlist(WishListDto wishListDto);
    List<WishListDto> getWishlistByUserId(Long userId);
}
