import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import CachedImage from "../components/image";
import MasonryList from '@react-native-seoul/masonry-list';

export default function CategoryFavourites({ route, navigation }){
    const { category, recipes } = route.params;

    return(
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}> {category} </Text>
                <MasonryList
                    data={recipes}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.masonryItem}
                            onPress={() => navigation.navigate('RecipeDetail', {
                                idMeal: item.idMeal,
                                strMealThumb: item.strMealThumb,
                                strMeal: item.strMeal
                            })}   
                        >
                            <CachedImage 
                                uri = {item.strMealThumb}
                                style = {styles.image}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    masonryItem: {
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    itemText: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
});