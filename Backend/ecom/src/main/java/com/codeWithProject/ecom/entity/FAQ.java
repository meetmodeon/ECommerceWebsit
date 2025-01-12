package com.codeWithProject.ecom.entity;

import com.codeWithProject.ecom.dto.FAQDto;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
public class FAQ {
    @Id
    @GeneratedValue
    private Long id;
    private String question;
    private String answer;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name="product_id",nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    public FAQDto getFAQDto(){
        FAQDto faqDto = new FAQDto();
        faqDto.setId(id);
        faqDto.setAnswer(answer);
        faqDto.setQuestion(question);
        faqDto.setProductId(product.getId());

        return faqDto;
    }
}
