import React from 'react';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();

//screens
import LikeScreen from '../screens/LikeScreen';


const LikedScreenNavigator = () => {
    //options={{headerShown: false}}

    return (
    <Stack.Navigator
        screenOptions={TransitionPresets.SlideFromRightIOS}
    >
        <Stack.Screen name="LikeScreen" component={LikeScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
    );
}

export {LikedScreenNavigator};