package com.todoList.TodoList;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskListRepository extends JpaRepository<Task, Integer> {
    
}
