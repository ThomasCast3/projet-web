package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.model.Users;
import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UsersController {
    @GetMapping("/users")
    public @ResponseBody ResponseEntity<List<Users>> getUsers() {
        List<Users> users = new ArrayList<>();

        try {
            ResultSet resultSet = Database.getDatabase().executeQuery("SELECT id, email FROM users");

            while (resultSet.next()) users.add(new Users(Integer.parseInt(resultSet.getString("id")),
                    resultSet.getString("email")));
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
