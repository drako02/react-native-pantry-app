import { Link, useRouter } from "expo-router";
import { TextInput, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../firebaseConfig";
import { useState } from "react";
import { FirebaseError } from "firebase/app";



const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const auth = getAuth(app);

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
            return userCredential.user;
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.log(error.message);
                alert(error.message)
            } else {
                console.error(error);
            }
            // console.error("Sign Up error", error);
            // throw error;
        }
    };


    const handleSignUp = async () => {
        try {
            const user = await signUpWithEmail(email, password);
            if (user) {
                router.push("/home");
            }
            // else {
            //     alert("Couldn't create account. Try again");
            // }

        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Sign Up error", error.message);
                alert(error.message);
            } else {
                console.error(error)
            }


        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.formConatainer }>
                <Text style={ styles.label } >Full Name</Text>
                <TextInput style={ styles.textInput } value={ name } onChangeText={ setName }>

                </TextInput>
                <Text style={ styles.label } >Email</Text>
                <TextInput style={ styles.textInput } value={ email } onChangeText={ setEmail }>

                </TextInput>

                <Text style={ styles.label }>Password</Text>
                <TextInput style={ styles.textInput } value={ password } onChangeText={ setPassword } secureTextEntry>

                </TextInput>
                {/* <Button title="Login"></Button> */ }
                <TouchableOpacity style={ styles.button } onPress={ () => handleSignUp() }>
                    <Text style={ styles.text }>Sign Up</Text>
                </TouchableOpacity>
                <Link href='/auth/login' style={ styles.link }>
                    <Text >Already have an account? Sign In ?</Text>
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

export default SignUpScreen;