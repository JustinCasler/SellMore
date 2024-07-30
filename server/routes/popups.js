import express from 'express';
import { getPopups, createPopups, updatePopup} from '../controllers/popups.js';

const router = express.Router();

router.get('/get-popups/:websiteId', getPopups);
router.post('/create-popups', createPopups);
router.put('/update-popup/:id', updatePopup);

export default router;