const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModels');

//skapa TODO
router.post('/', async (req, res) => {
    const { task, completed } = req.body;

    try {
        const newTodo = new Todo({
            task,
            completed
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: 'Error creating todo', error: err.message });
    }
});

//Hämta alla TODOS
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos', error: err.message });
    }
});

//hämta specifik TODO
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ message: 'Error fetching todo', error: err.message });
    }
});

//uppdatera en todo
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: 'Error updating todo', error: err.message });
    }
});

//ta bort en todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting todo', error: err.message });
    }
});

module.exports = router;