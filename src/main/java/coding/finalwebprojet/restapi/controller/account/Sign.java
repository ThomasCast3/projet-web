package coding.finalwebprojet.restapi.controller.account;

import coding.finalwebprojet.restapi.model.User;
import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
@CrossOrigin(origins = "*")
public class Sign {
    @PostMapping("/register") public @ResponseBody ResponseEntity<String> register(@RequestParam String email,
                                                                                   @RequestParam String password,
                                                                                   @RequestParam String firstName,
                                                                                   @RequestParam String lastName) {
        Database database = Database.getDatabase();
        String sqlCheckUser = String.format("SELECT * FROM users WHERE email = \"%s\"", email);
        String sqlInsertUsers = "INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)";
        String sqlGetId = String.format("SELECT id FROM users WHERE email = \"%s\"", email);
        String sqlInsertGeolocalisation = "INSERT INTO geolocalisation (id, latitude, longitude) VALUES (?, ?, ?)";

        try {
            boolean found = false;
            ResultSet resultSet = database.executeQuery(sqlCheckUser);

            while (resultSet.next()) found = resultSet.getObject("id", Boolean.class);
            if (found) return new ResponseEntity<>(null, HttpStatus.IM_USED);

            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sqlInsertUsers);
            preparedStatement.setString(1, email);
            preparedStatement.setString (2, password);
            preparedStatement.setString (3, firstName);
            preparedStatement.setString (4, lastName);
            database.executeStatement(preparedStatement);

            int id = 0;
            resultSet = database.executeQuery(sqlGetId);

            while (resultSet.next()) id = resultSet.getInt("id");

            preparedStatement = database.getConnection().prepareStatement(sqlInsertGeolocalisation);
            preparedStatement.setInt(1, id);
            preparedStatement.setString (2, "0");
            preparedStatement.setString (3, "0");

            database.executeStatement(preparedStatement);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
        String sql = String.format("SELECT id, email, role, firstName, lastName FROM users WHERE email = \"%s\" AND password =\"%s\"", email, password);
        int id = -1;
        String role = null, firstName = null, lastName = null;
        email = null;

        try {
            ResultSet resultSet = Database.getDatabase().executeQuery(sql);

            if (!resultSet.next()) return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            id = resultSet.getInt("id");
            email = resultSet.getString("email");
            role = resultSet.getString("role");
            firstName = resultSet.getString("firstName");
            lastName = resultSet.getString("lastName");
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new User(id, email, role, firstName, lastName), HttpStatus.OK);
    }

    @PutMapping("/update-account")
    public @ResponseBody ResponseEntity<User> update(@RequestParam String id,
                                                     @RequestParam String email,
                                                     @RequestParam String firstName,
                                                     @RequestParam String lastName) {
        Database database = Database.getDatabase();
        String sql = "UPDATE users SET email=?,`firstName`=?,`lastName`=? WHERE id = ?";
        try {
            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sql);
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, firstName);
            preparedStatement.setString(3, lastName);
            preparedStatement.setInt(4, Integer.parseInt(id));
            Database.getDatabase().executeStatement(preparedStatement);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/delete-account")
    public @ResponseBody ResponseEntity<User> delete(@RequestParam String id) {
        Database database = Database.getDatabase();
        String sqlDelete1 = "DELETE FROM geolocalisation WHERE id = ?;";
        String sqlDelete2 = "DELETE FROM users WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = database.getConnection().prepareStatement(sqlDelete1);
            preparedStatement.setInt(1, Integer.parseInt(id));
            Database.getDatabase().executeStatement(preparedStatement);

            preparedStatement = database.getConnection().prepareStatement(sqlDelete2);
            preparedStatement.setInt(1, Integer.parseInt(id));
            Database.getDatabase().executeStatement(preparedStatement);
        } catch (Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
