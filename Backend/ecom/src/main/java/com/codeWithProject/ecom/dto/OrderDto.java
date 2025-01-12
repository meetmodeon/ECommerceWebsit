package com.codeWithProject.ecom.dto;

import com.codeWithProject.ecom.entity.CartItems;
import com.codeWithProject.ecom.entity.User;
import com.codeWithProject.ecom.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class OrderDto {


    private Long id;

    private String orderDescription;
    private Date date;

    private Long amount;
    private String address;
    private String payment;
    private OrderStatus orderStatus;
    private Long totalAmount;

    private Long discount;
    private UUID trackingId;

    private String userName;


    private List<CartItemsDto> cartItems;
    private String couponName;
}
