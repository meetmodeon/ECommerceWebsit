package com.codeWithProject.ecom.controller.customer;

import com.codeWithProject.ecom.dto.WishListDto;
import com.codeWithProject.ecom.services.Customer.wishlist.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class WishlistController {
    private final WishListService wishListService;

    @PostMapping("/wishlist")
    public ResponseEntity<?> addProductToWishList(@RequestBody WishListDto wishListDto){
        WishListDto postedWishlistDto = wishListService.addProductToWishlist(wishListDto);
        if(postedWishlistDto == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(postedWishlistDto);
    }

    @GetMapping("/wishlist/{userId}")
    public ResponseEntity<List<WishListDto>> getWishlistByUserID(@PathVariable Long userId){
        return ResponseEntity.ok(wishListService.getWishlistByUserId(userId));
    }
}
