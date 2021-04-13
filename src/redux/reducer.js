const initialState = {
    weatherData:[]
};

const waybusReducer=(state=initialState, action)=>{
    switch (action.type) {
        case 'SEND_OTP':{
            console.log("action",action);
            if(action.payload) {
                console.log("action.res",action.payload)
                let res=action.payload
                return {
                    ...state,res
                };
            }else{
                console.log("resAction");
                return { ...state}
            }
        }
        case 'VERIFY_OTP':{
            if(action.payload) {
                console.log("action.res",action.payload)
                let res=action.payload
                return {
                    ...state,res
                };
            }else{
                console.log("resAction");
                return { ...state}
            }
        }
        default:{
            return {
                ...state,
            };
        }
    }
}
export default waybusReducer