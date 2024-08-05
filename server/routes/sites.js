import express from 'express';
import { getSites, createSite } from '../controllers/sites.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/get-sites/', auth, getSites);
router.post('/create-sites', auth, createSite);

export default router;