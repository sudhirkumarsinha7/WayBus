import axios from 'axios';

export function getCall(url,disableLoader) {
    let token
    console.log(url);
    return axios.get(url)
            .then((res)=>{
                console.log("Response is getCall",res)
                return res
            }).catch((err)=>{
                console.log("err===",err)
            })
}

export function postCall(url,data,disableLoader) {
    let token
    console.log(url)
    return axios.post(url,data)
            .then((res)=>{
                console.log("Response is postCall",res)
                return res
            }).catch((err)=>{
                console.log("err-------",err)
            })
}