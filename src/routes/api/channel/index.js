const Router = require('koa-router');
const router = new Router();

router
  .get('/list',  require('./list'))
  .post('/create',  require('./create'),  require('./list'))
  .post('/subscribe',  require('./channelCheck'),  require('./subscribe'))
  .post('/countSub',  require('./countSub'))
  .post('/publish',  require('./channelCheck'),    require('./publish'))
  .post('/unsubscribe',  require('./channelCheck'),    require('./unsubscribe'),  require('./countSub'))
  .post('/unsubscribeAll',  require('./unsubscribeAll'),  require('./countSub'));

module.exports = router;