import { getCall, postCall } from './helper';
import { APIURL } from './apiUrl';

const API = {
    login: {
        sendOtp:(mobile) => getCall(APIURL.sendOtp+`${mobile}`),
        resendOtp:(mobile,type) => postCall(APIURL.resendOtp+`${mobile}/${type}`),
        verifyOtp:(mobile,otp) => postCall(APIURL.verifyOtp+`${mobile}/${otp}`,{}),
        citiesInfo:() => getCall(APIURL.citiesInfo),
        scheduleInfo:(originId,destId,date) => getCall(APIURL.scheduleInfo+`${originId}/${destId}/${date}`),
        getAvailabilityById:(scheduleId) => getCall(APIURL.getAvailabilityById+`${scheduleId}`),
        getScheduleInfoById:(scheduleId) => getCall(APIURL.getScheduleInfoById+`${scheduleId}`),
        
        availabilityInfo:(originId,destId,date) => getCall(APIURL.availabilityInfo+`${originId}/${destId}/${date}`),
        
        bookingById:(scheduleId, orderId ,data) => postCall(APIURL.bookingById+`${scheduleId}/${orderId}`,data),
        confirmBooking:(pnr) => postCall(APIURL.confirmBooking+`${pnr}`,{}),
        getBookingDetails:(pnr,mobile) => getCall(APIURL.getBookingDetails+`${pnr}/${mobile}`),
        getCancelInfo:(pnr) => getCall(APIURL.getCancelInfo+`${pnr}`),
        cancelBooking:(pnr,seatNumber) => getCall(APIURL.cancelBooking+`${pnr}/${seatNumber}`)

    }
}

module.exports = API