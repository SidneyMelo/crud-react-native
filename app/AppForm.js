import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
 
export default function AppForm({ navigation }) {
  const [descricao, setDescricao] = useState(''); 
  const [quantidade, setQuantidade] = useState(0);
  
  function handleDescriptionChange(descricao){ setDescricao(descricao); } 
  function handleQuantityChange(quantidade){ setQuantidade(parseInt(quantidade)); }
  async function handleButtonPress(){ 
    const item = {id: new Date().getTime(), descricao, quantidade};
    let savedItems = [];
    const response = await AsyncStorage.getItem('items');
    
    if(response) savedItems = JSON.parse(response);
    savedItems.push(item);

    await AsyncStorage.setItem('items', JSON.stringify(savedItems));
    console.log(item); 
    navigation.navigate("AppList");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}> 
        <TextInput 
          style={styles.input} 
          onChangeText={handleDescriptionChange} 
          placeholder="O que está faltando em casa?"
          clearButtonMode="always" /> 
        <TextInput 
          style={styles.input} 
          onChangeText={handleQuantityChange} 
          placeholder="Digite a quantidade" 
          keyboardType={'numeric'}
          clearButtonMode="always" /> 
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}> 
          <Text style={styles.buttonText}>Salvar</Text> 
        </TouchableOpacity> 
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch'
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});