import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem' 
// so that we can reuse this section

export default function LatestItemList({latestItemList}) {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Latest Items</Text> 
      <FlatList
      data={latestItemList} 
      numColumns={2}  
      renderItem={({item,index})=>(

        <PostItem item={item}/>


      )}
      />
    </View>
  )
}