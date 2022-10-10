import {wrapperAsync} from "@/utils/functions";
import {sendRawQuery} from "@/database/function";
import {INSERT_PLACE_STATUS} from "@/database/queries/place-status";

export const updatePlaceState = wrapperAsync( async (req, res, next)=>{

    const {place_id:placeId,model_id:modelId} = req.params;
    const {person_in} = req.body;

    if(!person_in) throw new Error('Bad Request.')

    let query = await sendRawQuery( INSERT_PLACE_STATUS,
        {
            placeId, modelId,
        });
    console.log(query)

    res.status(201).json({success:true, data:query})
})
