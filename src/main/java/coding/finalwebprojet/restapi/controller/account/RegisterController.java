package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;

@RestController
@CrossOrigin(origins = "*")
public class RegisterController {
    @PostMapping("/register")
    public @ResponseBody ResponseEntity<String> register(@RequestParam String email, @RequestParam String password) {
        Database database = Database.getDatabase();
        String sql = "INSERT INTO users (email, password) VALUES (?, ?)";

        try {
            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sql);
            preparedStatement.setString(1, email);
            preparedStatement.setString (2, password);
            database.executeStatement(preparedStatement);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
