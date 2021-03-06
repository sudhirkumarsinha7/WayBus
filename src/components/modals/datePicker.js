import React from 'react';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Appearance } from 'react-native-appearance';
const colorScheme = Appearance.getColorScheme()
/** 
        *  This function return date time picker modal.
     */
const DateTimePickerModal = (props) => {
    const { isDateTimePickerVisible, handleDatePicked, hideDateTimePicker, newDate, minDate, maxDate } = props
    return (
        <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDatePicked}
            onCancel={hideDateTimePicker}
            isDarkModeEnabled={colorScheme === 'dark'}
            date={newDate}
            minimumDate={minDate}  //{new Date(moment(minDate, 'DD/MM/YYYY').format('YYYY/MM/DD'))}
            maximumDate={maxDate} //new Date(moment(maxDate, 'DD/MM/YYYY').format('YYYY/MM/DD'))
          />
    );
}

export default DateTimePickerModal;