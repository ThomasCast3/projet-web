package coding.finalwebprojet.restapi.controller;

import coding.finalwebprojet.restapi.utils.Database;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

@RestController
@CrossOrigin(origins = "*")
public class GeolocalisationController {
    @PostMapping("/geolocalisation")
    public @ResponseBody ResponseEntity<String> get(@RequestParam String id, @RequestParam String latitude, @RequestParam String longitude) {
        Database database = Database.getDatabase();
        PreparedStatement preparedStatement;
        String sql = String.format("SELECT id FROM geolocalisation WHERE id = \"%s\"", id);
        boolean found = false;

        try {
            ResultSet resultSet = database.executeQuery(sql);
            while (resultSet.next()) found = resultSet.getObject("id", Boolean.class);
            if (found) {
                sql = "UPDATE geolocalisation SET latitude = ?,longitude = ? WHERE id = ?";

                preparedStatement = database.getConnection().prepareStatement(sql);
                preparedStatement.setString(1, latitude);
                preparedStatement.setString(2, longitude);
                preparedStatement.setInt(3, Integer.parseInt(id));

                database.executeStatement(preparedStatement);
            } else {
                sql = "INSERT INTO geolocalisation (id, latitude, longitude) VALUES (?, ?, ?)";

                preparedStatement = database.getConnection().prepareStatement(sql);
                preparedStatement.setInt(1, Integer.parseInt(id));
                preparedStatement.setString(2, latitude);
                preparedStatement.setString(3, longitude);

                database.executeStatement(preparedStatement);
            }
        } catch(Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
