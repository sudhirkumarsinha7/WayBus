import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './homeStack';
import Booking from './bookingStack';
import More from './moreStack';
import Help from './helpStack';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Images, Colors, Fonts, AppStyles } from '../../theme';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

export default function TabbarNavigation() {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Help" component={Help} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}
function MyTabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
  
    if (focusedOptions.tabBarVisible === false) return null;
  
    return (
      <View style={styles.tabbar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
          let iconName = isFocused ? Images[`${route.name}Active`] : Images[`${route.name}Inactive`]
          
          const onPress = () => {
            console.log('pressed');
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };
  
          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };
          return (
            <TouchableOpacity
              activeOpacity = {0.7} 
              key={label}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
            >
              <Image source={iconName} style={styles.tabImage}/>
              <Text style={styles[`tabLabel${isFocused}`]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    tabbar: {
      flexDirection: 'row', 
      backgroundColor: '#fff',
      borderColor:'#dcdcdc',
      borderTopWidth:1,
      height: heightPercentageToDP(9.2),
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: AppStyles.marginHorizontal
    },
    tab: {
      alignItems: 'center',
      paddingHorizontal:10,
    },
    tabImage: { 
      height: widthPercentageToDP(4.6), 
      width: widthPercentageToDP(4.6),
      resizeMode:'contain',
      marginBottom:5
    },
    tabLabeltrue: {
      color: Colors.blueTheme,
      fontSize: Fonts.size.font12,
    },
    tabLabelfalse: {
      color: 'gray',
      fontSize: Fonts.size.font12,
    }
  })