const express = require('express');
const { getTemplate, addTemplate, removeTemplate } = require('../controllers/template.controller');
const { getRectangle, createUpdateRect, getRectanglebyTemplate, removeRectangle } = require('../controllers/rectangle.controller');

const Router = express.Router
const route = Router();

// template
route.get('/api/template', getTemplate)
route.get('/api/remove-template/:id', removeTemplate)
route.post('/api/add-template', addTemplate)

// rect
route.get('/api/rectangle', getRectangle)
route.get('/api/rectangle/:template_id', getRectanglebyTemplate)
route.get('/api/remove-rectangle/:id', removeRectangle)
route.post('/api/create-update-rectangle', createUpdateRect)

module.exports = route