// server exception
module.exports.onServerException = (res, error) => {
    console.log(error);
    return res.status(500).json({
        success: false,
        msg: 'Server Error',
        error: error
    });
}

// records found
module.exports.onSuccess = (res,msg , data) => {
    return res.status(200).json({
        success: true,
        msg: msg,
        data: data
    });
}

// not found
module.exports.onFailure = (res,msg) => {
    return res.status(204).json({
        success: false,
        msg: msg,
    });
}
