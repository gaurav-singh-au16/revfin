const express = require('express');
const { getTemplate, addTemplate } = require('../controllers/template.controller');

const Router = express.Router
const route = Router();

// template
route.get('/api/template', getTemplate)
route.get('/api/add-template', addTemplate)

module.exports = route