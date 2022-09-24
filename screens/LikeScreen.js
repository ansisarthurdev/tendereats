import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units'
import { useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native'
import { FontAwesome } from '@expo/vector-icons';

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

  const [searchTxt, setSearchTxt] = useState('');
  const [likedMealsFiltered, setLikedMealsFiltered] = useState([]);

  const loadData = () => {
    AsyncStorage.getItem('likedMeals')
    .then(res => res !== null ? setLikedMeals(JSON.parse(res)) : setLikedMeals([]))
  };
  
  useEffect(() => {
    loadData(); //load data from storage
    //AsyncStorage.clear();
  }, [isFocused])

  useEffect(() => {
    //filter by searchtxt
    const filtered = likedMeals.filter(meal => meal?.strMeal?.startsWith(searchTxt));
    setLikedMealsFiltered(filtered);
  }, [searchTxt])

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
        
        <SearchBox>
          <FontAwesome name="search" size={24} color="white" style={{position: 'absolute', top: 10, left: 10}}/>
          <SearchBar defaultValue={searchTxt} onChangeText={value => setSearchTxt(value)} placeholder="Search meal" placeholderTextColor="white"/>
        </SearchBox>

        {searchTxt ?<>
        <MealItems>
        {likedMealsFiltered.map(meal => (
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
        <EmptySpace style={{height: vh(35)}}/>
        </MealItems></>
        : <>
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
          <EmptySpace style={{height: vh(35)}}/>
        </MealItems>
        </>}
        
        

        </>}
    </Container>
  )
}

const Text = styled.Text``

const SearchBox = styled.View`
background: #0EAC6E;
width: 90%;
margin: 0 auto 20px;
position: relative;
padding: 10px 20px 10px 50px;
`

const SearchBar = styled.TextInput`
font-size: 18px;
color: white;

`

const AnimationText = styled.Text`
font-size: 18px;
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
`

const MealCategory = styled.Text`
color: white;
font-size: 18px;
opacity: .7;
`

const MealName = styled.Text`
color: white;
font-size: 18px;
max-width: 80%;
font-weight: bold;
`

const MealInformation = styled.View`
position: absolute;
flex-direction: row;
justify-content: space-between;
align-items: center;
background: #0eac6ea1;
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