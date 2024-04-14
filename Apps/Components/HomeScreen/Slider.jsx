import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
//   {/* basically powerfull component if we want to iterate something flatlist */} 

export default function Slider({sliderList}) {
  return(
    <View className="mt-5">
        <FlatList
            data={sliderList} 
            showsHorizontalScrollIndicator={false}
            horizontal={true} 
            renderItem={({item,index})=>(
                <View> 
                    <Text>{index}</Text>
                    <Image source={{uri:item?.image}}   
                    className="h-[200px] w-[300px] mr-3 rounded-full object-contain"
                    /> 
                    </View>
            )}
            />
    </View>

  )
}