const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const userController = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');
const validate = require('../middleware/validate');
//--------- AUTH ENDPOINTS -------------- //

router.post('/login',
    [
        check('username').exists().
            isString().
            trim().
            not().
            isEmpty(),
            check('password').exists().
            isString().
            isLength({ min: 8 }).
            trim().
            not().
            isEmpty()
    ],
    validate,
    userController.login);
router.post('/signup',
    [
        check('email').exists().
            isEmail().
            normalizeEmail(),
        check('username').exists().
            isString().
            trim().
            not().
            isEmpty(),
        check('password').exists().
            isString().
            isLength({ min: 8 }).
            trim().
            not().
            isEmpty()
    ],
    validate,
    userController.signup);

//-------- END OF AUTH ENDPOINTS -------- //

//--------- POSTS ENDPOINTS --------------- //

router.get('/posts', postController.getAllPosts);
router.post('/posts', postController.addPost);

//--------- END OF POST ENDPOINTS --------- //

module.exports = router;
