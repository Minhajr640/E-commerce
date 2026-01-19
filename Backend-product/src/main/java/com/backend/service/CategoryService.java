package com.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.backend.model.Category;
import com.backend.repository.CategoryRepository;

@Service
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    
    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    // Get category by ID
    public Category getCategoryById(int id) throws Exception {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new Exception("Category not found with id: " + id));
    }
    
    // Get category by name
    public Category getCategoryByName(String name) throws Exception {
        return categoryRepository.findByName(name)
            .orElseThrow(() -> new Exception("Category not found with name: " + name));
    }
    
    // Create new category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    // Delete category
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    
}
