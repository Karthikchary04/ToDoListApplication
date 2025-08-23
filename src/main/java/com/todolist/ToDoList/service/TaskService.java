package com.todolist.ToDoList.service;


import com.todolist.ToDoList.model.Category;
import com.todolist.ToDoList.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task createTask(Task task);
    Task updateTask(Long id, Task task);
    void deleteTask(Long id);
    Category createCategory(String category);
    List<Category> getCategories();
}
