package com.codeWithProject.ecom.dto;

import com.codeWithProject.ecom.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String userRole;

}
