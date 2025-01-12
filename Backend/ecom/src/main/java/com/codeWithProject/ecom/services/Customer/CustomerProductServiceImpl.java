package com.codeWithProject.ecom.services.Customer;

import com.codeWithProject.ecom.dto.ProductDetailDto;
import com.codeWithProject.ecom.dto.ProductDto;
import com.codeWithProject.ecom.entity.FAQ;
import com.codeWithProject.ecom.entity.Product;
import com.codeWithProject.ecom.entity.Review;
import com.codeWithProject.ecom.repository.FAQRepository;
import com.codeWithProject.ecom.repository.ProductRepository;
import com.codeWithProject.ecom.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerProductServiceImpl implements CustomerProductService{
    private final ProductRepository productRepository;
    private final FAQRepository faqRepository;
    private final ReviewRepository reviewRepository;

    public List<ProductDto> getAllProducts(){
        List<Product> products= productRepository.findAll();
        return products.stream().map(Product::getDto).collect(Collectors.toList());
    }

    public List<ProductDto> searchProductByTitle(String name){
        List<Product> products = productRepository.findAllByNameContaining(name);
        return products.stream().map(Product::getDto).collect(Collectors.toList());
    }

    public ProductDetailDto getProductDetailsById(Long productId){
        Optional<Product> optionalProduct= productRepository.findById(productId);
        if (optionalProduct.isPresent()){
            List<FAQ> faqList=faqRepository.findAllByProductId(productId);
            List<Review> reviewList = reviewRepository.findAllByProductId(productId);

            ProductDetailDto productDetailDto= new ProductDetailDto();
            productDetailDto.setProductDto(optionalProduct.get().getDto());
            productDetailDto.setFaqDtoList(faqList.stream().map(FAQ::getFAQDto).collect(Collectors.toList()));
            productDetailDto.setReviewDtoList(reviewList.stream().map(Review::getDto).collect(Collectors.toList()));

            return productDetailDto;
        }
        return null;
    }

}
