import React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native'

//icons
import { Ionicons } from '@expo/vector-icons';

const PreviewMeal = () => {
    const navigation = useNavigation();

  return (
    <Container>
        <StatusBar translucent={true} backgroundColor={'transparent'} style="dark" />

        <Top>
            <TopImage source={{uri: 'https://www.themealdb.com/images/media/meals/xusqvw1511638311.jpg'}}/>
            <TopShadow />
            <TouchableOpacity style={{position: 'absolute', top: 40, left: 30}} onPress={() => navigation.navigate('LikeScreen')}>
                <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
        </Top>

    </Container>
  )
}

const Top = styled.View`
position: relative;
`

const TopShadow = styled.View`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: black;
opacity: .2;
`

const TopImage = styled.Image`
width: 100%;
height: 350px;
`
const Container = styled.View``

export default PreviewMeal