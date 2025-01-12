package com.codeWithProject.ecom.services.admin.faq;

import com.codeWithProject.ecom.dto.FAQDto;

public interface FAQService {
    FAQDto postFAQ(Long productId, FAQDto faqDto);
}
