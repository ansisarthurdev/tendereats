import { Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'

//components
import Top from '../components/Top'

const LikeScreen = () => {
  return (
    <Container>
        <Top />

        <TopBox>
            <HeadingText>Liked meals (10)</HeadingText>
            <TouchableOpacity onPress={() => getRandomMeals()}>
            </TouchableOpacity>
        </TopBox>


    </Container>
  )
}

const TopBox = styled.View`
margin: 30px auto 30px;
width: 80%;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const HeadingText = styled.Text`
font-size: 24px;
font-weight: bold;
`

const Container = styled.View``

export default LikeScreen