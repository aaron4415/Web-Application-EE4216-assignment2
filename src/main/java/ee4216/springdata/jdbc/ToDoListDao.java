package ee4216.springdata.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

/**
 * A DAO (Data Access Object) class to interact with the database and perform
 * CRUD operations against the 'courses' table.
 *
 * @author vanting
 */
public class ToDoListDao {

    private JdbcTemplate jdbcTemplate;

    /**
     * As of Spring Framework 4.3, an @Autowired annotation on such a
     * constructor is no longer necessary if the target bean only defines one
     * constructor to begin with. However, if several constructors are
     * available, at least one must be annotated to teach the container which
     * one to use.
     */
     
    public ToDoListDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ToDoList> getAllToDOItems() {
        String sql = "SELECT * FROM ToDoListItems";
        return jdbcTemplate.query(sql, new RowMapper<ToDoList>() {
            @Override
            public ToDoList mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new ToDoList(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("state")
                );
            }
        });

    }
public Auth getUserByUsername(String username) {
        String sql = "SELECT * FROM Auth WHERE username = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum)
                -> new Auth(
                        
                        rs.getString("username"),
                         rs.getString("password")
                ),
                username);
    }


    public void addItem(ToDoList toDoListItem) {
        String sql = "INSERT INTO ToDoListItems (name, state) VALUES ( ?, ?)";
        jdbcTemplate.update(sql, toDoListItem.getName(), toDoListItem.getState());
    }

    public void updateItem(ToDoList toDoListItem) {
        String sql = "UPDATE ToDoListItems SET name = ?, state = ? WHERE id = ?";
        jdbcTemplate.update(sql, toDoListItem.getName(), toDoListItem.getState(), toDoListItem.getId());
    }

    public void deleteItem(int toDoListItemId) {
        String sql = "DELETE FROM ToDoListItems WHERE id = ?";
        jdbcTemplate.update(sql, toDoListItemId);
    }
 
}
