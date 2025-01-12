package com.codeWithProject.ecom;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.Test;

import javax.crypto.SecretKey;

public class JwtSecketMaker {
    @Test
    void generateSecretKey(){
        SecretKey key=Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String encodedKey=DatatypeConverter.printHexBinary(key.getEncoded());
        System.out.println("Key : "+encodedKey);
    }
//    SecretKey key= Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//    String encodedKey= DatatypeConverter.printHexBinary(key.getEncoded());
//        System.out.println("Key : "+encodedKey);
}
