import React from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'react-native';
import { vw } from 'react-native-expo-viewport-units'

const Top = () => {

  return (
    <Container>
      <Header style={{width: vw(40)}} source={require('../images/tendereats.png')}/>
    </Container>
  )

}

const Header = styled.Image`
//width: 250px;
height: 30px;
object-fit: contain;
margin: 0 auto;
`

const Container = styled.View`
margin-top: ${StatusBar.currentHeight}px;
padding-top: 20px;
background: #F5F7F9;
`

export default Top