package com.codeWithProject.ecom.services.Customer.cart;

import com.codeWithProject.ecom.dto.AddProductCartDto;
import com.codeWithProject.ecom.dto.OrderDto;
import com.codeWithProject.ecom.dto.PlaceOrderDto;
import com.codeWithProject.ecom.entity.Order;
import com.codeWithProject.ecom.enums.OrderStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface CartService {

    public ResponseEntity<?> addProductToCart(AddProductCartDto addProductCartDto);
    OrderDto getCartByUserId(Long userId);

    OrderDto applyCoupon(Long id,String code);
    OrderDto increaseProductQuantity(AddProductCartDto addProductCartDto);

    OrderDto decreaseProductQuantity(AddProductCartDto addProductCartDto);
    OrderDto placeOrder(PlaceOrderDto placeOrderDto);
    List<OrderDto> getMyPlacedOrders(Long userId);
    OrderDto searchOrderByTrackingId(UUID trackingId);
}
