import express from 'express';
import urlController from '../controllers/urlController';
const router = express.Router();

router.post('/shorten', urlController.shortenUrl);
router.get('/:shortUrl', urlController.redirectToOriginal);
router.get('/stats/:shortUrl', urlController.getStats);

module.exports = router;