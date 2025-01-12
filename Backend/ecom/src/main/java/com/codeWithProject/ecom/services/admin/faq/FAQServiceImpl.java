package com.codeWithProject.ecom.services.admin.faq;

import com.codeWithProject.ecom.dto.FAQDto;
import com.codeWithProject.ecom.entity.FAQ;
import com.codeWithProject.ecom.entity.Product;
import com.codeWithProject.ecom.repository.FAQRepository;
import com.codeWithProject.ecom.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FAQServiceImpl implements FAQService{

    private final FAQRepository faqRepository;
    private final ProductRepository productRepository;

    public FAQDto postFAQ(Long productId,FAQDto faqDto){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if(optionalProduct.isPresent()){
            FAQ faq =new FAQ();

            faq.setQuestion(faqDto.getQuestion());
            faq.setAnswer(faq.getAnswer());
            faq.setProduct(optionalProduct.get());

            return faqRepository.save(faq).getFAQDto();
        }
        return null;
    }
}
