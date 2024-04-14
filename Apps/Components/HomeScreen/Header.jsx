import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo' 
import { Ionicons } from '@expo/vector-icons';

export default function Header() { 
    const {user}=useUser();
  return ( 
    <View>  
        {/* User info section  */}

            <View className="flex flex-row items-center gap-4"> 
                {/* fetching from url */}
            <Image source={{uri:user?.imageUrl}} 
            className="rounded-full w-12 h-12"
            />
            <View>
                <Text className="text-[16px]">Welcome</Text> 
                <Text className="text-[20px] font-bold">{user?.fullName}</Text>
            </View>
            </View>  
            {/* Search bar */} 
            <View className="p-3 flex flex-row items-center  bg-white rounded-full px-5 mt-5 ">
            <Ionicons name="search" size={24}  color="gray" />
                <TextInput placeholder='Search' className="ml-3 text-[18px] "
                onChangeText={(value)=>console.log(value)}
                
                
                
                /> 
            </View>
    </View>
  )
}