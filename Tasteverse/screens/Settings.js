import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { Avatar, Button, PaperProvider, Text, useTheme, Divider, Surface } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';


export default function Settings(){
    const username = 'John';
    
    const navigation = useNavigation();
    const theme = useTheme();

    const handleLogout = () => {
        navigation.replace('Login');
    }

    return(
        <PaperProvider>
            <StatusBar 
                backgroundColor={theme.colors.primary}
                animated={true}            
            />
            <View style={styles.container}>
                <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.header}>
                    <Avatar.Icon 
                        size={100}
                        icon='account-circle-outline'
                        style={styles.avatar}
                    />
                </Animated.View>

                {/**main */}
                <Surface style={styles.mainComponent}>
                    {/** Username */}
                    <Animated.View entering={FadeIn} style={styles.subComponents}>
                        <Text variant="titleMedium"> Username </Text>
                        <Icon name='square-edit-outline' size={30} color={theme.colors.primary} />
                    </Animated.View>
                    <Divider />

                    {/** Email */}
                    <Animated.View entering={FadeIn} style={styles.subComponents}>
                        <Text variant="titleMedium"> Email </Text>
                        <Icon name='square-edit-outline' size={30} color={theme.colors.primary} />
                    </Animated.View>
                    <Divider />

                     {/** Theme */}
                    <Animated.View entering={FadeIn} style={styles.subComponents}>
                        <Text variant="titleMedium"> Theme </Text>
                        <Icon name='theme-light-dark' size={30} color={theme.colors.primary} />
                    </Animated.View>
                    <Divider />

                     {/** Favourites */}
                    <Animated.View entering={FadeIn} style={styles.subComponents}>
                        <Text variant="titleMedium"> Favourites </Text>
                        <Icon name='heart-multiple-outline' size={30} color={theme.colors.primary} />
                    </Animated.View>
                </Surface> 

                {/** Sign out button */}
                <Animated.View entering={FadeIn} style={styles.signOutButtonContainer}>
                    <Button 
                        mode="contained" 
                        onPress={handleLogout}
                        style={styles.signOutButton}
                    >
                        Sign Out
                    </Button>
                </Animated.View>

            </View>
        </PaperProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        backgroundColor: '#e0e0e0',
    },
    mainComponent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        elevation: 4, // For subtle shadow effect
        marginBottom: 20,
    },
    subComponents: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    signOutButtonContainer: {
        alignItems: 'center',
    },
    signOutButton: {
        width: '50%',
        borderRadius: 25,
    },

});