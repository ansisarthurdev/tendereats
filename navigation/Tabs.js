import React from 'react'
import styled from 'styled-components/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dimensions } from 'react-native'

//screens
import SwipeScreen from '../screens/SwipeScreen'
import { LikedScreenNavigator } from '../navigation/LikedStack'

//icons
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const navLineWidth = `${windowWidth / 6}px`;
 
const Tab = createBottomTabNavigator();

const Tabs = () => {

    //options={{headerShown: false}}

    return (
    <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { 
                backgroundColor: 'white',
                borderRadius: 50,
                height: 60,
                position: 'absolute',
                bottom: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                overflow: 'hidden'
            },
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={SwipeScreen}
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused && <TopNav />}
                        {focused ? <Ionicons name="compass" size={28} color="#0EAC6E" /> : <Ionicons name="compass-outline" size={28} color="gray" />}
                    </Container>
                ),
                headerShown: false,
            }}
        />

        <Tab.Screen 
            name="Like" 
            component={LikedScreenNavigator} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused && <TopNav />}
                        {focused ? <Ionicons name="bookmark" size={28} color="#0EAC6E" /> : <Ionicons name="bookmark-outline" size={28} color="gray" />}
                    </Container>
                ),
                headerShown: false
            }}
        />

        <Tab.Screen 
            name="Info" 
            component={SwipeScreen} 
            options={{
                tabBarIcon: ({focused}) => (
                    <Container>
                        {focused && <TopNav />}
                        {focused ? <Ionicons name="information-circle" size={28} color="#0EAC6E" /> : <Ionicons name="information-circle-outline" size={28} color="gray" />}
                    </Container>
                ),
                headerShown: false
            }}
        />
    </Tab.Navigator>
  );
}

export default Tabs;

const TopNav = styled.View`
position: absolute;
top: -90px;
width: ${navLineWidth};
height: 100px;
border-radius: 30px;
background: #0EAC6E;
`

const Container = styled.View`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
`
const Text = styled.Text``