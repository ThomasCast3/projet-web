package coding.finalwebprojet.restapi.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ApiRequest {
    public static String getRequest(String url) {
        try {
            HttpURLConnection httpURLConnection = (HttpURLConnection)new URL(url).openConnection();
            httpURLConnection.setRequestProperty("User-Agent", "Mozilla/5.0");
            if (httpURLConnection.getResponseCode() != 200) return null;

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
            StringBuilder stringBuffer = new StringBuilder();
            String line;

            while ((line = bufferedReader.readLine()) != null) stringBuffer.append(line);
            return stringBuffer.toString();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
    }
}
