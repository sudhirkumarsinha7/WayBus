const initialState = {
    weatherData: [],
    socialUser: { type: 'error' },
    logoutRes: { type: 'error' },
    logedUser: { type: 'error' },
};

const waybusReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SOCIAL_LOGIN': {
            return { ...state, socialUser: action.payload };
        }
        case 'LOG_OUT': {
            return { ...state, logoutRes: action.payload };
        }
        case 'FETCH_USER_DATA': {
            return { ...state, logedUser: action.payload };
        }
        case 'SEND_OTP': {
            console.log("action", action);
            if (action.payload) {
                console.log("action.res", action.payload)
                let res = action.payload
                return {
                    ...state, res
                };
            } else {
                console.log("resAction");
                return { ...state }
            }
        }
        case 'VERIFY_OTP': {
            if (action.payload) {
                console.log("action.res", action.payload)
                let res = action.payload
                return {
                    ...state, res
                };
            } else {
                console.log("resAction");
                return { ...state }
            }
        }

        default: {
            return {
                ...state,
            };
        }
    }
}
export default waybusReducer