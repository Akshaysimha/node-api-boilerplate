var express = require('express');
var router = express.Router();

var service = require('../services/user.service')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const result = await service.getAllUsers(req);
  res.send(result);
});

router.get('/mongo_user', async (req, res, next) => {
  const result = await service.getAllMongoUsers(req);
  res.send(result);
});

router.post('/', async (req, res, next) =>{
  const result = await service.createUser(req);
  res.send(result);
})

router.post('/mongo_user', async (req, res, next) =>{
  const result = await service.createMongoUsers(req);
  res.send(result);
})

router.post('/signIn', async(req, res, next) => {
  const result = await service.signInUser(req)
  res.send(result);
})

module.exports = router;
