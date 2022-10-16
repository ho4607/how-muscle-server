export const UPDATE_OUT_PLACE_STATUS_LOG =`
    update how_muscle.place_status_logs 
        set date_out=current_date, time_out=current_time
        where id = (
            select id
            from how_muscle.place_status_logs
            where place_id = :placeId and model_id = :modelId
            order by date_in desc, time_in desc limit 1
        );
`

export const UPDATE_CLEAN_PLACE_STATUS_LOG =`
    update how_muscle.place_status_logs 
        set date_clean=current_date, time_clean=current_time
        where id = (
            select id
            from how_muscle.place_status_logs
            where place_id = :placeId and model_id = :modelId
            order by date_in desc, time_in desc limit 1
        );
`

export const INSERT_PLACE_STATUS = `
    insert into how_muscle.place_status_logs
        (place_id, date_in, time_in, date_out, time_out, model_id, administrators_id)
    values(:placeId,current_date,current_time,null,null,:modelId,1);
`

export const FIND_PLACE_STATUS_LOG = `
    select id, 
           date_in, 
           time_in,
           date_clean,
           time_clean,
           date_out,
           time_out
    from how_muscle.place_status_logs 
        where place_id = :placeId and model_id = :modelId 
        order by date_in desc, time_in desc limit 1 ; 
`

export const FIND_PLACE_STATUS_LOG_DETAIL = `
    select l.id, 
           l.place_id,
           p.place_name as place_name,
           l.model_id,
           m.serial_key as model_serial_key,
           date_in, 
           time_in,
           date_clean,
           time_clean,
           date_out,
           time_out
    from how_muscle.place_status_logs  as l
    inner join how_muscle.models as m on l.model_id = m.id
    inner join how_muscle.places as p on l.place_id = p.id
        where l.place_id = :placeId and l.model_id = :modelId 
        order by l.date_in desc, l.time_in desc limit :limit ; 
`
