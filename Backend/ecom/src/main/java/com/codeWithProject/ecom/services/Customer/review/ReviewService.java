package com.codeWithProject.ecom.services.Customer.review;

import com.codeWithProject.ecom.dto.OrderedProductsResponseDto;
import com.codeWithProject.ecom.dto.ReviewDto;

import java.io.IOException;

public interface ReviewService {
    OrderedProductsResponseDto getOrderedProductsDetailsByOrderId(Long orderId);
    ReviewDto giveReview(ReviewDto reviewDto) throws IOException;
}
