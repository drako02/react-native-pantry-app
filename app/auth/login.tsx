import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../firebaseConfig";

// import { ,  } from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);
    const router = useRouter();

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("Sign In failed", error);
        }
    }

    const handleSignIn = async () => {
        try {
            const user = await signInWithEmail(email, password);

            if (user) {
                router.push("/home");
            } else {
                alert("Invalid email/password");
                console.log("Invalid email/password");
            }
        } catch (error) {
            console.error("Sign failed", error)
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.formConatainer }>
                <Text style={ styles.label } >Email</Text>
                <TextInput style={ styles.textInput } value={email} onChangeText={setEmail}>

                </TextInput>

                <Text style={ styles.label }>Password</Text>
                <TextInput style={ styles.textInput }onChangeText={setPassword} secureTextEntry>

                </TextInput>
                {/* <Button title="Login"></Button> */}
                <TouchableOpacity style={ styles.button} onPress={() => handleSignIn()}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
                <Link href='/auth/signup' style = {styles.link}>
                    <Text >Don't have an account? Sign Up ?</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10%',
        flex: 1,
        gap: 30,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#5DB1E7',
        // borderWidth: 1,
        borderRadius: 10,
        width: 150,
        height: 50,
        marginHorizontal: 'auto',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 7
    },
    formConatainer: {
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: '85%',
        height: '60%',
        // backgroundColor: 'grey',
        gap: 15
    },
    textInput: {
        borderWidth: 1,
        height: 50,
        borderRadius: 10,
        fontSize: 18,
        paddingHorizontal: 5

    },
    label: {
        textAlign: 'left',
        fontSize: 20,
    },
    link: {
        color: '#5DB1E7',
        fontSize: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
    }
    
});

export default LoginScreen;