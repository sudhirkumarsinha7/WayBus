import { login } from '../api/api';
import { ACCESS_TOKEN, SESSION_KEY } from '../api/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export async function setSocialLogin(data) {
    try{
        await AsyncStorage.setItem(ACCESS_TOKEN, data.token);
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
        return { type: 'SOCIAL_LOGIN', payload: { message:'OK', type:'success'}  };
    } catch (err) {
        return { type: 'SOCIAL_LOGIN', payload: { message:'Unable to login', type:'error'}  };
    }
}
export async function getLoggedUserData() {
    try {
        var data = await AsyncStorage.getItem(SESSION_KEY);
        data = JSON.parse(data);
        return { type: 'FETCH_USER_DATA', payload: { message:'OK', type:'success', data: data}};
      } catch (err) {
        return { type: 'FETCH_USER_DATA', payload: { message:'Unable to login', type:'error', data:{}}};
      }
}
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
export function signupAction(mobile, data) {
    return {
        type: 'SIGNUP_USER',
        payload: login.registerUser(mobile, data)
    }
}
export function getUserAction(mobile) {
    return {
        type: 'LOAD_USER',
        payload: login.getUser(mobile)
    }
}
export function updateUserAction(mobile, data) {
    return {
        type: 'UPDATE_USER',
        payload: login.updateUser(mobile, data)
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

export function confirmBookingAction(pnr, requestPayload) {
    return {
        type: 'TENTIVE_BOOKING',
        payload: login.confirmBooking(pnr, requestPayload)
    }
}

export function mobilePaymentAction(requestPayload) {
    return {
        type: 'MOBIILE_BOOKING',
        payload: login.mobilePayment(requestPayload)
    }
}
export function bookingListAction(requestPayload) {
    return {
        type: 'BOOKING_LIST',
        payload: login.getBookingList(requestPayload)
    }
}
export function bookingDetailsAction(pnr, requestPayload) {
    return {
        type: 'BOOKING_DETAILS',
        payload: login.getBookingDetails(pnr, requestPayload)
    }
}
export function canCancelAction(pnr) {
    return {
        type: 'CAN_CANCEL',
        payload: login.getCancelInfo(pnr)
    }
}
export function cancelBookingAction(pnr, seat_no, mobile) {
    return {
        type: 'CANCEL_BOOKING',
        payload: login.cancelBooking(pnr, seat_no, mobile)
    }
}
export function saveHelpAction(requestPayload) {
    return {
        type: 'SAVE_HELP',
        payload: login.getHelp(requestPayload)
    }
}

