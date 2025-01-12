package com.codeWithProject.ecom.dto;

import lombok.Data;

@Data
public class AddProductCartDto {

    private Long UserId;
    private Long productId;
}
