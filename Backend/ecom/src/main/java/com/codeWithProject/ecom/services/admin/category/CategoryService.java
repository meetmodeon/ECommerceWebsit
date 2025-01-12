package com.codeWithProject.ecom.services.admin.category;

import com.codeWithProject.ecom.dto.CategoryDto;
import com.codeWithProject.ecom.entity.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(CategoryDto categoryDto);
    List<Category> getAllCategories();
}
