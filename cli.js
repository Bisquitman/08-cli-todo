#!/usr/bin/env node

import { addTask, deleteTask, listTasks, getTask, updateTask, updateTaskStatus } from "./service/taskManager.js";

const command = process.argv[2];

switch (command) {
  case "add":
    const task = process.argv[3];
    addTask(task);
    break;
  case "list":
    listTasks();
    break;
  case "get":
    const id = process.argv[3];
    getTask(id);
    break;
  case "update":
    const updateID = process.argv[3];
    const newTask = process.argv[4];
    updateTask(updateID, newTask);
    break;
  case "status":
    const statusID = process.argv[3];
    const newStatus = process.argv[4];
    updateTaskStatus(statusID, newStatus);
    break;
  case "delete":
    const taskId = process.argv[3];
    deleteTask(taskId);
    break;
  default:
    console.log("Неверная команда");
}

// Пример использования
/**
 * node index.js add "Новая задача" # Добавляет новую задачу
 * node index.js list # Выводит список задач
 * node index.js delete <taskId> # Удаляет задачу по ID
 */
