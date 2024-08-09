// import React, {useEffect, useState} from "react";
// import { View, ScrollView, StyleSheet, FlatList, Image, Pressable} from "react-native";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Button, Card, Text } from "react-native-paper";
// import MasonryList from '@react-native-seoul/masonry-list';

// export default function HomeRecipes ({categories, meals}) {
//     const RenderRecipe = ({ item, index }) => { 
//         const isEven = index % 2 == 0;
//         return(
//             <View>
//                 <Pressable style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0, paddingVertical: '2%'}}>
//                     <Image
//                         source={{ uri: item.strMealThumb }}
//                         style={{width: '100%', height: index%3==0? 140:250, borderRadius: 35}}
//                     />
//                     <Text variant="labelLarge">
//                         {item.strMeal}
//                     </Text>

//                 </Pressable>
//             </View>
//         );
//     };


//     return(
//         <View style={styles.sceneContainer}>
//             {
//                 categories.length==0 || meals.length==0? null: (
//                     <MasonryList
//                         data={meals}
//                         keyExtractor={item => item.idMeal}
//                         // renderItem={renderRecipe}
//                         renderItem={({item, i}) => <RenderRecipe item={item} index={i} />}
//                         numColumns = {2}
//                         contentContainerStyle={styles.masonryContainer}
//                         showsVerticalScrollIndicator={false}
//                     />
//                 )
//             }
//             {/* {selectedCategory && (
//                 <MasonryList
//                     data={recipes}
//                     keyExtractor={item => item.idMeal}
//                     // renderItem={renderRecipe}
//                     renderItem={({item, i}) => <RenderRecipe item={item} index={i} />}
//                     numColumns = {2}
//                     contentContainerStyle={styles.masonryContainer}
//                     showsVerticalScrollIndicator={false}
//                 />
//             )} */}
//         </View>

//     );
// }


// const styles = StyleSheet.create({
//     tabsContainer:{
//         marginTop: 16,
//     },
//     tabContainer:{
//         marginTop: 16,
//     },
//     tabButton: {
//         marginHorizontal: 5,
//     },
//     sceneContainer: {
//         marginTop: 16,
//         // backgroundColor: 'red'
//     },

//     recipeCard:{
//         marginBottom: 16, 
//         flex: 1,
//     },
//     leftCard:{
//         marginRight: 8,
//     },
//     rightCard:{
//         marginRight: 8,
//     },
//     cardContainer:{
//         backgroundColor: 'yellow',
//         borderRadius: 35,
//         overflow: 'hidden',
//     },
//     cardImage:{
//         width: '100%',
//         borderTopLeftRadius: 8,
//         borderTopRightRadius: 8,
//     },
//     cardContent:{
//         padding: 10,
//     },
//     cardTitle:{
//         marginTop: 8,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
   
// });






import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import MasonryList from '@react-native-seoul/masonry-list';
import CachedImage from './image';
import { useNavigation } from '@react-navigation/native';
import DetailsScreen from '../screens/RecipeDetails';




export default function HomeRecipes ( { loading, categoryMeals } ) {
    const navigation = useNavigation();

    return loading ? (
        <ActivityIndicator animating={true} size="large" style={styles.loader} />
    ) : (
        <MasonryList
            data={categoryMeals}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item, i }) => <RenderRecipe item={item} index={i}  navigation={navigation} />}
            numColumns={2}
            contentContainerStyle={styles.masonryContainer}
            showsVerticalScrollIndicator={false}
        />
    );

}

const RenderRecipe = ({ item, index, navigation }) => {
    const isEven = index % 2 === 0;
    return (
        <View style={styles.recipeContainer}>
            <Pressable 
                style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0, paddingVertical: '2%' }}
                onPress={() => navigation.navigate('RecipeDetail', {...item})}
            >
                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 === 0 ? 140 : 250, borderRadius: 35 }}
                /> */}
                <CachedImage
                    uri= { item.strMealThumb }
                    style={{ width: '100%', height: index % 3 === 0 ? 140 : 250, borderRadius: 35 }}
                />
                <Text variant="labelLarge">
                    {item.strMeal}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    recipeContainer: {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 8,
        paddingVertical: '2%',
    },
    loader: {
        marginTop: 50,
    },
    masonryContainer: {
        paddingBottom: 20,
    },
});
