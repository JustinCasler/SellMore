import express from 'express';
import { getSites, createSite } from '../controllers/sites.js';

const router = express.Router();

router.get('/get-sites/:userId', getSites);
router.post('/create-sites', createSite);

export default router;