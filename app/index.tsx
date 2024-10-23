import { useRouter } from "expo-router"
import { View, Button, StyleSheet, Text } from "react-native"

const OnboardingScreen = () => {
    const router = useRouter()

    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>
                Welcome to your Pantry App
            </Text>
            <Button title='Login' onPress={ () => router.push('/auth/login') }></Button>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
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
        backgroundColor: 'blue'
    }
});

export default OnboardingScreen;