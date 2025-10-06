package com.example.apiDashboard.service;

import com.example.apiDashboard.model.CatFact;
import com.example.apiDashboard.model.Joke;
import com.example.apiDashboard.model.RandomUser;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ApiService {

    private final RestTemplate restTemplate = new RestTemplate();

    public CatFact getCatFact() {
        String url = "https://catfact.ninja/fact";
        return restTemplate.getForObject(url, CatFact.class);
    }

    public Joke getJoke() {
        String url = "https://official-joke-api.appspot.com/random_joke";
        return restTemplate.getForObject(url, Joke.class);
    }

    public RandomUser getRandomUser() {
        String url = "https://randomuser.me/api/";
        return restTemplate.getForObject(url, RandomUser.class);
    }
}
