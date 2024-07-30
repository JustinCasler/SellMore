import express from 'express';
import { getUsers, createUser } from '../controllers/users.js';

const router = express.Router();

router.get('/get-users', getUsers);
router.post('/create-user', createUser);

export default router;