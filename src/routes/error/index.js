const clientErrorHandler = (err, req, res, next)=> {
    if (req.xhr) {
        res.status(400).json({success:false, message:err.message})
    } else {
        next(err)
    }
}
