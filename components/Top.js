import React from 'react'
import styled from 'styled-components/native'
import { StatusBar, TouchableOpacity } from 'react-native';

const Top = () => {

  return (
    <Container>
      <Header source={require('../images/tendereats.png')}/>
    </Container>
  )

}

const Header = styled.Image`
width: 250px;
height: 30px;
object-fit: contain;
margin: 0 auto;
`

const Container = styled.View`
margin-top: ${StatusBar.currentHeight}px;
padding-top: 30px;
`

export default Top