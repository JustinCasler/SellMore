import express from 'express';
import { getUsers, createUser } from '../controllers/users.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/get-users', auth, getUsers);
router.post('/upload-users', auth, createUser);

export default router;