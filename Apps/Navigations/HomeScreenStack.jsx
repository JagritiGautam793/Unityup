import { View, Text } from 'react-native'
import React from 'react' 
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';

const Stack = createStackNavigator();


export default function HomeScreenStack() {
  return (  

    // we are jumping from home screen and we want to go in the itemlist

    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen}

        options={{
            headerShown:false
        }}
        
        
        /> 
        <Stack.Screen name='item-list' component={ItemList} 
         options={({ route }) => ({title:route.params.category,
            headerStyle:{
                backgroundColor:'#3b82f6',
            },
            headerTintColor:'#fff'
        
        })}
        
        />
    </Stack.Navigator>

  
  )
}