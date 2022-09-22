import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { useIsFocused } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core'

//components
import Top from '../components/Top'

const LikeScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [likedMeals, setLikedMeals] = useState([]);

  const loadData = () => {
    AsyncStorage.getItem('likedMeals')
    .then(res => res !== null ? setLikedMeals(JSON.parse(res)) : setLikedMeals([]))
  };

  useEffect(() => {
    loadData(); //load data from storage
    //AsyncStorage.clear();
  }, [isFocused])

  return (
    <Container>
        <Top />

        <TopBox><HeadingText style={{fontSize: vw(4)}}>Liked meals ({likedMeals?.length})</HeadingText></TopBox>

            <MealItems>
                {likedMeals.map(meal => (
                  <TouchableOpacity style={{width: vw(90)}} key={meal?.idMeal} onPress={() => navigation.navigate('PreviewMeal')}>
                  <MealItem>
                    <MealImage source={{uri: meal?.strMealThumb}}/>
                    <MealInformation>
                      <MealName>{meal?.strMeal}</MealName>
                      <MealCategory>{meal?.strCategory}</MealCategory>
                    </MealInformation>
                  </MealItem>
                  </TouchableOpacity>
                ))}
                <EmptySpace />
            </MealItems>

    </Container>
  )
}

const EmptySpace = styled.View`
width: 100%;
height: 250px;
`

const MealCategory = styled.Text`
color: white;
font-size: 20px;
`

const MealName = styled.Text`
color: white;
font-size: 20px;
max-width: 80%;
`

const MealInformation = styled.View`
position: absolute;
flex-direction: row;
justify-content: space-between;
align-items: center;
background: #0EAC6E;
width: 100%;
padding: 5px 10px;
bottom: 0;
`

const MealImage = styled.Image`
width: 100%;
height: 100%;
`


const MealItem = styled.View`
height: 200px;
margin-bottom: 10px;
` 

const MealItems = styled.ScrollView`
margin: 0 auto;
position: relative;
height: 100%;
`

const TopBox = styled.View`
margin: 30px auto 30px;
width: 80%;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const HeadingText = styled.Text`
font-weight: bold;
`

const Container = styled.View``

export default LikeScreen