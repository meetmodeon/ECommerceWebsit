package com.codeWithProject.ecom.services.auth;

import com.codeWithProject.ecom.dto.SignupRequest;
import com.codeWithProject.ecom.dto.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);
    Boolean hasUserWithEmail(String email);
}
