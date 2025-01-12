package com.codeWithProject.ecom.config;

import com.codeWithProject.ecom.filter.JwtRequestFilter;
import com.codeWithProject.ecom.services.jwt.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {
    private final JwtRequestFilter authFilter;
//    private final SimpleCorsFilter filter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/sign-up", "/order/**").permitAll()
                        .requestMatchers("/authenticate").permitAll()
                        .requestMatchers("/api/**").authenticated())
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    public UserDetailsService userDetailsService(){
        return userDetailsService;
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public AuthenticationManager authenticationManager(){
        return new ProviderManager(authenticationProvider());
    }

//    @Bean
//    public WebMvcConfigurer corsConfig(){
//        return  new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:4200") // Allow the frontend domain
//                        .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name(), HttpMethod.PUT.name(), HttpMethod.DELETE.name()) // Allow specific methods
//                        .allowCredentials(true) // Allow credentials such as cookies or authorization headers
//                        .allowedHeaders("*"); // Allow all headers
//                        //.allowedHeaders(HttpHeaders.CONTENT_TYPE,
//                        //        HttpHeaders.AUTHORIZATION);
//            }
//        };
 //   }


//    @Bean
//    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//        corsConfiguration.addAllowedOrigin(String.valueOf(Arrays.asList("http://localhost:4200"))); // Allow frontend origin
//        corsConfiguration.addAllowedHeader(String.valueOf(List.of("Authorization"))); // Allow all headers
//        corsConfiguration.addAllowedMethod(Arrays.asList("GET","POST","DELETE","PUT").toString()); // Allow all methods (GET, POST, PUT, DELETE, etc.)
//        corsConfiguration.setAllowCredentials(true); // Allow credentials (cookies, authorization headers)
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/api/**", corsConfiguration); // Apply CORS to all /api/** endpoints
//        return source;
//    }
//@Bean
//public CorsFilter corsFilter() {
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    CorsConfiguration config = new CorsConfiguration();
//    config.addAllowedOrigin("http://localhost:4200"); // Allow frontend domain
//    config.addAllowedMethod(HttpMethod.GET.name()); // Allow GET method
//    config.addAllowedMethod(HttpMethod.POST.name()); // Allow POST method
//    config.addAllowedMethod(HttpMethod.PUT.name()); // Allow PUT method
//    config.addAllowedMethod(HttpMethod.DELETE.name()); // Allow DELETE method
//    config.addAllowedHeader("*"); // Allow all headers
//    config.setAllowCredentials(true); // Allow credentials such as cookies or authorization headers
//    source.registerCorsConfiguration("/api/**", config); // Apply CORS to all /api/** endpoints
//    return new CorsFilter(source);
//}


}
