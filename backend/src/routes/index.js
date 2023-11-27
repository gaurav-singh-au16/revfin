const express = require('express');
const { getTemplate } = require('../controllers/template.controller');

const Router = express.Router
const route = Router();

// template
route.get('/api/template', getTemplate)

module.exports = route