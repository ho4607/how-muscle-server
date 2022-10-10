export const INSERT_PLACE_STATUS = `
    insert into how_muscle.place_status_logs
        (place_id, date_in, time_in, date_out, time_out, model_id, administrators_id, clean)
    values(:placeId,current_date,current_time,null,null,:modelId,1,null);
`

export const FIND_PLACE_STATUS_LOG = `
    select id, 
           date_in, 
           time_in  
    from how_muscle.place_status_logs 
        where place_id = :placeId and model_id = :modelId 
        order by date_in, time_in desc ; 
`
