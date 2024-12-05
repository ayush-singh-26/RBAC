import { Router } from 'express';
import { signUp, loginUser, logoutUser } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import roleAuthorization from '../middlewares/role.middleware.js';

const router = Router();

// Auth Routes
router.route('/signUp').post(signUp);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT, logoutUser);

// Admin Routes
router.route('/admin').get(verifyJWT,roleAuthorization("admin"),(req, res) => {
    res.json({ message: "Welcome, Admin!" });
    
});

router.route('/moderator').get(verifyJWT,roleAuthorization("moderator","admin"),(req, res) => {
    res.json({ message: "Welcome, moderator!" });
});
router.route('/user').get(verifyJWT,roleAuthorization("admin","moderator","user"),(req, res) => {
    res.json({ message: "Welcome, User!" });
});








export default router;
