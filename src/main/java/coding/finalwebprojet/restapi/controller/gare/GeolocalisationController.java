package coding.finalwebprojet.restapi.controller.gare;

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

        try {
            String sql = "UPDATE geolocalisation SET latitude = ?,longitude = ? WHERE id = ?";

            preparedStatement = database.getConnection().prepareStatement(sql);
            preparedStatement.setString(1, latitude);
            preparedStatement.setString(2, longitude);
            preparedStatement.setInt(3, Integer.parseInt(id));

            database.executeStatement(preparedStatement);
            } catch(Exception exception) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
