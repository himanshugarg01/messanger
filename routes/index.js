let router = require('express').Router();
let LoginRouter = require('./LoginRoute');
let SignupRoute = require('./SignupRoute');
let SearchRoute = require('./SearchRoute');
let AddFriendRoute = require('./AddFriendRoute');
let ChatRoute = require('./ChatRoute');
let Default = require('./Default');
let GroupRoute = require('./GroupRoute');


router.use('/login', LoginRouter);
router.use('/signup', SignupRoute);
router.use('/search', SearchRoute);
router.use('/addFriend', AddFriendRoute);
router.use('/chat', ChatRoute);
router.use('/addGroup', GroupRoute);
router.use('/group',GroupRoute);






router.use('/',Default);

module.exports = router;
