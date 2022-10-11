import express from 'express';
import placesStatus from './places-status'

const router = express.Router();

router.use("/place/status",placesStatus);

module.exports = router;
