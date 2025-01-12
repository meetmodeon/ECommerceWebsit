package com.codeWithProject.ecom.services.jwt;

import com.codeWithProject.ecom.entity.User;
import com.codeWithProject.ecom.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser=userRepository.findFirstByEmail(username);
        if(optionalUser.isEmpty()) throw new UsernameNotFoundException("Username not found",null);
        UserDetails userDetails= org.springframework.security.core.userdetails.User.builder()
                .username(optionalUser.get().getEmail())
                .password(optionalUser.get().getPassword())
                .roles(optionalUser.get().getUserRole().toString())
                .build();
        return userDetails;
    }
}
