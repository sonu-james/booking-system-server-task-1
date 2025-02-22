//1)import express
const express=require('express')
//import appointmentController file
const AppointmentController=require('./controller/AppointmentController')

//2)create an object for router class
const router =new express.Router()
//3)set up path for each request from view

//Appointment  request
router.post('/appointment',AppointmentController.makeAppointmentController)

//get all appointments
router.get('/booked-appointments',AppointmentController.bookedAppointmentController)

//delete appointment 

router.delete('/delete/:id',AppointmentController.deleteAppointmentController)

//4)export the router
module.exports=router