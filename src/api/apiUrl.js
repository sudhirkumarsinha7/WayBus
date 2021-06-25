import { BASE_URL } from './constant';

export const APIURL = {
    registerDevice:`${BASE_URL}/register_device/`,
    getHelp:`${BASE_URL}/send-support-mail/`,
    sendOtp:`${BASE_URL}/sendOtp/`,
    resendOtp:`${BASE_URL}/resendOtp/`,
    verifyOtp:`${BASE_URL}/verifyOtp/`,
    registerUser:`${BASE_URL}/users/`,
    citiesInfo:`${BASE_URL}/cities`,
    scheduleInfo:`${BASE_URL}/schedules/`,
    getScheduleInfoById:`${BASE_URL}/schedule/`,
    availabilityInfo:`${BASE_URL}/availabilities/`,
    getAvailabilityById:`${BASE_URL}/availability/`,
    bookingById:`${BASE_URL}/tentative_booking/`,
    confirmBooking:`${BASE_URL}/confirm_booking/`,
    getBookingDetails:`${BASE_URL}/booking_details/`,
    getBookingList:`${BASE_URL}/show_tickets/`,
    getCancelInfo:`${BASE_URL}/can_cancel_booking/`,
    cancelBooking:`${BASE_URL}/cancel_booking/`,
    mobilePayment: `${BASE_URL}/initiateMobilePayment/`,

}
export default APIURL;