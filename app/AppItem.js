import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function AppItem(props){

    function handleDeletePress(){ 
        console.log(item); 
    } 

    async function handleEditPress(){ 
        let savedItems = [];
        const response = await AsyncStorage.getItem('items');
        if(response) savedItems = JSON.parse(response);
        const item = await savedItems.find(item => item.id === props.id);
        props.navigation.navigate("AppForm", item);
    }
    
    return (
        <View style={styles.container}>
          <Text style={styles.textItem}>{props.item}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleDeletePress}> 
                <Text style={styles.buttonText}>X</Text> 
            </TouchableOpacity> 
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={handleEditPress}> 
                <Text style={styles.buttonText}>Editar</Text> 
            </TouchableOpacity> 
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 20,
      width: '100%'
    },
    buttonsContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: '#CCC',
        paddingBottom: 10,
        marginTop: 10,
    },
    editButton: {
        marginLeft: 10,
        height: 40,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    deleteButton: {
        marginLeft: 10,
        height: 40,
        width: 40,
        backgroundColor: 'red',
        borderRadius: 10,
        padding: 10,
        fontSize: 12,
        elevation: 10,
        shadowOpacity: 10,
        shadowColor: '#ccc',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    textItem: {
        fontSize: 20,
    }
  });