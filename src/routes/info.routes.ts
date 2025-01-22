import express from 'express';
import InfoController from '../controllers/info.controller';

const router = express.Router();

router.get('/get_informationHQ',InfoController.getInfoHQ);
router.get('/get_informationSt',InfoController.getInfoSt);

export default router;