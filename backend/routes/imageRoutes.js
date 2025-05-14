import express from 'express';
import { generateImage ,getImageHistory} from '../controllers/imageController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate-image', authMiddleware, generateImage);
router.get('/image-history', authMiddleware, getImageHistory);

export default router;
