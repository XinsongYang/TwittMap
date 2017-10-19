const router = require('koa-router')();
const apiRouter = require('./apiRouter');

router.get('/', async (ctx, next) => {
        await ctx.render('index')
    });
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

module.exports = router;