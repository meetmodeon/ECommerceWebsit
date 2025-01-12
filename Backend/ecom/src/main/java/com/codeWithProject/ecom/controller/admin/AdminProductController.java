package com.codeWithProject.ecom.controller.admin;

import com.codeWithProject.ecom.dto.FAQDto;
import com.codeWithProject.ecom.dto.ProductDto;
import com.codeWithProject.ecom.services.admin.adminproduct.AdminProductService;
import com.codeWithProject.ecom.services.admin.faq.FAQService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminProductController {

    private final AdminProductService adminProductService;
    private final FAQService faqService;

    @PostMapping("/product")
    public ResponseEntity<ProductDto> addProduct(
            @RequestParam("img") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("description") String description,
            @RequestParam("price") Long price
    ) throws IOException {
        ProductDto productDto1=new ProductDto();
        productDto1.setCategoryId(categoryId);
        productDto1.setName(name);
        productDto1.setImg(file);
        productDto1.setDescription(description);
        productDto1.setPrice(price);
        ProductDto productDto=adminProductService.addProduct(productDto1);
        return ResponseEntity.status(HttpStatus.CREATED).body(productDto);
    }
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProducts(){
        List<ProductDto> productDtos=adminProductService.getAllProducts();
        return ResponseEntity.ok(productDtos);
    }
    @GetMapping("/search/{name}")
    public ResponseEntity<List<ProductDto>> getAllProductByName(@PathVariable String name){
        List<ProductDto> productDtos=adminProductService.getAllProductByName(name);
        return ResponseEntity.ok(productDtos);
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long productId){
        boolean deleted=adminProductService.deleteProduct(productId);
        if(deleted){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/faq/{productId}")
    public ResponseEntity<FAQDto> postFAQ(@PathVariable Long productId,@RequestBody FAQDto faqDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(faqService.postFAQ(productId,faqDto));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long productId){
        ProductDto productDto= adminProductService.getProductById(productId);
        if(productDto!= null){
            return ResponseEntity.ok(productDto);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/product/{productId}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId,@ModelAttribute ProductDto productDto) throws IOException {
        ProductDto updateProduct = adminProductService.updateProduct(productId,productDto);
        if(updateProduct != null){
            return ResponseEntity.ok(updateProduct);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

}
