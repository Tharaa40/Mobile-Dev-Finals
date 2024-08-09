import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, StatusBar, ActivityIndicator, TouchableOpacity } from "react-native";
import { Button, PaperProvider, Text, Modal, Portal, Card, FAB, Checkbox } from "react-native-paper";
import CachedImage from "../components/image";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import YoutubeIframe from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DetailsScreen(props){
    let item = props.route.params;

    const [isFavourite, setIsFavourite] = useState(false);
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const [instModal, setInstModal] = useState(false);
    const [checked, setChecked] = useState(false);
    
    
    const navigation = useNavigation();
    

    useEffect(() => {
        console.log('Fetching meal data for ID:', item.idMeal); 
        getMealData(item.idMeal);
        checkIfFavourite(item.idMeal);
        // loadCheckboxState();
    }, []);

    useEffect(() => {
        if(meal){
            loadCheckboxState();
        }
    }, [meal]);


    const getMealData = async(id) => { 
        try{
            // setLoading(true);
            // setSelectedCategory(category);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            if(response && data){
                setMeal(data.meals[0]);
                setLoading(false);
            }
            console.log ('API Response:', data);
        }catch(error){
            console.error('Error fetching meal data:', error);
            // setLoading(false);
        }

    }; 

    const ingredientsIndexes = (meal) => {
        if(!meal){
            return [];
        }
        var indexes = [];
        for (var i=1; i<=20; i++){
            if(meal ['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if(match && match[1]){
            return match[1];
        }
        return null;
    };

    const splitInstructions = (instructions) => {
        if(!instructions){
            return[];
        }
        return instructions.split(/(?:\. |(?:\r\n|\r|\n))/).filter(sentence => sentence.trim() !== '');
    };

    const checkIfFavourite = async(id) => {
        try{
            const favourites = await AsyncStorage.getItem('favourites');
            if(favourites){
                const favouriteList = JSON.parse(favourites);
                setIsFavourite(favouriteList.includes(id));
            }
        }catch (error){
            console.error('Error checking favourite status:', error);
        }
    };

    const toggleFavourite = async(id) => {
        try{
            let favourites = await AsyncStorage.getItem('favourites');
            let favouriteList = favourites ? JSON.parse(favourites) : [];
            if (favouriteList.includes(id)) {
                favouriteList = favouriteList.filter(favId => favId !== id);
            } else {
                favouriteList.push(id);
            }
            await AsyncStorage.setItem('favourites', JSON.stringify(favouriteList));
            setIsFavourite(!isFavourite);
        }catch(error){
            console.error('Error toggling favourite status:', error);
        }
    };


    const loadCheckboxState = async() => {
        try{
            const value = await AsyncStorage.getItem(`checked_${meal.idMeal}`);
            if(value !== null){
                setChecked(JSON.parse(value));
            }
        }catch(error){
            console.error('Error loading checkbox state:', error);
        }
    };

    const handleCheckboxPress = async() => {
        try{
            const newCheckedState = !checked;
            setChecked(newCheckedState);
            await AsyncStorage.setItem(`checked_${meal.idMeal}`, JSON.stringify(newCheckedState));
        }catch(error){
            console.error('Error saving checkbox state:', error);
        }
    };


    


    


    return(
        <PaperProvider>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 30}}
            >
                <StatusBar 
                    backgroundColor='navy'
                    animated={true}            
                />

                {/**recipe image */}
                <View style={styles.imageContainer}>
                    <CachedImage
                        uri= { item.strMealThumb }
                        style={styles.image}
                    />
                    <Icon
                        name="arrow-left-circle-outline"
                        size={30}
                        style={styles.backIcon}
                        onPress={() => navigation.goBack()}
                    />
                    <Icon
                        name={isFavourite ? "heart" : "heart-outline"}
                        size={30}
                        style={styles.heartIcon}
                        // onPress={() => setIsFavourite(!isFavourite)}
                        onPress={() => toggleFavourite(item.idMeal)}
                        color={isFavourite? 'red': 'white'}
                    />
                </View>

                {/** meal desc */}
                {
                   loading?(
                        <ActivityIndicator animating={true} size="large" style={styles.loader} />
                    ): (
                        <View style={styles.detailsContainer}>
                            {/**1st - recipe name, clock and kcal */}
                            <View> 
                                <Text variant="headlineSmall"> {meal?.strMeal} </Text>
                                <View style={styles.misc}>
                                    <View style={styles.infocontainer}>
                                        <Icon
                                            name="silverware"
                                            size={27}
                                        />
                                        <Text>{meal?.strCategory}</Text>
                                    </View>
                                    <View style={styles.infocontainer}>
                                        <Icon
                                            name="earth"
                                            size={27}
                                        />
                                        <Text>{meal?.strArea}</Text>
                                    </View>
                                    {meal?.strTags && (
                                        <View style={styles.infocontainer}>
                                            <Icon
                                                name="tag"
                                                size={27}
                                            />
                                            <Text> {meal?.strTags.split(',').join(',')} </Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            {/**2nd - instructions*/}
                            <Portal>
                                <Modal
                                    visible={instModal}
                                    onDismiss={() => setInstModal(false)}
                                    contentContainerStyle={styles.InstModalContainer}
                                >
                                    <ScrollView>
                                        <Text variant="headlineSmall"> Instructions </Text>
                                        {splitInstructions(meal?.strInstructions).map((instruction, index) => (
                                            <View key={index} style={styles.instructionContainer}>
                                                <Text> {index+1}.{instruction.trim()} </Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={checked? 'checked': 'unchecked'}
                                            // onPress={() => setChecked(!checked)}
                                            onPress={handleCheckboxPress}
                                        />
                                        <Text> I made this recipe </Text>
                                    </View>
                                </Modal>
                            </Portal>
                            <FAB
                                style={styles.fab}
                                icon='plus'
                                onPress={() => setInstModal(true)}
                            />
                            {/* <View>
                                <Text variant="headlineSmall"> Instructions</Text>
                                {splitInstructions(meal?.strInstructions).map((instruction, index) => (
                                    <View key={index} style={styles.instructionContainer}>
                                        <Text>{index+1}.{instruction.trim()}</Text>
                                    </View>
                                ))} */}
                                {/* <Text> {meal?.strInstructions} </Text> */}
                            {/* </View> */}

                            {/**3rd - ingredients */}
                            <View>
                                <Text variant="headlineSmall"> Ingredients</Text>
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return(
                                            <View key={i} style={styles.ingredientsList}>
                                                <View style={styles.ingredientContainer}>
                                                    <Text style={styles.ingredientsText}>{meal['strIngredient'+ i]}</Text>
                                                    <Text style={styles.measurementText}>{meal['strMeasure'+ i]}</Text>
                                                </View>

                                            </View>
                                        )
                                    })
                                }
                            </View>

                            {/**Button to youtube */}
                            {
                                meal.strYoutube && (
                                    <View>
                                        <Button mode="elevated" onPress={() => setModalVisible(true)}>Start cooking</Button>

                                        <Portal>
                                            <Modal
                                                visible={modalVisible}
                                                onDismiss={() => setModalVisible(false)}
                                                contentContainerStyle={styles.modalContainer}
                                            >
                                                <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
                                                <Card style={styles.modalContent}>
                                                    <Card.Content>
                                                        <YoutubeIframe
                                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                                            height={200}
                                                            width="100%"
                                                        />
                                                    </Card.Content>
                                                </Card>
                                            </Modal>
                                        </Portal>
                                    </View>

                                )
                            }

                        </View>
                   )
                }
                
                

                

            </ScrollView>
        </PaperProvider>

    );

}

const styles = StyleSheet.create({
    imageContainer:{
        position: 'relative',
        width: '100%',
        height: 400, // Adjust based on your needs
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        // height: 400, 
        // borderRadius: 60, 
        borderTopLeftRadius:0, 
        borderTopRightRadius:0
    },
    backIcon:{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
        color: 'white', // Adjust the color if needed
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add background for better visibility
        // borderRadius: 10,
        padding: 5,
    },
    heartIcon:{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        // Adjust the color if needed
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add background for better visibility
        // borderRadius: 10,
        padding: 5,
    },
    misc:{
        flexDirection:'row',
        alignItems: 'center',
        marginTop: 8,
    },
    infocontainer:{
        flexDirection: 'row',
        alignItems:'center',
        marginHorizontal: 10
    },
    instructionContainer:{
        marginVertical: 5,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 1
    },
    InstModalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        maxHeight: '70%'
    },
    instructionContainer: {
        marginVertical: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },



    ingredientsList: {
        marginTop: 16,
    },
    ingredientContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        // flexDirection: 'row',
        // marginVertical: 5,  
        // marginHorizontal: '10%',
        // textAlign: 'center'    
    },
    ingredientText: {
        fontSize: 16,
        marginRight: 8,
        color: '#555',
    },
    measurementText: {
        fontSize: 16,
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
})