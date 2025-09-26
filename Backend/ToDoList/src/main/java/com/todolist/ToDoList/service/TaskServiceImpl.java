package com.todolist.ToDoList.service;


import com.todolist.ToDoList.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.todolist.ToDoList.model.Task;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task task) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            Task updated = existingTask.get();
            updated.setTitle(task.getTitle());
            updated.setDescription(task.getDescription());
            updated.setCompleted(task.isCompleted());
            updated.setDueDate(task.getDueDate());
            return taskRepository.save(updated);
        } else {
            // Depending on your design, you might throw an exception
            return null;
        }
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
