import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { generateUniqueID } from "./generateUniqueID.js";

// Путь к папке с тасками: homedir\.todoapp
const appDir = path.join(os.homedir(), ".todoapp");

if (!existsSync(appDir)) {
  await fs.mkdir(appDir);
}
const tasksFile = path.join(appDir, "tasks.json");

// Чтение текущего списка задач
const readTasks = async () => {
  try {
    const tasks = await fs.readFile(tasksFile, "utf8");
    return JSON.parse(tasks);
  } catch (error) {
    return [];
  }
};

// Сохранение списка задач
const saveTasks = async (tasks) => {
  await fs.writeFile(tasksFile, JSON.stringify(tasks, null, 2));
};

// Добавление новой задачи
export const addTask = async (task) => {
  const tasks = await readTasks();
  const id = await generateUniqueID(tasksFile);
  const newTask = { id, task, status: "[В работе]" };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log(`Задача добавлена с идентификатором ${newTask.id}`);
};

// Вывод списка всех задач
export const listTasks = async () => {
  console.log("Список задач:");
  (await readTasks()).forEach((task) => {
    console.log(`${task.id}. ${task.status} ${task.task}`);
  });
};

// Получение задачи по ID
export const getTask = async (id) => {
  const tasks = await readTasks();
  const task = tasks.find((task) => +task.id === +id);
  console.log(`
    Задача с идентификатором ${task.id}:
    Название: ${task.task}
    Статус: ${task.status}
  `);
  return task;
};

// Обновление задачи по ID
export const updateTask = async (id, newTask) => {
  let tasks = await readTasks();
  tasks = tasks.map((task) => {
    if (task.id === +id) {
      task.task = newTask;
    }
    return task;
  });
  await saveTasks(tasks);
  console.log(`Задача с ID ${id} обновлена`);
};

// Обновление статуса задачи по ID
export const updateTaskStatus = async (id, newStatus) => {
  let tasks = await readTasks();
  tasks = tasks.map((task) => {
    if (task.id === +id) {
      task.status = `[${newStatus}]`;
    }
    return task;
  });
  await saveTasks(tasks);
  console.log(`Статус задачи с ID ${id} обновлен`);
};

// Удаление задачи по ID
export const deleteTask = async (id) => {
  let tasks = await readTasks();
  tasks = tasks.filter((task) => +task.id !== +id);
  await saveTasks(tasks);
  console.log(`Задача с ID ${id} удалена`);
};
