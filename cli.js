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
  case "-h" || "--help":
    console.log(`
      -h --help                 |   список команд
      add <task>                |   добавить новую задачу.
      list                      |   вывести список всех задач.
      get <id>                  |   вывести информацию о задаче с указанным ID.
      update <id> <"newTask">   |   обновить задачу с указанным ID.
      status <id> <"newStatus"> |   обновить статус задачи с указанным ID.
      delete <id>               |   удалить задачу с указанным ID.
    `);
    break;
  default:
    console.log(`
    Неверная команда.
    Для получения списка команд
    используйте ключ "-h" или "--help"
    `);
}

// Пример использования
/**
 * node index.js add "Новая задача" # Добавляет новую задачу
 * node index.js list # Выводит список задач
 * node index.js delete <taskId> # Удаляет задачу по ID
 */
