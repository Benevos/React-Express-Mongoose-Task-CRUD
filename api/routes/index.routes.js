import { Router } from "express";

import { addTask, deleteTask, findTasks, getEditTask, postEditTask, toogleDoneTask } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/tasks/find', findTasks) 

router.post('/tasks/add', addTask);

router.get('/tasks/edit', getEditTask);

router.post('/tasks/edit', postEditTask);

router.get('/tasks/delete', deleteTask);

router.get('/tasks/toogle-done', toogleDoneTask);

export default router;