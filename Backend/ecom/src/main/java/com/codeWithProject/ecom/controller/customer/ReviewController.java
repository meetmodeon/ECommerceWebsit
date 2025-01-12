package com.codeWithProject.ecom.controller.customer;

import com.codeWithProject.ecom.dto.OrderedProductsResponseDto;
import com.codeWithProject.ecom.dto.ReviewDto;
import com.codeWithProject.ecom.services.Customer.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/ordered-products/{orderId}")
    public ResponseEntity<OrderedProductsResponseDto> getOrderedProductsDetailsByOrderId(@PathVariable Long orderId){
        return ResponseEntity.ok(reviewService.getOrderedProductsDetailsByOrderId(orderId));
    }

    @PostMapping("/reviews")
    public ResponseEntity<?> giveReview(@ModelAttribute ReviewDto reviewDto) throws IOException {
        System.out.println("this is ReviewDto from frontend +=" +reviewDto.toString());
        ReviewDto reviewDto1 = reviewService.giveReview(reviewDto);
        if(reviewDto1 == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");

        return ResponseEntity.status(HttpStatus.CREATED).body(reviewDto1);
    }
}
