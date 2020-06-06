const express = require('express');
const devController = require('./controller/DevController');
const likeController = require('./controller/LikeController');
const dislikeController = require('./controller/DislikeController');

const routes = express.Router();

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);

routes.post('/devs/:devId/likes', likeController.store);
routes.post('/devs/:devId/dislikes', dislikeController.store);

module.exports = routes;