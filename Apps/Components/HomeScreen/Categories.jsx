import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Categories({categoryList}) { 

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>  
      <FlatList 
      data={categoryList} 
      numColumns={3} 
      renderItem={({item,index})=>( 
        <View className="flex-1 items-center justify-center p-2 border-[1px] border-gray-300 m-1 h-[80px] rounded-lg"> 
            <Image source={{uri:item?.icon}} 
            className="w-[35px] h-[35px] p-2 border-[1px]"
            />  
            <Text className="text-[10px] mt-1">{item.name}</Text>
            


        </View>

      )}
      />
    </View>
  )
}