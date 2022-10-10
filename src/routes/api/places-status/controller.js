import {wrapperAsync} from "@/utils/functions";
import {sendRawQuery} from "@/database/function";
import {FIND_PLACE_STATUS_LOG, INSERT_PLACE_STATUS} from "@/database/queries/place-status";

export const findNewPlaceStatus = wrapperAsync( async(req,res)=>{
    const {place_id:placeId, model_id:modelId}=req.params;
    const {person_in:personIn} = req.query;

    if(personIn.toUpperCase() === 'TRUE') {
        let {id, date_in:dateIn, time_in:timeIn} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
            placeId, modelId
        })

        const result = {
            success:true,
            data: {
                id,
                date: dateIn,
                time: timeIn
            }
        }

        res.status(201).json(result)
    }
    else throw new Error('Bad Request.');
})

export const createNewPlaceStatus = wrapperAsync( async (req, res)=>{

    const {place_id:placeId,model_id:modelId} = req.params;
    const {person_in} = req.body;

    if(!person_in) throw new Error('Bad Request.');

     await sendRawQuery( INSERT_PLACE_STATUS,
        {
            placeId, modelId,
    });

    let {id, date_in:dateIn, time_in:timeIn} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
            placeId, modelId
        })

    const result = {
        success:true,
        data: {
            id,
            date: dateIn,
            time: timeIn
        }
    }

    res.status(201).json(result)
})
