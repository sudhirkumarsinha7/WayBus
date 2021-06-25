import axios from 'axios';
var config = {
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data',
    },
  };
export function getCall(url,disableLoader) {
    let token
    console.log(url);
    return axios.get(url).then((res)=>{
                //console.log("Response is getCall",res)
                return res
            }).catch((err)=>{
                console.log("err===",err)
            })
}
export function postCall(url, data, disableLoader) {
    let token
    console.log(url);
    return axios.post(url, data).then((res)=>{
       console.log("Response is postCall", res)
        return res
    }).catch((err)=>{
        console.log("err-------",err)
        return err.response;
    })
}
export function putCall(url, data, disableLoader) {
    let token
    console.log(url);
    return axios.put(url, data).then((res)=>{
      // console.log("Response is putCall", res)
        return res
    }).catch((err)=>{
        //console.log("err-------",err)
        return err.response;
    })
}
export function postCallFd(url, data, disableLoader) {
    let token
    console.log(url);
    return axios.post(url, data, config).then((res)=>{
       //console.log("Response is postCall", res)
        return res
    }).catch((err)=>{
        //console.log("err-------", err)
        return err.response;
    })
}