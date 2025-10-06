package com.example.apiDashboard.controller;

import com.example.apiDashboard.model.CatFact;
import com.example.apiDashboard.model.Joke;
import com.example.apiDashboard.model.RandomUser;
import com.example.apiDashboard.service.ApiService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class ApiController {

    private final ApiService apiService;

    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/api/catfact")
    public CatFact getCatFact() {
        return apiService.getCatFact();
    }

    @GetMapping("/api/joke")
    public Joke getJoke() {
        return apiService.getJoke();
    }

    @GetMapping("/api/randomuser")
    public RandomUser getRandomUser() {
        return apiService.getRandomUser();
    }
}
