import { BASE_URL } from './constant';

export const APIURL = {
    sendOtp:`${BASE_URL}/sendOtp/`,
    resendOtp:`${BASE_URL}/resendOtp/`,
    verifyOtp:`${BASE_URL}/verifyOtp/`,
    citiesInfo:`${BASE_URL}/cities`,
    scheduleInfo:`${BASE_URL}/schedules/`,
    getScheduleInfoById:`${BASE_URL}/schedule/`,
    availabilityInfo:`${BASE_URL}/availabilities/`,
    getAvailabilityById:`${BASE_URL}/availability/`,
    bookingById:`${BASE_URL}/tentative_booking/`,
    confirmBooking:`${BASE_URL}/confirm_booking/`,
    getBookingDetails:`${BASE_URL}/booking_details/`,
    getCancelInfo:`${BASE_URL}/can_cancel_booking/`,
    cancelBooking:`${BASE_URL}/cancel_booking/`

}
export default APIURL;