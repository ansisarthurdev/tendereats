import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity, Linking } from 'react-native'
import { vh } from 'react-native-expo-viewport-units'
import { useIsFocused } from '@react-navigation/native';

//icons
import { Ionicons, Feather, AntDesign, Entypo } from '@expo/vector-icons'

//redux
import { useSelector } from 'react-redux'
import { selectPreview } from '../app/appSlice'

//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreviewMeal = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const meal = useSelector(selectPreview);
    //console.log(meal);
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [measure, setMeasure] = useState([]);
    const [likedMeals, setLikedMeals] = useState([]);

    const removeMealFromLiked = () => {
        const updatedLikedMeals = likedMeals;
        const filteredLikedMeals = updatedLikedMeals.filter(filterMeal => filterMeal?.idMeal !== meal?.idMeal)
        AsyncStorage.setItem('likedMeals', JSON.stringify(filteredLikedMeals))
        navigation.navigate('LikeScreen');
    }

    //get all meals from storage in case of deleting this meal
    useEffect(() => {
        AsyncStorage.getItem('likedMeals')
        .then(res => res !== null ? setLikedMeals(JSON.parse(res)) : setLikedMeals([]))
    }, [isFocused])

    //set tags
    useEffect(() => {
        let tagsArr = meal?.strTags?.split(",");
        setTags(tagsArr);
    }, [meal])

    //filter ingredients & measure
    useEffect(() => {
        if(meal?.length !== 0){
            const mealObj = Object.entries(meal);
            const ingredientsArray = mealObj.filter(([key, value]) => key.startsWith('strIngredient')).map(([key, value]) => value)
            const measureArray = mealObj.filter(([key, value]) => key.startsWith('strMeasure')).map(([key, value]) => value)
            setIngredients(ingredientsArray);
            setMeasure(measureArray);
        }
    }, [meal])

  return (
    <Container>
        <StatusBar translucent={true} backgroundColor={'transparent'} style="dark" />

        <Top style={{height: vh(25)}}>
            <TopImage source={{uri: meal?.strMealThumb}}/>
            <TopShadow />
            <TouchableOpacity style={{position: 'absolute', top: 40, left: 30}} onPress={() => navigation.navigate('LikeScreen')}>
                <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
        </Top>

        <MealInformation style={{height: vh(75)}}>
            <Text style={{fontSize: 26, fontWeight: 'bold', marginTop: 20}}>{meal?.strMeal}</Text>
            <MealCategory>
                <Text style={{fontSize: 16, color: 'gray', marginRight: 10}}>{meal?.strArea},</Text>
                <Text style={{fontSize: 16, color: 'gray'}}>{meal?.strCategory}</Text>
            </MealCategory>

            <MealTags>
                {tags && tags?.map(tag => <MealTag key={tag}>{tag}</MealTag>)}
            </MealTags>

            <Text style={{fontSize: 20, marginTop: 20, marginBottom: 10, fontWeight: 'bold'}}>Ingredients & Measurements</Text>
            <MealIngredients>
                <Ingredients>
                    {ingredients?.map(ing => <Text key={ing} style={{fontSize: 18}}>{ing}</Text>)}
                </Ingredients>

                <Measure>
                    {measure?.map(mea => <Text key={mea} style={{fontSize: 18}}>{mea}</Text>)}
                </Measure>
            </MealIngredients>

            <MealInstructions>
                <Text style={{fontSize: 20, marginBottom: 10, fontWeight: 'bold'}}>Instructions</Text>
                <Text style={{fontSize: 18}}>{meal?.strInstructions}</Text>     
            </MealInstructions>
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{flexDirection: 'row', backgroundColor: '#0EAC6E', color: 'white', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', marginVertical: 20, padding: 10, paddingHorizontal: 20, borderRadius: 10, marginRight: 10}}>
            <Text style={{color: 'white', marginRight: 10, position: 'relative', top: 2}} onPress={() => {Linking.openURL(`${meal?.strYoutube}`);}}>YouTube</Text><AntDesign name="youtube" size={24} color="white" />
            </Button>

            <Button style={{flexDirection: 'row', backgroundColor: '#0EAC6E', color: 'white', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', marginVertical: 20, padding: 10, paddingHorizontal: 20, borderRadius: 10}}>
            <Text style={{color: 'white', marginRight: 10, position: 'relative', top: 2}} onPress={() => {Linking.openURL(`${meal?.strSource}`);}}>Source</Text><Feather name="external-link" size={24} color="white" />
            </Button>
            </View>

            <TouchableOpacity onPress={() => removeMealFromLiked()}>
                <Button style={{flexDirection: 'row', backgroundColor: '#DC3545', color: 'white', textAlign: 'center', alignSelf: 'center', justifyContent: 'center', marginVertical: 20, padding: 10, paddingHorizontal: 20, borderRadius: 10}}>
                <Text style={{color: 'white', marginRight: 10, position: 'relative', top: 2}}>Remove from liked</Text><Entypo name="cross" size={24} color="white" />
                </Button>
            </TouchableOpacity>

            <EmptySpace />
        </MealInformation>
       
    </Container>
  )
}

const View = styled.View``

const Button = styled.View``

const EmptySpace = styled.View`
width: 100%;
height: 150px;
`

const MealInstructions = styled.View``

const Measure = styled.View``

const Ingredients = styled.View`
margin-right: 20px;
`

const MealIngredients = styled.View`
flex-direction: row;
margin-bottom: 30px;
`

const MealTag = styled.Text`
margin: 0 10px 10px 0;
padding: 5px 8px;
border-radius: 10px;
background: #0EAC6E;
color: white;
`

const MealTags = styled.View`
flex-direction: row;
flex-wrap: wrap;
margin: 10px 0;
`

const MealCategory = styled.View`
flex-direction: row;
`

const MealInformation = styled.ScrollView`
position: relative;
width: 90%;
margin: 0 auto;
`

const Text = styled.Text``

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
height: 100%;
`
const Container = styled.View`
background: #F5F7F9;
`

export default PreviewMeal