package coding.finalwebprojet.restapi.controller;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

@RestController
public class trainController {
    @GetMapping("/train")
    public @ResponseBody ResponseEntity<String> get() {
        Database database = Database.getDatabase();
        ResultSet resultSet = database.executeQuery("SELECT * FROM users");
        System.out.println(resultSet);

        return new ResponseEntity<>("<h1>TRAINS XDDDD</h1>", HttpStatus.OK);
    }
}
