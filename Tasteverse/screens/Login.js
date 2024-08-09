import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PaperProvider, Appbar, TextInput, Text as TextA, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';




export default function LoginScreen(){
    const navigation = useNavigation();
    
    const [emailText, emailSetText] = useState('');
    const [passwordText, passwordSetText] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);



    return(
        <PaperProvider>
            <Appbar.Header style={styles.logo}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>
                        <Appbar.Content title='Tasteverse' mode='center-aligned'/>  
                    </Text>
                </View>
            </Appbar.Header>

           

            <View style={styles.mainContent}>
                <Text style={styles.mainText}> Find your next go-to dish with Tasteverse</Text>
                <TextInput
                    // label="Email"
                    placeholder='Email'
                    value={emailText}
                    onChangeText={emailText => emailSetText(emailText)}
                    mode='outlined'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='Password'
                    value={passwordText}
                    onChangeText={passwordText => passwordSetText(passwordText)}
                    mode='outlined'
                    secureTextEntry={isPasswordSecure}
                    right={
                        <TextInput.Icon
                            icon={isPasswordSecure ? 'eye-off' : 'eye'}
                            size={28}
                            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                        />
                    }
                    style={styles.textInput}
                />
                <TextA variant="labelSmall" style={styles.paperText}>Forget Password</TextA>
                <Button
                    mode='elevated'
                    style={styles.button}
                    // onPress={() => navigation.navigate('Auth')}
                    onPress={() => navigation.navigate('HomePage')}
                >
                    Login
                </Button>
                <Button
                    mode='elevated'
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    SignUp
                </Button>
            </View>
        </PaperProvider>
    );
}


const styles = StyleSheet.create({
    logo: {
        justifyContent: 'center',
        // alignItems: 'center'
    },
    logoContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 18,
        color: '#000', 
    },
    
    
    mainContent: {
        justifyContent: 'center',
        marginVertical: '50%',
        marginHorizontal: 20
    },
    mainText:{
        fontSize: 30, 
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    textInput:{
        marginVertical: 15
    },
    paperText: {
        marginLeft: 10, 
    },

    button: {
        // marginVertical: 25,
        marginTop: 20,
        marginHorizontal:'30%',
    }
})

