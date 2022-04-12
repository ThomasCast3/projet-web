package coding.finalwebprojet.restapi.model;

public class Users {
    public int id;
    public String email, role, firstName, lastName;

    public Users(int id, String email, String role, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
