import express from 'express';
import { getPopups, createPopups, updatePopup} from '../controllers/popups.js';
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/get-popups/:websiteId', auth, getPopups);
router.post('/create-popups', auth, createPopups);
router.put('/update-popup/:id', auth, updatePopup);

export default router;