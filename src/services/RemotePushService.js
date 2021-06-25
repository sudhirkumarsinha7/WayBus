import React, { useEffect } from 'react'
import { Platform } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info';
var qs = require('qs');
import { postCall } from '../api/helper';
import { APIURL } from '../api/apiUrl';


const RemotePushService = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister: function (data) {
        let brandName = DeviceInfo.getBrand();
        let modelName = DeviceInfo.getModel();
        let deviceName = DeviceInfo.getDeviceId();
        var reqParamsRaw = {
          token_id: data.token,
          device_type: Platform.OS,
          manufacturer: brandName,
          model_number: modelName + ' | ' + deviceName,
        };
        console.log(reqParamsRaw);
        var reqParams = qs.stringify(reqParamsRaw);

        postCall(APIURL.registerDevice, reqParams); 
      },
      onNotification: function (notification) {
        PushNotification.localNotification(notification);
        if (Platform.OS === "ios") {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      onAction: function (notification) {
       // console.log("ACTION:", notification.action);
       // console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function (err) {
        console.log("Not Registered:" + err.message);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Android only: GCM or FCM Sender ID
      senderID: '961099642355',
      popInitialNotification: true,
      requestPermissions: true
    })
  }, [])
  return null
}
export default RemotePushService;
