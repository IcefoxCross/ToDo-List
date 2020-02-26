package com.todoList.TodoList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TaskListController {
    
    @Autowired
    TaskListRepository taskListRepository;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/tasks")
    public List<Task> getAllTasks() {
        List<Task> tasks = new ArrayList<>();
        taskListRepository.findAll().forEach(tasks :: add);
        return tasks;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/tasks/{id}")
    public Task getTask(@PathVariable int id) {
        if (taskListRepository.findById(id).isPresent()){
            Task foundTask = taskListRepository.findById(id).get();
            return foundTask;
        } else {
            return null;
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/tasks")
    public Task addTask(@RequestBody Task task) {
        taskListRepository.save(task);
        return task;
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/tasks/{id}")
    public Task updateTask(@RequestBody Task task, @PathVariable int id) {
        if (taskListRepository.findById(id).isPresent()){
            Task foundTask = taskListRepository.findById(id).get();
            foundTask.setDescription(task.getDescription());
            foundTask.setChecked(task.getChecked());
            taskListRepository.save(foundTask);
            return task;
        } else {
            return null;
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/tasks/{id}")
    public void deleteTask(@PathVariable int id) {
        taskListRepository.deleteById(id);
    }
}
