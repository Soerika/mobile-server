const User = require('../models/user')
const Doctor = require('../models/doctor')


function validateAppointmentData(req, res, next) {
    data = req.body

    if(!data.userId || !data.doctorId) {
        return res.status(400).json({
            msg: "missing field"
        })
    }

    next()
}

function getAdditionalData(req, res, next) {
    User.findById(req.params.id).then((user) => {
        res.locals.userName = user.firstName
    })

    Doctor.findById(req.params.id).then((doctor) => {
       if(doctor) {
            res.locals.doctorName = doctor.firstName
       }
    });
    next()
}

module.exports = {
    getAdditionalData,
    validateAppointmentData
}