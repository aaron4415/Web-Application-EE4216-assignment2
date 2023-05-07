
package ee4216.springdata.jdbc;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A REST controller class to handle the HTTP requests and map them to the appropriate DAO methods.
 * @author vanting
 */
@RestController
@RequestMapping("/todolistItems")
public class ToDoListController {

    private ToDoListDao toDoListDao;
    

    /** 
     * As of Spring Framework 4.3, an @Autowired annotation on such a constructor is no 
     * longer necessary if the target bean only defines one constructor to begin with. 
     * However, if several constructors are available, at least one must be annotated to 
     * teach the container which one to use.
     */
    public ToDoListController(ToDoListDao toDoListDao) {
        this.toDoListDao = toDoListDao;
    }

    // curl -i http://localhost/todolistItems   
    @GetMapping("")
    public List<ToDoList> getAllToDOItems() {
        return toDoListDao.getAllToDOItems();
    }

    // curl -i http://localhost/todolistItems/10004   
     @GetMapping("/auth/{username}")
    public Auth getUserByUsername(@PathVariable String username) {
        return toDoListDao.getUserByUsername(username);
    }

    // curl -i -X POST -H "Content-Type: application/json" -d '{"id":10005,"name":"Informatics 200","teacherId":1234}' http://localhost/todolistItems
    @PostMapping("")
    public void addItem(@RequestBody ToDoList item) {
        toDoListDao.addItem(item);
    }

    // curl -i -X PUT -H "Content-Type: application/json" -d '{"id":10004,"name":"Informatics 300","teacherId":1234}' http://localhost/todolistItems/10004
    @PutMapping("/{id}")
    public void updateItem(@PathVariable int id, @RequestBody ToDoList item) {
        item.setId(id);
        toDoListDao.updateItem(item);
    }
    
    // curl -i -X DELETE http://localhost/todolistItems/10004
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable int id) {
        toDoListDao.deleteItem(id);
    }
}
