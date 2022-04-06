package coding.finalwebprojet.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalController {
    @GetMapping(value = "/")
    public String index() {
        return "<h1>Page d'accueil de l'api</h1>";
    }

    @GetMapping(value = "*")
    public String error() {
        return "<h1>ERROR 404 NOT FOUND</h1>";
    }
}
