const Appointment = require("../model/Appointment");

// exports.makeAppointmentController = async (req, res) => {
//     const { name, phoneNumber, email, date, time } = req.body;
//     console.log(name, phoneNumber, email, date, time);
//     try {

//         const existingAppointment = await Appointment.findOne({ phoneNumber })
//         if (existingAppointment) {
//             res.status(406).json('Appointment Existed')
//         }
//         else {
//         const newAppointment = new Appointment({ name, email,phoneNumber, date, time });
//         await newAppointment.save();
//         res.status(200).json(newAppointment);
//         }

//     } catch (error) {
//         res.status(401).json(`booking failed due to ${error}`)
//     }
//     // res.status(200).json('register request received')
// }

// get all appointments

exports.makeAppointmentController = async (req, res) => {
    const { name, phoneNumber, email, date, time } = req.body;
    console.log(name, phoneNumber, email, date, time);
    try {
        // Check if any appointment already exists for the same date and time (for any user)
        const existingAppointment = await Appointment.findOne({ date, time });

        if (existingAppointment) {
            return res.status(406).json({ message: 'This time slot is already booked.' });
        }

        // If no appointment exists for that time slot, create a new one
        const newAppointment = new Appointment({
            name,
            email,
            phoneNumber,
            date,
            time,
        });

        await newAppointment.save();  // Save the appointment to the database
        res.status(200).json(newAppointment);  // Send the new appointment data in the response

    } catch (error) {
        res.status(401).json({ message: `Booking failed due to ${error.message}` });
    }
};


exports.bookedAppointmentController = async (req, res) => {

    try {

        const allbookings = await Appointment.find()
        if (allbookings) {
            res.status(200).json(allbookings)
        }
        else {
            res.status(406).json('no bookings')
        }

    }
    catch (error) {
        res.status(406).json(error)
    }
}

exports.deleteAppointmentController = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteAppointment = await Appointment.findByIdAndDelete(id);

        if (!deleteAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully', appointment: deleteAppointment });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Error deleting appointment', error: error.message });
    }
};