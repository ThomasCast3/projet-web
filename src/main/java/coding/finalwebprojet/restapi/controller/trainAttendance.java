package coding.finalwebprojet.restapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class trainAttendance {
    @GetMapping("/train_attendance")
    public String test() {
        return "Fréquentation de la gare Banane-Nord: 1919829482 usagés";
    }
}
