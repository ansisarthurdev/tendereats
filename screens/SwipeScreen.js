import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { vh } from 'react-native-expo-viewport-units'

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
    const [direction, setDirection] = useState(null);

    //already swiped meals
    let swipedMeals = [];
    
    //how many meals to get on start
    const startItemsCount = 10;

    const fetchData = () => {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = Object.fromEntries(Object.entries(data.meals[0]).filter(([_, v]) => v != null || ''));
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

    //card swiping --start
    const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
    setDirection(direction);
    }
    
    const onCardLeftScreen = (meal) => {
        const mealObj = JSON.parse(meal);
        swipedMeals.push(mealObj);
        if(direction === 'right'){
            console.log('save item...');
        }
        //console.log(`swiped: ${swipedMeals?.length} generated: ${randomMeals?.length}`)
        swipedMeals?.length === randomMeals?.length && setCleared(true);
    }
    //card swiping --end

    //get data when opening screen 
    const getRandomMeals = () => {
        setCleared(false);
        setLoading(true); // load state
        setRandomMeals([]); //clear the generated list
        swipedMeals = []; //clear the swiped list


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
        //get random items on first load
        if(randomMeals?.length === 0){
            getRandomMeals();
        }
    }, [])

  return (
    <Container>
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
        <Top />

        <TopBox>
            <HeadingText>Browse</HeadingText>
            <TouchableOpacity onPress={() => getRandomMeals()}>
            <Ionicons name="reload" size={32} color="#0EAC6E" />
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
        <TinderCard key={item?.idMeal} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen(JSON.stringify(item))} preventSwipe={['up', 'down']}>
            <SwipeCard style={[styles.swipeCard, {height: vh(70)}]}>
                <MealImage source={{uri: item?.strMealThumb}} /> 
                <WrapCenter>
                <Buttons>
                    <TouchableOpacity onPress={() => console.log('hi')}>
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
      elevation: 3,
    },
    btn: {
        elevation: 10
    }
  })

const AnimationText = styled.Text`
font-size: 22px;
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
width: 250px;
height: 250px;
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
font-size: 35px;
font-weight: bold;
`

const CenterCardContainer = styled.View`
display: flex;
width: 80%;
margin: 0 auto;
align-items: center;
justify-content: center;
`

const CardContainer = styled.View`
width: 100%;
max-width: 480px;
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
width: 40%;
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
max-width: 480px;

`

const Text = styled.Text``

const Container = styled.View`
background: #F5F7F9;
height: 100%;
`

export default SwipeScreen