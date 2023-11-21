const User = require('../models/user')
const Doctor = require('../models/doctor')


function validateAppointmentData(req, res, next) {
    data = req.body

    if(!data.userId || !data.doctorId) {
        return res.status(400).json({
            msg: "missing field"
        })
    }

    User.findById(req.body.userId).then((user) => {
        if(!user) {
            return res.status(400).json({
                msg: "no user found"
            });
        }

        res.locals.userName = user.firstName
    });

    Doctor.findById(req.body.doctorId).then((doctor) => {
       if(!doctor) {
        return res.status(400).json({
            msg: "no doctor found"
        });
       }
       res.locals.doctorName = doctor.firstName
    });

    next()
}

module.exports = {
    validateAppointmentData
}