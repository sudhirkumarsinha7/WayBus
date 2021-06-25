import { getCall, postCall, putCall, postCallFd } from './helper';
import { APIURL } from './apiUrl';

const API = {
    login: {
        sendOtp:(mobile) => getCall(APIURL.sendOtp+`${mobile}`),
        resendOtp:(mobile,type) => postCall(APIURL.resendOtp+`${mobile}/${type}`),
        verifyOtp:(mobile,otp) => postCall(APIURL.verifyOtp+`${mobile}/${otp}`,{}),
        registerUser:(mobile, data) => postCall(APIURL.registerUser+`${mobile}`, data),
        updateUser:(mobile, data) => putCall(APIURL.registerUser+`${mobile}`, data),
        // updateUser:(mobile, data) => postCall(APIURL.registerUser+`${mobile}`, data),
        getUser:(mobile) => getCall(APIURL.registerUser+`${mobile}`),
        citiesInfo:() => getCall(APIURL.citiesInfo),
        scheduleInfo:(originId,destId,date) => getCall(APIURL.scheduleInfo+`${originId}/${destId}/${date}`),
        getAvailabilityById:(scheduleId) => getCall(APIURL.getAvailabilityById+`${scheduleId}`),
        getScheduleInfoById:(scheduleId) => getCall(APIURL.getScheduleInfoById+`${scheduleId}`),
        availabilityInfo:(originId,destId,date) => getCall(APIURL.availabilityInfo+`${originId}/${destId}/${date}`),
        bookingById:(scheduleId, orderId ,data) => postCall(APIURL.bookingById+`${scheduleId}/${orderId}`,data),
        confirmBooking:(pnr, request) => postCall(APIURL.confirmBooking+`${pnr}`, request),
        getBookingDetails:(pnr,mobile) => getCall(APIURL.getBookingDetails+`${pnr}/${mobile}`),
        getBookingList:(mobile) => getCall(APIURL.getBookingList+`${mobile}`),
        getCancelInfo:(pnr) => getCall(APIURL.getCancelInfo+`${pnr}`),
        cancelBooking:(pnr,seatNumber, mobile) => getCall(APIURL.cancelBooking+`${pnr}/${seatNumber}/${mobile}`),
        mobilePayment:(data) => postCall(APIURL.mobilePayment, data),
        getHelp:(data) => postCallFd(APIURL.getHelp, data)
    }
}

module.exports = API