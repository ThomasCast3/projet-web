package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.model.User;
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
    public @ResponseBody ResponseEntity<List<User>> getUsers() {
        List<User> users = new ArrayList<>();

        try {
            ResultSet resultSet = Database.getDatabase().executeQuery(
                    "SELECT id, email, role, firstName, lastName FROM users");

            while (resultSet.next()) users.add(new User(
                    Integer.parseInt(resultSet.getString("id")),
                    resultSet.getString("email"),
                    resultSet.getString("role"),
                    resultSet.getString("firstName"),
                    resultSet.getString("lastName")));
        } catch(Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
