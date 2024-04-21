import { View, Text } from 'react-native'
import React from 'react' 
import { createStackNavigator } from '@react-navigation/stack'
import { StackActions } from '@react-navigation/native';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetails from '../Screens/ProductDetails';


const Stack=createStackNavigator();

export default function ProfileScreenStack() {
  return ( 

     <Stack.Navigator>
        <Stack.Screen name='profile-tab' component={ProfileScreen} 
        options={{
            headerShown:false
        }} 
         /> 
        <Stack.Screen name='my-product' component={MyProducts}  
        options={{
            headerStyle:{
                backgroundColor:'#3b82f6',
            },
            headerTintColor:'#fff',
            headerTitle:'My Issues'
        }} 
        />
        <Stack.Screen name="product-detail" component={ProductDetails}
         options={{
            headerStyle:{
                backgroundColor:'#3b82f6'
            },
            headerTintColor:'#fff', 
            headerTitle:'Detail'
        
        }}
        />

        
     </Stack.Navigator>


  )
}