import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import { PaperProvider, Appbar, TextInput, Button } from "react-native-paper";


export default function SignUpScreen() {
    const navigation = useNavigation();
    const [emailText, setEmailText] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const handleSignUp = () => {
        if(password !== reenterPassword){
            alert("Passwords do not match");
            return;
        }
        navigation.navigate('HomePage')
    }

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
                <Text style={styles.mainText}> Create new account</Text>
                <TextInput
                    placeholder='Email'
                    value={emailText}
                    onChangeText={emailText => setEmailText(emailText)}
                    mode='outlined'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Username"
                    value={username}
                    onChangeText={username => setUsername(username)}
                    mode='outlined'
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    mode='outlined'
                    style={styles.textInput}
                    secureTextEntry
                    right={
                        <TextInput.Icon
                            icon={isPasswordSecure ? 'eye-off' : 'eye'}
                            size={28}
                            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                        />
                    }
                />
                <TextInput
                    placeholder="Re-enter Password"
                    value={reenterPassword}
                    onChangeText={reenterPassword => setReenterPassword(reenterPassword)}
                    mode='outlined'
                    style={styles.textInput}
                    right={
                        <TextInput.Icon
                            icon={isPasswordSecure ? 'eye-off' : 'eye'}
                            size={28}
                            onPress={() => setIsPasswordSecure(!isPasswordSecure)}
                        />
                    }
                    
                />

                <Button
                    mode='elevated'
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    Register
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
    
    mainContent:{
        justifyContent: 'center',
        marginVertical: '30%',
        marginHorizontal: 20
    },
    mainText:{
        fontSize: 30, 
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    textInput: {
        marginVertical: 15
    }
});