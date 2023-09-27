const {Booking} = require('../models/index');
const {AppError, validationError} = require('../utils/errors/index');
const {StatusCodes} = require('http-status-codes');

class BookingRepository{
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new validationError(error);
            }
            throw new AppError(
                'Repository Error', 
                'Cannot create booking', 
                'There was some issue creating the booking, please try again later', 
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

}

module.exports = BookingRepository;