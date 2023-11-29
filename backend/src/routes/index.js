const express = require('express');
const { getTemplate, addTemplate } = require('../controllers/template.controller');
const { getRectangle, createUpdateRect, getRectanglebyTemplate } = require('../controllers/rectangle.controller');

const Router = express.Router
const route = Router();

// template
route.get('/api/template', getTemplate)
route.post('/api/add-template', addTemplate)

// rect
route.get('/api/rectangle', getRectangle)
route.get('/api/rectangle:/template_id', getRectanglebyTemplate)
route.post('/api/create-update-rectangle', createUpdateRect)

module.exports = route