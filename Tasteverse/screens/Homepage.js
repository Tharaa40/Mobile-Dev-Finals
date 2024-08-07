import React, { useState, useEffect, act } from "react";
import { ScrollView, View, StatusBar, StyleSheet, Pressable, Image, FlatList, Dimensions, TouchableOpacity, Modal } from "react-native";
import { PaperProvider, Appbar, Avatar, Text, 
        Searchbar, FAB, Button, Card, Checkbox, 
        ActivityIndicator, IconButton, Dialog, Portal, RadioButton
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from '@react-native-seoul/masonry-list';
import HomeCategories from "../components/categories";
import HomeRecipes from "../components/recipes";


export default function HomeScreen(){
    const [searchQuery, setSearchQuery] = useState(''); 
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryMeals, setCategoryMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterType, setFilterType] = useState(''); //area or ingredient
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchCategoryMeals('Beef');
    }, []);


    const fetchCategories = async() => { //working
        try{
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
            const data = await response.json();
            setCategories(data.categories);
        }catch(error){
            console.error(error);
        }

    };


    const fetchCategoryMeals = async(category) => { //working
        try{
            setLoading(true);
            setSelectedCategory(category);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            setCategoryMeals(data.meals);
            setLoading(false);
        }catch(error){
            console.error(error);
            setLoading(false);
        }

    }; 

    const fetchSearchResults = async (query) => { //working
        try{
            setLoading(true);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            const data = await response.json();
            setCategoryMeals(data.meals);
            setLoading(false);
        }catch(error){
            console.error(error);
            setLoading(false);
        }
    };


    const fetchAreas = async() => {
        try{
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
            const data = await response.json();
            setAreas(data.meals);
        }catch(error){
            console.error(error);
        }
    };

    const fetchIngredients = async() => {
        try{
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
            const data = await response.json();
            setIngredients(data.meals);
        }catch(error){
            console.error(error);
        }
    };

    const applyFilter = async() => {
        try{
            setLoading(true);
            const filterParams = selectedFilters.map(filter => `${filterType === 'area' ? 'a' : 'i'}=${filter}`).join('&');
            // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filterType === 'area' ? 'a' : 'i'}=${selectedFilter}`);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filterParams}`);
            const data = await response.json();
            setCategoryMeals(data.meals);
            setLoading(false);
            setFilterVisible(false);
        }catch(error){
            console.error(error);
            setLoading(false);
        }
    };

    const handleCheckboxChange = (value) => {
        setSelectedFilters(prevFilters => 
            prevFilters.includes(value)
            ? prevFilters.filter(filter => filter !== value)
            : [...prevFilters, value]
        );
    };

    return(
        <PaperProvider>
            <ScrollView style={styles.screen}>
                <StatusBar 
                    backgroundColor='navy'
                    animated={true}            
                />

                {/* Heading  */}
                <View style = {styles.header}>
                    <View style={styles.avatarContainer}>
                        <Text variant="titleMedium"> Hello, John</Text>
                        <Avatar.Icon icon='account-outline' size={40}  style={styles.avatar}/>
                    </View>
                    <Text variant="headlineSmall"> Let's get cooking!</Text>
                </View>

                {/* Searchbar */}
                <Searchbar
                    placeholder="Search"
                    // onChangeText={setSearchQuery}
                    onChangeText={(query) => {
                        setSearchQuery(query);
                        if(query){
                            fetchSearchResults(query);
                        }else{
                            fetchCategoryMeals(selectedCategory);
                        }
                    }}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation='2'
                />

                {/**category header */}
                <View style={styles.sectContainer}>
                    <View style={styles.sectHeader}>
                        <Text variant="headlineMedium"> Category </Text>
                        <Icon 
                            name='filter-variant' 
                            size={20} 
                            style={styles.icon} 
                            onPress={() => {
                                setFilterVisible(true);
                                setFilterType('');
                                setSelectedFilter('');
                            }}
                        />
                    </View>
                    <HomeCategories
                        categories={categories}
                        selectedCategory={selectedCategory}
                        fetchCategoryMeals={fetchCategoryMeals}
                    />
                    <HomeRecipes
                        loading={loading}
                        categoryMeals={categoryMeals}
                    />
                </View>
            </ScrollView>

            <Portal>
                <Dialog visible={filterVisible} onDismiss={() => setFilterVisible(false)} style={styles.dialog}>
                    <Dialog.Title> Filter by </Dialog.Title>
                    <Dialog.Content style={{maxHeight: '50%', borderRadius: 20}}>
                        {!filterType ? (
                            <>
                                <Button onPress={() => { setFilterType('area'); fetchAreas(); }}> By Area </Button>
                                <Button onPress={() => { setFilterType('ingredient'); fetchIngredients(); }}> By Ingredient </Button>
                            </>
                        ):(
                            <ScrollView>
                                {(filterType == 'area' ? areas : ingredients).map((item, index) => {
                                    const itemLabel = item.strArea || item.strIngredient;
                                    return(
                                        <Checkbox.Item
                                            key={`${itemLabel}-${index}`}
                                            label={itemLabel}
                                            status={selectedFilters.includes(itemLabel) ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(itemLabel)}
                                        />
                                    );
                                })}
                            </ScrollView>
                        )}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setFilterVisible(false)}> Cancel </Button>
                        <Button onPress={applyFilter}> Apply </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    );
    
}



const styles= StyleSheet.create({
    screen:{
        flex: 1,
        marginHorizontal: 20
    },
    header:{
        paddingTop: 10,
        paddingHorizontal: 5
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar:{
        marginLeft: 'auto'
    },
    searchBar:{
        marginVertical: 20,
    },

    // category
    sectContainer:{
        paddingTop: 10, 
        // paddingHorizontal: 5
    },
    sectHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    icon:{
        // marginLeft: '40%',
        marginLeft: 'auto',
        alignItems: 'center'
    },

    tabs: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    tab: {
        marginHorizontal: 5,
    },
    tabText: {
        color: 'black',
    },
    activeTabText: {
        color: 'white',
    },
    loader: {
        marginTop: 50,
    },
    masonryContainer: {
        paddingBottom: 20,
    },

    dialog:{
        borderRadius: 20, 
        padding: 10
    }

});