import { login } from '../api/api';

export function sendOtpAction(mobile) {
    return {
        type: 'SEND_OTP',
        payload: login.sendOtp(mobile)
    }
}

export function verifyOtpAction(mobile,otp) {
    return {
        type: 'VERIFY_OTP',
        payload: login.verifyOtp(mobile,otp)
    }
}

export function resendOtpAction(mobile,type) {
    return {
        type: 'RESEND_OTP',
        payload: login.resendOtp(mobile,type)
    }
}

export function citiesInfoAction() {
    return {
        type: 'CITIES_INFO',
        payload: login.citiesInfo()
    }
}

export function busesInfoAction(originId, destId, date) {
    return {
        type: 'BUSES_INFO',
        payload: login.scheduleInfo(originId, destId, date)
    }
}

export function seatInfoAction(scheduleId) {
    return {
        type: 'SEATS_INFO',
        payload: login.getAvailabilityById(scheduleId)
    }
}

export function busInfoAction(scheduleId) {
    return {
        type: 'SEATS_INFO',
        payload: login.getScheduleInfoById(scheduleId)
    }
}

export function tentativeBookingAction(scheduleId,orderId, passengerInfo) {
    return {
        type: 'TENTIVE_BOOKING',
        payload: login.bookingById(scheduleId, orderId, passengerInfo)
    }
}

export function confirmBookingAction(pnr) {
    return {
        type: 'TENTIVE_BOOKING',
        payload: login.confirmBooking(pnr)
    }
}