import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "@/services/firestore";
import { useRouter } from "expo-router";

interface PantryItems{
    id?: string;
    name: string;
    quantity: string;
}
export default function UserHomeScreen() {
    const [pantryItems, setPantryItems] = useState<PantryItems[]>([]);
    const [newItem, setNewItem] = useState<Omit<PantryItems, 'id'>>({ name: "", quantity:"" });
    const [loadingItems, setLoadingItems] = useState(true);
    const { user, loading: loadingAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchItems = async () => {
            
            if (user) {
                const fetchedItems = await getItems(user.uid);
                setPantryItems(fetchedItems);
                console.log(pantryItems)
            }
            setLoadingItems(false);
            
        };

        if (user) {
            fetchItems();
        } else {
            setLoadingItems(false);
        }


    }, [user]);
    
    useEffect(() => {
        if (!loadingAuth &&!loadingItems && !user ) {
            alert("Could not load your pantry");
            router.push('/auth/login');
        }
    }, [user, loadingItems, loadingAuth]);


    const handleAddItem = async () => {
        if (user && newItem && newItem.quantity) {
            await addItem(user.uid, newItem);
            const updateItems = await getItems(user.uid);
            setPantryItems(updateItems);
            setNewItem({ name: '', quantity: '' });
        }

    };

    if (loadingAuth || loadingItems ) {
        return (
            < View style={ styles.container } >
                <Text> Loading ...</Text>
            </View>
        )
    }

    return (
        <View style={ styles.container }>
            <View style={{gap:10}}>

                <Text style={styles.label}>Item Name</Text>
                <TextInput style={ styles.textInput } value={newItem.name } onChangeText={(text) => setNewItem(prev => ({...prev, name:text }))}>
                </TextInput>

                <Text style={styles.label}>Item Quantity</Text>
                <TextInput style={ styles.textInput } value= {newItem.quantity} onChangeText={(text) => setNewItem(prev => ({...prev, quantity:text}))}>
                </TextInput>

                <TouchableOpacity style={ styles.button } onPress = {handleAddItem}>
                    <Text style={ styles.text }> Add Item </Text>
                </TouchableOpacity>
            </View>
            <View style={ styles.pantryBox }>
                <View style={ styles.tableRow }>
                    <Text style={ styles.tableHeader }>Item</Text>
                    <Text style={ styles.tableHeader }>Quantity</Text>
                </View>
                { pantryItems.map((item) => (
                    <View key={ item.id } style={ styles.tableRow }>
                        <Text style={ styles.tableCell }>{ item.name }</Text>
                        <Text style={ styles.tableCell }>{ item.quantity }</Text>
                        
                    </View>
                ))}

            </View>
        </View>

        // <View style={ styles.formConatainer }>
        //         <Text style={ styles.label } >Email</Text>
        //         <TextInput style={ styles.textInput } value={email} onChangeText={setEmail}>

        //         </TextInput>

        //         <Text style={ styles.label }>Password</Text>
        //         <TextInput style={ styles.textInput }onChangeText={setPassword} secureTextEntry>

        //         </TextInput>
        //         {/* <Button title="Login"></Button> */}
        //         <TouchableOpacity style={ styles.button} onPress={() => handleSignIn()}>
        //             <Text style={styles.text}>Login</Text>
        //         </TouchableOpacity>
        //         <Link href='/auth/signup' style = {styles.link}>
        //             <Text >Don't have an account? Sign Up ?</Text>
        //         </Link>
        //     </View>
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
    pantryBox: {
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
    }, 
    tableRow: {
        flexDirection: 'row',
        justifyContent:'space-between'
        
    },
    tableHeader: {
        
    },
    tableCell: {

    }

});