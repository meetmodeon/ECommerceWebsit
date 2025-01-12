package com.codeWithProject.ecom.controller;

import com.codeWithProject.ecom.dto.AuthenticationRequest;
import com.codeWithProject.ecom.dto.SignupRequest;
import com.codeWithProject.ecom.dto.UserDto;
import com.codeWithProject.ecom.entity.User;
import com.codeWithProject.ecom.images.service.FileStorageService;
import com.codeWithProject.ecom.repository.UserRepository;
import com.codeWithProject.ecom.services.auth.AuthService;
import com.codeWithProject.ecom.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
//@CrossOrigin("*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final AuthService authService;
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING= "Authorization";

    //for image upload
    private final FileStorageService fileStorageService;
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),authenticationRequest.getPassword()));

            final UserDetails userDetails=userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
            Optional<User> optionalUser=userRepository.findFirstByEmail(userDetails.getUsername());
            final String jwt=jwtUtil.generateToken(userDetails.getUsername());
            if(optionalUser.isPresent()){
                Map<String,String> response=new HashMap<>();
                response.put("token",jwt);
                response.put("userId", optionalUser.get().getId().toString());
                response.put("role",optionalUser.get().getUserRole().toString());
                return new ResponseEntity<>(response,HttpStatus.OK);
            }else {
                return new ResponseEntity<>("User Not found",HttpStatus.NOT_FOUND);
            }
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Incorrect username or password.");
        }


    }
    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest){
        if(authService.hasUserWithEmail(signupRequest.getEmail())){
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        }

        UserDto userDto=authService.createUser(signupRequest);
        return new ResponseEntity<>(userDto,HttpStatus.OK);
    }

    //File related work
//    @PostMapping("/order/images")
//    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
//        String uploadImage= fileStorageService.uploadImage(file);
//
//        return ResponseEntity.status(HttpStatus.OK).body(uploadImage);
//    }
//
//    @GetMapping("/order/{filename}")
//    public ResponseEntity<?> downloadImage(@PathVariable String  filename){
//        byte[] downloadImage=fileStorageService.downloadImage(filename);
//
//        return ResponseEntity.status(HttpStatus.OK)
//                .contentType(MediaType.valueOf("image/png")).body(downloadImage);
//    }

}
