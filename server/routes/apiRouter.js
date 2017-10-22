const router = require('koa-router')();
const twitterController = require('./../controllers/twitterController');

const apiRouter = router
  .get('/hotKeywords', twitterController.getHotKeywords)
  .get('/tweetsByKeyword', twitterController.getTweetsByKeyword)
  .get('/tweetsByCoord', twitterController.getTweetsByCoord);
  
module.exports = apiRouter;