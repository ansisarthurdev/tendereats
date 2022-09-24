import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { vw } from 'react-native-expo-viewport-units'
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core'

//components
import Top from '../components/Top'

//redux
import { useDispatch } from 'react-redux'
import { setPreview } from '../app/appSlice'

const LikeScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [likedMeals, setLikedMeals] = useState([]);
  const dispatch = useDispatch();

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

        {likedMeals?.length === 0 ? 
        <>
        <AnimationContainerCentered>
            <AnimationContainer>
                <LottieView source={require('../assets/recipe.json')} autoPlay loop={false} style={{width: '100%', height: '100%'}}/>
            </AnimationContainer>
            <AnimationText>Start browsing meals to fill your recipe list!</AnimationText>
        </AnimationContainerCentered>
        </> 
        : <>
        <TopBox><HeadingText style={{fontSize: vw(4)}}>Liked meals ({likedMeals?.length})</HeadingText></TopBox>

        <MealItems>
            {likedMeals.map(meal => (
              <TouchableOpacity style={{width: vw(90)}} key={meal?.idMeal} onPress={() => {navigation.navigate('PreviewMeal'); dispatch(setPreview(meal));}}>
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
        </>}
    </Container>
  )
}

const AnimationText = styled.Text`
font-size: 22px;
text-align: center;
margin-top: 20px;
`

const AnimationContainerCentered = styled.View`
width: 100%;
height: 90%;
justify-content: center;
align-items: center;
`

const AnimationContainer = styled.View`
width: 250px;
height: 250px;
justify-content: center;
align-items: center;
` 

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

const Container = styled.View`
background: #F5F7F9;
`

export default LikeScreen