import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { vh, vw } from 'react-native-expo-viewport-units'
import { useIsFocused } from '@react-navigation/native';

//components
import Top from '../components/Top'
import TinderCard from 'react-tinder-card'
import LottieView from 'lottie-react-native'

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//icons
import { Ionicons, AntDesign } from '@expo/vector-icons'

const SwipeScreen = () => {

    //getting data
    const [randomMeals, setRandomMeals] = useState([]);
    const [randomMealIndex, setRandomMealIndex] = useState(0);
    const [loading, setLoading] = useState();
    const [cleared, setCleared] = useState(false);

    const isFocused = useIsFocused();
    let direction = null;

    //liked meals
    const [likedMeals, setLikedMeals] = useState([]);

    //already swiped meals
    let swipedMeals = [];
    
    //how many meals to get on start
    const startItemsCount = 10;

    const fetchData = () => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = Object.fromEntries(Object.entries(data.meals[0]).filter(([_, v]) => v != null && v?.length != 0 && v != " "));
            //console.log(meal)
            //check if the meal isn't already on the list
            const mealCheck = randomMeals.findIndex(obj => obj?.idMeal === meal?.idMeal) !== -1;
            
            //add index to generated items to check if its finished
            setRandomMealIndex(prev => prev + 1);

            //if meal isn't on the list - add it
            if(!mealCheck){
                setRandomMeals(current => [...current, meal]);
            }
        })
    }

    //get data from storage
    const getDataFromStorage = () => {
        AsyncStorage.getItem('likedMeals')
        .then(res => res !== null ? setLikedMeals(JSON.parse(res)) : setLikedMeals([]))
    }

    //card swiping --start
    const onSwipe = (cardDirection) => {
    //console.log('You swiped: ' + cardDirection)
    direction = cardDirection;
    }
    
    const onCardLeftScreen = (meal) => {
        swipedMeals.push(meal);

        if(direction === 'right'){
            let likedMealsLocal = likedMeals;
            likedMealsLocal.unshift(meal);

            const jsonStorageMeals = JSON.stringify(likedMealsLocal); //swap json to string
            AsyncStorage.setItem('likedMeals', jsonStorageMeals); // update db

            direction = null; //reset direction
        }

        swipedMeals?.length === randomMeals?.length && setCleared(true);
    }
    //card swiping --end

    //get data when opening screen 
    const getRandomMeals = () => {
        for(let i = 0; i < startItemsCount; i++){
            fetchData();
        }
    }
    
    useEffect(() => {
        //if meals have loaded, show cards
        if(randomMealIndex === startItemsCount){
            setLoading(false);
            setRandomMealIndex(0); //reset index
        }
    }, [randomMealIndex])

    useEffect(() => {
        setCleared(false);
        setLoading(true); // load state
        setRandomMeals([]); //clear the generated list
        swipedMeals = []; //clear the swiped list
        //get random items on first load
        getRandomMeals();
        getDataFromStorage();
    }, [isFocused])

  return (
    <Container>
        <StatusBar translucent={true} backgroundColor={'transparent'} style="dark" />
        <Top />

        <TopBox>
            <HeadingText style={{fontSize: vw(6)}}>Browse</HeadingText>
            <TouchableOpacity onPress={() => getRandomMeals()}>
            <Ionicons name="reload" size={28} color="#0EAC6E" />
            </TouchableOpacity>
        </TopBox>

        <CenterCardContainer>
        <CardContainer>
        {loading ? 
        <AnimationContainerCentered>
            <AnimationContainer>
                <LottieView source={require('../assets/cooking.json')} autoPlay loop style={{width: '100%', height: '100%'}}/>
            </AnimationContainer>
            <AnimationText>Getting meals ready...</AnimationText>
        </AnimationContainerCentered>
        : 
        <>{randomMeals.map(item => (
        <TinderCard key={item?.idMeal} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(item)} preventSwipe={['up', 'down']}>
            <SwipeCard style={[styles.swipeCard, {height: vh(70)}]}>
                <MealImage source={{uri: item?.strMealThumb}} /> 
                <WrapCenter>
                <Buttons>
                    <TouchableOpacity>
                        <LikeBtn style={styles.btn} >
                            <Ionicons name="heart-dislike" size={28} color="rgb(233,9,78)" />
                        </LikeBtn>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <DislikeBtn style={styles.btn}>
                            <AntDesign name="heart" size={28} color="white" />
                        </DislikeBtn>
                    </TouchableOpacity>
                </Buttons>
                </WrapCenter>
            </SwipeCard>
        </TinderCard>
        ))}
        {cleared &&
        <AnimationContainerCentered>
            <AnimationContainer>
                <LottieView source={require('../assets/empty.json')} autoPlay loop style={{width: '100%', height: '100%'}}/>
            </AnimationContainer>
            <AnimationText>Uh oh, it looks like you cleared the meal list! Tap refresh to load more!</AnimationText>
        </AnimationContainerCentered>
        }</>}
        </CardContainer>
        </CenterCardContainer>

    </Container>
  )
}

const styles = StyleSheet.create({
    swipeCard: {
        elevation: 2,
    },
    btn: {
        elevation: 10
    }
  })

const AnimationText = styled.Text`
font-size: 18px;
text-align: center;
margin-top: 20px;
`

const AnimationContainerCentered = styled.View`
width: 100%;
height: 100%;
justify-content: center;
align-items: center;
`

const AnimationContainer = styled.View`
width: 180px;
height: 180px;
justify-content: center;
align-items: center;
` 
  
const TopBox = styled.View`
margin: 20px auto 30px;
width: 80%;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const HeadingText = styled.Text`
font-weight: bold;
`

const CenterCardContainer = styled.View`
display: flex;
width: 85%;
margin: 0 auto;
align-items: center;
justify-content: center;
`

const CardContainer = styled.View`
width: 100%;
max-width: 550px;
height: 700px;
`

const WrapCenter = styled.View`
width: 100%;
position: absolute;
bottom: 40px;
justify-content: center;
align-items: center;
`

const DislikeBtn = styled.View`
background: #0EAC6E;
padding: 15px;
border-radius: 50px;
`

const LikeBtn = styled.View`
background: white;
padding: 15px;
border-radius: 50px;
`

const Buttons = styled.View`
display: flex;
flex-direction: row;
width: 70%;
justify-content: space-between;
align-items: center;
z-index: 100;
`

const MealImage = styled.Image`
height: 100%;
width: 100%;
object-fit: cover;
border-radius: 20px;
`

const SwipeCard = styled.View`
border-radius: 20px;
position: absolute;
background-color: #fff;
width: 100%;
max-width: 550px;
`

const Text = styled.Text``

const Container = styled.View`
background: #F5F7F9;
height: 100%;
`

export default SwipeScreen