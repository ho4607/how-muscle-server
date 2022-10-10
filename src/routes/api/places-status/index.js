import express from 'express'
import {
    createNewPlaceStatus,
    findNewPlaceStatus,
    findUpdatedCleanHistory, findUpdatedOutHistory,
    updateCleanHistory, updateOutHistory
} from "@/routes/api/places-status/controller";

const place = express.Router()

place.post('/in/:place_id(\\d+)/:model_id(\\d+)',createNewPlaceStatus)
place.get('/in/:place_id(\\d+)/:model_id(\\d+)',findNewPlaceStatus)
place.post('/clean/:place_id(\\d+)/:model_id(\\d+)',updateCleanHistory)
place.get('/clean/:place_id(\\d+)/:model_id(\\d+)',findUpdatedCleanHistory)
place.post('/out/:place_id(\\d+)/:model_id(\\d+)',updateOutHistory)
place.get('/out/:place_id(\\d+)/:model_id(\\d+)',findUpdatedOutHistory)

module.exports = place;
