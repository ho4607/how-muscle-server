import {wrapperAsync} from "@/utils/functions";
import {sendRawQuery, sendRawQueryFindAll} from "@/database/function";
import {
    FIND_PLACE_STATUS_LOG, FIND_PLACE_STATUS_LOG_DETAIL,
    INSERT_PLACE_STATUS,
    UPDATE_CLEAN_PLACE_STATUS_LOG, UPDATE_OUT_PLACE_STATUS_LOG
} from "@/database/queries/place-status";

export const findAllLog = wrapperAsync(async(req, res)=>{
    const {place_id:placeId, model_id:modelId} = req.params;
    let {limit} = req.query;

    limit = parseInt(limit) || null;

    let data = await sendRawQueryFindAll(FIND_PLACE_STATUS_LOG_DETAIL, {
        placeId, modelId, limit
    })

    if(!data) throw new Error ("bad request");

    const result = {
        success:true,
        data: data
    }

    res.status(200).json(result)

})

export const findUpdatedOutHistory = wrapperAsync(async (req,res)=>{
    const {place_id:placeId, model_id:modelId} = req.params;
    const {person_out:personOut} = req.query

    if(personOut?.toUpperCase()==='TRUE'){

        let {id, date_out:dateOut, time_out:timeOut} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
            placeId, modelId
        })

        const result = {
            success:true,
            data: {
                id,
                date: dateOut,
                time: timeOut
            }
        }

        res.status(200).json(result)

    }
    else throw new Error('Bad Request.');
})

export const updateOutHistory = wrapperAsync(async (req,res)=>{
    const {place_id:placeId, model_id:modelId} = req.params;
    const {person_out} = req.body

    if(!person_out) throw new Error('Bad Request.');

    await sendRawQuery( UPDATE_OUT_PLACE_STATUS_LOG,
        {
            placeId, modelId,
        });

    let {id, date_out:dateOut, time_out:timeOut} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
        placeId, modelId
    })

    const result = {
        success:true,
        data: {
            id,
            date: dateOut,
            time: timeOut
        }
    }

    res.status(201).json(result)
})

export const findUpdatedCleanHistory = wrapperAsync(async (req,res)=>{
    const {place_id:placeId, model_id:modelId} = req.params;
    const {person_clean:personClean} = req.query

    if(personClean.toUpperCase()==='TRUE'){
        let {id, date_clean:dateClean, time_clean:timeClean} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
            placeId, modelId
        })

        const result = {
            success:true,
            data: {
                id,
                date: dateClean,
                time: timeClean
            }
        }
        res.status(200).json(result)

    }
    else throw new Error('Bad Request.');
})

export const updateCleanHistory = wrapperAsync( async(req,res)=>{
    const {place_id:placeId, model_id:modelId} = req.params;
    const {person_clean} = req.body

    if(!person_clean)throw new Error('Bad Request.');

    await sendRawQuery( UPDATE_CLEAN_PLACE_STATUS_LOG,
        {
            placeId, modelId,
        });

    let {id, date_clean:dateClean, time_clean:timeClean} = await sendRawQuery(FIND_PLACE_STATUS_LOG, {
        placeId, modelId
    })

    const result = {
        success:true,
        data: {
            id,
            date: dateClean,
            time: timeClean
        }
    }

    res.status(201).json(result)
})

export const findNewPlaceStatus = wrapperAsync( async(req,res)=>{
    const {place_id:placeId, model_id:modelId}=req.params;
    const {person_in:personIn} = req.query;

    if(personIn?.toUpperCase() === 'TRUE') {
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
        res.status(200).json(result)
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
