const express = require('express');
const router = express.Router();
const controller = require('../controllers/foodController.js');
const { login } = require('../auth/auth')
const { verify } = require('../auth/auth');

router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/", controller.home_page);
router.get('/new', verify, controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/posts/:author', controller.show_user_entries);
router.get("/loggedIn", verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);
//router.get("/", controller.home_page,css);

router.get('/about', controller.about_page);
router.get('/menu', controller.displayMenu);

router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});


module.exports = router;