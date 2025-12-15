package ma.jaouad.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/me")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal Jwt jwt) {
        // Retourne les claims (données) du token JWT
        return jwt.getClaims();
    }
}