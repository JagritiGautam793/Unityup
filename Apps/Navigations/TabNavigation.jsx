import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPostScreen from '../Screens/AddPostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import HomeScreenStack from './HomeScreenStack';
import ExploreScreenStack from './ExploreScreenStack';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false
    }}>
        <Tab.Screen name="home-nav" component={HomeScreenStack}
        options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Home</Text> 
            ),
            tabBarIcon:({color,size})=>( 
                <Ionicons name="home" size={size} color={color} />
            )
        }}
        
        /> 
        <Tab.Screen name="explore" component={ExploreScreenStack}

        options={{
             tabBarLabel:({color})=>(
                     <Text style={{color:color,fontSize:12,marginBottom:3}}>Explore</Text> 
                ),
                    tabBarIcon:({color,size})=>( 
                        <Ionicons name="search" size={size} color={color} />
             )
            }}

        
        
        />
        <Tab.Screen name="addpost" component={AddPostScreen}
        options={{
            tabBarLabel:({color})=>(
                   <Text style={{color:color,fontSize:12,marginBottom:3}}>Add Post</Text> 
       ),
       tabBarIcon:({color,size})=>( 
        <Ionicons name="camera" size={size} color={color} />
                   )
               }}
       
        
        
        />
        <Tab.Screen name="profile" component={ProfileScreen} 

         options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginBottom:3}}>Profile</Text> 
            ),
            tabBarIcon:({color,size})=>( 
                <Ionicons name="person-circle" size={size} color={color} />
            )
        }}

        
        
        
        />
    </Tab.Navigator>
 
  )
}