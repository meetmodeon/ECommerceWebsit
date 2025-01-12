package com.codeWithProject.ecom.services.auth;

import com.codeWithProject.ecom.dto.SignupRequest;
import com.codeWithProject.ecom.dto.UserDto;
import com.codeWithProject.ecom.entity.Order;
import com.codeWithProject.ecom.entity.User;
import com.codeWithProject.ecom.enums.OrderStatus;
import com.codeWithProject.ecom.enums.UserRole;
import com.codeWithProject.ecom.repository.OrderRepository;
import com.codeWithProject.ecom.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private OrderRepository orderRepository;

    public UserDto createUser(SignupRequest signupRequest){
        User user=new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);
        User createdUser=userRepository.save(user);

        Order order=new Order();
        order.setAmount(0L);
        order.setTotalAmount(0L);
        order.setDiscount(0L);
        order.setUser(createdUser);
        order.setOrderStatus(OrderStatus.Pending);
        orderRepository.save(order);

        UserDto userDto=new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setName(createdUser.getName());
        userDto.setEmail(createdUser.getEmail());
        userDto.setUserRole(createdUser.getUserRole().name());
        return userDto;
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
    @PostConstruct
    public void createAdminAccount(){
        User adminAccount=userRepository.findByUserRole(UserRole.ADMIN);
        if(adminAccount==null){
            User user=new User();
            user.setEmail("admin@test.com");
            user.setName("admin");
            user.setUserRole(UserRole.ADMIN);
            user.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(user);
        }
    }
}
