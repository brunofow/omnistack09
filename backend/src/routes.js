const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionControler = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalControler = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionControler.store);
routes.post('/spots', upload.single('thumbnail'),SpotController.store);
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalControler.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);

module.exports = routes;
