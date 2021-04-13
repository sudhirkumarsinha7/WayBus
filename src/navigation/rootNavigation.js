/**
 * Used if unable to get navigation prop.
 */
import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

export function goBack() {
  navigationRef.current.goBack();
}

export function resetStack(whichStack){
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: whichStack }],
    }),
  );
};