const { default: mongoose } = require('mongoose');
const Appointment = require('../models/appointment.js');
const user = require('../models/user.js');

function getUser(params) {
    user.find()
}

class AppointmentController {

    // GET users/:id
    indexUser(req, res, next) {
        User.findById(req.params.id).then((user) => {
            userName = user.firstName
        })

        const userId = req.params.id;
        Appointment.find({ userId: { _id:userId }} ).limit(10)
            .then(appointments => {
                appointments.forEach(ele => {
                    console.log(res.locals.userName)
                })
                res.status(200).json(appointments)
            })
            .catch(next);
    }

    // GET doctors/:id
    indexDoctor(req, res, next) {
        Doctor.findById(req.params.id).then((doctor) => {
            if(doctor) {
                 res.locals.doctorName = doctor.firstName
            }
         });

        const userId = req.params.id;
        Appointment.find({ doctorId: { _id:userId }} ).limit(10)
            .then(appointments => {
                console.log(res.locals.doctorName)
                appointments.forEach((node) => {
                    node.userName = res.body.firstName
                    node.doctorName = res.body.doctorName
                })
                res.status(200).json(appointments)
            })
            .catch(next);
    }

    // GET /search/
    search(req, res, next) {
        Appointment.find(req.params)
            .then(appointments => {
                appointments.forEach((node) => {
                    node.userName = req.body.firstName
                    node.doctorName = req.body.doctorName
                })
                res.status(200).json(appointments)
            })
            .catch(next);
    }

    // GET  /:id
    show(req, res, next) {
        Appointment.findById(req.params.id)
            .then(appointments => res.status(200).json(appointments))
            .catch(next);
    }

    // POST /
    post(req, res) {
        const data = req.body;
        if(!req.body.startTime) {
            data.startTime = new Date("2024-02-20T24:00:00");
        }

        if (!req.body.endTime) {
            data.endTime = new Date(data.startTime.getTime() + 3600 * 1000);
        }

        console.log(data);

        const newAppointment = new Appointment(data);
        try {
            newAppointment.save();
            return res.status(201).json(newAppointment);
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    }

    // PUT /:id
    put (req, res, next) {
        Appointment.updateOne({ _id: req.params.id }, req.body)
            .then((appointment) => res.status(200).send(appointment))
            .catch(next);
    }
}

module.exports = new AppointmentController;