
package ee4216.springdata.jdbc;

/**
 * A model class representing the 'courses' table.
 * @author vanting
 */
public class Auth {
    
    
    private String username;
    private String password;
    
    // Constructors, getters, and setters

    public Auth(String username, String password) {
        
        this.username = username;
        this.password = password;
    }

  

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String state) {
        this.password = password;
    }
}