package com.codeWithProject.ecom.services.Customer;

import com.codeWithProject.ecom.dto.ProductDetailDto;
import com.codeWithProject.ecom.dto.ProductDto;

import java.util.List;

public interface CustomerProductService {
    List<ProductDto> searchProductByTitle(String title);
    List<ProductDto> getAllProducts();
    ProductDetailDto getProductDetailsById(Long productId);
}
