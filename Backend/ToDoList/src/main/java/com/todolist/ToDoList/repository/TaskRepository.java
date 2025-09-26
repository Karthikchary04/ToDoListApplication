package com.todolist.ToDoList.repository;


import com.todolist.ToDoList.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can define custom queries here if needed
}