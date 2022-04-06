package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;

@RestController
public class LoginController {
    @PostMapping("/login")
    public @ResponseBody ResponseEntity<String> post(@RequestParam String email, @RequestParam String password) {
        Database database = Database.getDatabase();
        String sql =  String.format("SELECT * FROM `users` WHERE `email` = \"%s\"", email);
        boolean valid = false;

        try {
            ResultSet resultSet = database.executeQuery(sql);
            String tmpPassword = null;

            while (resultSet.next()) tmpPassword = resultSet.getString("password");
            if (password.equals(tmpPassword)) valid = true;

        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>((valid) ? HttpStatus.OK : HttpStatus.EXPECTATION_FAILED);
    }
}
