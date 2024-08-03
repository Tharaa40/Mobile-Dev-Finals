import React, { useState } from "react";
import { ScrollView, View, StatusBar, StyleSheet } from "react-native";
import { PaperProvider, Appbar, Avatar, Text, Searchbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function HomeScreen({navigation}){
    const [searchQuery, setSearchQuery] = useState('');
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
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchBar}
                    elevation='2'
                />

                {/* Category */}
                <View style={styles.catContainer}>
                    <View style={styles.catHeader}>
                        <Text variant="headlineMedium"> Category </Text>
                        <Text variant="labelLarge" style={{marginLeft: 'auto'}}> See all </Text>
                    </View>
                </View>

                

            </ScrollView>
        </PaperProvider>
    );
}

const styles=StyleSheet.create({
    screen:{
        flex: 1,
        marginHorizontal: 20
    },
    header: {
        paddingTop: 10,
        paddingHorizontal: 5
    },
    avatarContainer:{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar:{
        marginLeft: 'auto'
    },
    searchBar:{
        marginVertical: 20,
    }, 
    catContainer: {
        paddingTop: 10, 
        paddingHorizontal: 5
    }, 
    catHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
    
});