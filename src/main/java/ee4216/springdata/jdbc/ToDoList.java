
package ee4216.springdata.jdbc;

/**
 * A model class representing the 'courses' table.
 * @author vanting
 */
public class ToDoList {
    
    private int id;
    private String name;
    private String state;
    
    // Constructors, getters, and setters

    public ToDoList(int id, String name, String state) {
        this.id = id;
        this.name = name;
        this.state = state;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}