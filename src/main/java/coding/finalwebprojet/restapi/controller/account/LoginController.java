package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {
    @GetMapping("/login")
    public @ResponseBody ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        Database database = Database.getDatabase();
        String sql =  String.format("SELECT id, password FROM users WHERE email = \"%s\"", email);
        String id = null;

        try {
            ResultSet resultSet = database.executeQuery(sql);

            while (resultSet.next()) {
                if (!password.equals(resultSet.getString("password"))) break;
                id = resultSet.getString("id");
            }
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>("{\"id\": " + id + "}", HttpStatus.OK);
    }
}
