package com.todolist.ToDoList.controller;


import com.todolist.ToDoList.model.Task;
import com.todolist.ToDoList.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET /api/tasks - Retrieves all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // GET /api/tasks/{id} - Retrieves a task by its id
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/tasks - Creates a new task
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        taskService.createCategory(task.getCategory());
        return taskService.createTask(task);
    }

    // PUT /api/tasks/{id} - Updates a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        if (updatedTask != null) {
            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/tasks/{id} - Deletes a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/delete-multiple-tasks")
    public ResponseEntity<Task> deleteSelectedTasks(@RequestBody List<String> tasksToDelete) {
        tasksToDelete.stream().forEach(id -> {
            if (StringUtils.hasLength(id)) {
                taskService.deleteTask(Long.valueOf(id));
            }
        });
        return ResponseEntity.ok().build();
    }
}
