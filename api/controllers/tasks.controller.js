import Task from "../models/Task.js";

export const findTasks = async (req, res) =>
{
    try
    {
        const tasks = await Task.find();

        res.json(tasks);
    }
    catch({ message })
    {
        res.status(500).send(message);
    }
}

export const addTask = async (req, res) =>
{   
    const { title, description } = req.body;

    try
    {
        const task = Task(
        {
            title: title,
            description: description,
        });
        const taskSaved = await task.save();

        res.send('Task added!');
    }
    catch({ message })
    {
        res.status(400).send(message);
    }
}

export const getEditTask = async (req, res) =>
{
    try
    {
        const { id } = req.query;

        const task = await Task.findById(id).lean();

        res.json(task);
    }
    catch({ message })
    {
        res.status(400).send(message);
    }
}

export const postEditTask = async (req, res) =>
{
    const { id, title, description } = req.body;

    const taskUpdated = await Task.findByIdAndUpdate(id, {title: title, description: description});

    res.send('Tarea actualizada!');
}

export const deleteTask = async (req, res) =>
{
    try
    {
        const { id } = req.query;

        const task = await Task.findByIdAndDelete(id).lean();

        res.json(task);
    }
    catch({ message })
    {
        res.status(400).send(message);
    }
}

export const toogleDoneTask = async (req, res) =>
{
    try
    {
        const { id } = req.query;

        const task = await Task.findById(id);

        task.done = !task.done;

        await task.save();

        const changedTask = await Task.findById(id);

        res.json(changedTask);
    }
    catch({ message })
    {
        res.status(400).send(message);
    }
}

/* import { Router } from "express";
import expressWs from "express-ws";

const router = Router();

expressWs(router);

router.ws('/websocket', (ws, req) =>
{
    console.log('Cliente conectado');
})

export default router; */