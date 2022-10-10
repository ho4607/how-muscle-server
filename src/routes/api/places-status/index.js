import express from 'express'
import {createNewPlaceStatus, findNewPlaceStatus, updateCleanHistory} from "@/routes/api/places-status/controller";

const place = express.Router()

place.post('/in/:place_id(\\d+)/:model_id(\\d+)',createNewPlaceStatus)
place.get('/in/:place_id(\\d+)/:model_id(\\d+)',findNewPlaceStatus)
// place.post('/out/:id(\\d+)',updatePlaceState)
place.post('/clean/:place_id(\\d+)/:model_id(\\d+)',updateCleanHistory)

module.exports = place;
