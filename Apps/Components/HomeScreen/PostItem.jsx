import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function PostItem({item}) {
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-300 ">

          <Image source={{uri:item.image}} 
          className="w-full h-[140px] rounded-lg"/> 
          <View > 
            <Text className="text-[15px] font-bold mt-2">{item.title}</Text>  
            <Text className="text=[20px] font-bold text-blue-500"> Rs {item.price}</Text>
            <Text className="text-blue-500 mt-1 bg-blue-200 p-[2px] text-center rounded-full px-2 text-[10px] w-[70px]">{item.category}</Text>
 
            </View>

        </TouchableOpacity>
  )
}