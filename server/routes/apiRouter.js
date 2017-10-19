const router = require('koa-router')()
const twitterController = require('./../controllers/twitterController')

const apiRouter = router
  .get('/keywords', twitterController.getKeywords)
  .get('/tweets', twitterController.getTweets)
  
module.exports = apiRouter