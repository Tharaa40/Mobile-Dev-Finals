// Retrieve Favourite Recipe IDs from AsyncStorage: When the Favourites screen loads, retrieve the list of favourite recipe IDs from AsyncStorage.
// Fetch Recipe Details: Use the retrieved IDs to fetch the details of each recipe.
// Display Recipes: Display the list of favourite recipes in your Favourites.js screen.




import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, StatusBar, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, Text, Avatar, Searchbar } from "react-native-paper";
import CachedImage from "../components/image";
import { useNavigation } from "@react-navigation/native";



export default function Favourites(props){
    const [favourites, setFavourites] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [categorizedRecipes, setCategorizedRecipes] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const favouritesData = await AsyncStorage.getItem('favourites');
                if (favouritesData) {
                    const favouriteIds = JSON.parse(favouritesData);
                    const recipes = await Promise.all(favouriteIds.map(id => fetchRecipeById(id)));
                    const categorized = categorizeRecipes(recipes) //added this
                    // setFavourites(recipes);
                    setCategorizedRecipes (categorized);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favourite recipes:', error);
                setLoading(false);
            }
        };

        fetchFavourites();
    }, []);

    const fetchRecipeById = async (id) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            return data.meals[0];
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            return null;
        }
    };

    const categorizeRecipes = (recipes) => {
        return recipes.reduce((acc, recipe) => {
            if (recipe && recipe.strTags) {
                const tags = recipe.strTags.split(',').map(tag => tag.trim());
                tags.forEach(tag => {
                    if (!acc[tag]) {
                        acc[tag] = [];
                    }
                    acc[tag].push(recipe);
                });
            }
            return acc;
        }, {});
    };

    const handlePress = (recipe) => {
        navigation.navigate('RecipeDetail', {
            idMeal: recipe.idMeal, 
            strMealThumb: recipe.strMealThumb, 
            strMeal: recipe.strMeal,
        });
    };

    const filterRecipes = (recipes, query) => {
        if(!query){
            return recipes;
        }
        const lowercasedQuery = query.toLowerCase();
        return recipes.filter(recipe => 
            recipe.strMeal.toLowerCase().includes(lowercasedQuery)
        );
    };

 
    return(
        <PaperProvider>
            <ScrollView style={styles.screen}>
                <StatusBar 
                    backgroundColor='navy'
                    animated={true}            
                />
                
                <View style={styles.header}>
                    <Text variant="headlineMedium"> Favourites </Text>
                    <Avatar.Icon icon='account-outline' size={40}  style={styles.avatar}/>
                </View>

                {/**complete this later */}
                <Searchbar
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                /> 

                {/**categories segment */}
                {loading ? (
                    <ActivityIndicator size='large' color="#0000ff"/>
                ): (
                    Object.keys(categorizedRecipes).map(tag => {
                        const filteredRecipes = filterRecipes(categorizedRecipes[tag], searchQuery);
                        if (filteredRecipes.length === 0) {
                            return null; // Skip rendering this category if no recipes match
                        }

                        return(
                            <View key={tag} style={styles.categoryContainer}>
                                <Text style={styles.categoryTitle}> {tag}</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.collageContainer}>
                                        {/**1st image on the left */}
                                        {categorizedRecipes[tag][0] && (
                                            <TouchableOpacity
                                                key={categorizedRecipes[tag][0].idMeal}
                                                style={styles.largeRectangle}
                                                onPress={() => handlePress(categorizedRecipes[tag][0])}
                                            >
                                                <CachedImage
                                                    uri={categorizedRecipes[tag][0].strMealThumb}
                                                    style={styles.image}
                                                />
                                            </TouchableOpacity>
                                        )}
                                        {/**2nd and 3rd images on the right */}
                                        <View style={styles.smallRectangleContainer}>
                                            {categorizedRecipes[tag][1] && (
                                                <TouchableOpacity
                                                    key={categorizedRecipes[tag][1].idMeal}
                                                    style={styles.smallRectangle}
                                                    onPress={() => handlePress(categorizedRecipes[tag][1])}
                                                >
                                                    <CachedImage
                                                        uri={categorizedRecipes[tag][1].strMealThumb}
                                                        style={styles.image}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            {categorizedRecipes[tag][2] && (
                                                <TouchableOpacity
                                                    key={categorizedRecipes[tag][2].idMeal}
                                                    style={styles.smallRectangle}
                                                    onPress={() => navigation.navigate('CategoryFavouritesScreen', {
                                                        category: tag, 
                                                        recipes: categorizedRecipes[tag]
                                                    })}
                                                >
                                                    <CachedImage
                                                        uri={categorizedRecipes[tag][2].strMealThumb}
                                                        style={[styles.image, categorizedRecipes[tag].length > 3 && styles.translucentImage]}
                                                    />
                                                    {categorizedRecipes[tag].length > 3 && (
                                                        <View style={styles.overlay}>
                                                            <Text style={styles.moreRecipesText}>
                                                                {`+${categorizedRecipes[tag].length - 2} recipes`}
                                                            </Text>
                                                        </View>
                                                    )}
                                                </TouchableOpacity>
                                            )}

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        );
                    }) 
                )}




                {/* {loading? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    Object.keys(categorizedRecipes).map(tag => (
                        <View key={tag} style={styles.categoryContainer}>
                            <Text style={styles.categoryTitle}> {tag} </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <View style={styles.collageContainer}> */}
                                    {/* First image on the left */}
                                    {/* {categorizedRecipes[tag][0] && (
                                        <TouchableOpacity
                                            key={categorizedRecipes[tag][0].idMeal}
                                            style={styles.largeRectangle}
                                            onPress={() => handlePress(categorizedRecipes[tag][0])}
                                        >
                                            <CachedImage
                                                uri={categorizedRecipes[tag][0].strMealThumb}
                                                style={styles.image}
                                            />
                                        </TouchableOpacity>
                                    )} */}

                                    {/* Second and third images stacked on the right */}
                                    {/* <View style={styles.smallRectangleContainer}>
                                        {categorizedRecipes[tag][1] && (
                                            <TouchableOpacity
                                                key={categorizedRecipes[tag][1].idMeal}
                                                style={styles.smallRectangle}
                                                onPress={() => handlePress(categorizedRecipes[tag][1])}
                                            >
                                                <CachedImage
                                                    uri={categorizedRecipes[tag][1].strMealThumb}
                                                    style={styles.image}
                                                />
                                            </TouchableOpacity>
                                        )}

                                        {categorizedRecipes[tag][2] && (
                                            <TouchableOpacity
                                                key={categorizedRecipes[tag][2].idMeal}
                                                style={styles.smallRectangle}
                                                onPress={() => navigation.navigate('CategoryFavouritesScreen', {
                                                    category: tag, 
                                                    recipes: categorizedRecipes[tag]
                                                })}
                                                // onPress={() => handlePress(categorizedRecipes[tag][2])}
                                            > */}
                                                {/* <CachedImage
                                                    uri={categorizedRecipes[tag][2].strMealThumb}
                                                    style={[styles.image, categorizedRecipes[tag].length > 3 && styles.translucentImage]}
                                                />
                                                {categorizedRecipes[tag].length > 3 && (
                                                    <View style={styles.overlay}>
                                                        <Text style={styles.moreRecipesText}>
                                                            {`+${categorizedRecipes[tag].length - 2} recipes`}
                                                        </Text>
                                                    </View>
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    ))
                )} */}


                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.collageContainer}>
                                {categorizedRecipes[tag].slice(0,3).map((recipe, index) => (
                                    <TouchableOpacity
                                        key={recipe.idMeal}
                                        style={[
                                            styles.recipeCard, 
                                            index == 0 ? styles.largeRectangle : styles.smallRectangle,
                                        ]}
                                        onPress={() => handlePress(recipe)}
                                    >
                                        <CachedImage
                                            uri = {recipe.strMealThumb}
                                            style={[
                                                styles.image, 
                                                index == 2 && categorizedRecipes[tag].length > 2 ? styles.translucentImage : null,
                                            ]}
                                        />
                                        {index == 2 && categorizedRecipes[tag].length > 3 && (
                                            <View style={styles.overlay}>
                                                <Text style={styles.moreRecipesText}>
                                                    {`+${categorizedRecipes[tag].length - 2} recipes`}
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView> */}






















                {/* {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    Object.keys(categorizedRecipes).map(tag => (
                        <View key={tag} style={styles.categoryContainer}>
                            <Text style={styles.categoryTitle}>{tag}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {categorizedRecipes[tag].map(recipe => (
                                    <TouchableOpacity
                                        key={recipe.idMeal}
                                        style={styles.recipeCard}
                                        onPress={() => navigation.navigate('RecipeDetail', { 
                                            idMeal: recipe.idMeal, 
                                            strMealThumb : recipe.strMealThumb, 
                                            strMeal: recipe.strMeal
                                         })}
                                    >
                                        <CachedImage
                                            uri={recipe.strMealThumb}
                                            style={styles.image}
                                        />
                                        <Text style={styles.title}>{recipe.strMeal}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    ))
                )} */}





                
            </ScrollView>
        </PaperProvider>
    );
};


const styles = StyleSheet.create({
    screen:{
        marginHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        marginVertical: 10, 
    }, 
    avatar: {
        marginLeft: 'auto'
    },


    // recipeCard: {
    //     marginBottom: 15,
    //     borderRadius: 8,
    //     overflow: 'hidden',
    //     backgroundColor: '#fff',
    //     elevation: 3,
    // },
    // image: {
    //     width: '100%',
    //     height: 200,
    // },
    // title: {
    //     padding: 10,
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },


    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    collageContainer: {
        flexDirection: 'row',
    },
    smallRectangleContainer: {
        flexDirection: 'column',
    },
    largeRectangle: {
        width: 210,
        height: 210,
        marginRight: 10,
    },
    smallRectangle: {
        width: 150,
        height: 100,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    translucentImage: {
        opacity: 0.6,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 10,
    },
    moreRecipesText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }, 
    // recipeCard: {
    //     marginRight: 10,
    //     borderRadius: 8,
    //     overflow: 'hidden',
    //     backgroundColor: '#fff',
    //     elevation: 3,
    //     width: 150,
    // },
    // image: {
    //     width: '100%',
    //     height: 100,
    // },
    // title: {
    //     padding: 5,
    //     fontSize: 14,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    // },































    // tagContainer: {
    //     marginBottom: 20,
    // },
    // tagTitle: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
    // imagesContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'flex-start',
    // },
    // largeImage: {
    //     width: '50%',
    //     height: 200,
    //     marginRight: 10,
    // },
    // smallImagesContainer: {
    //     flex: 1,
    // },
    // smallImage: {
    //     width: '100%',
    //     height: 100,
    //     marginBottom: 10,
    // },
    // translucentContainer: {
    //     position: 'relative',
    // },
    // translucentOverlay: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // overlayText: {
    //     color: 'white',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },

});
