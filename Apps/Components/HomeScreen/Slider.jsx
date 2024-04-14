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
                    
                    <Image source={{uri:item?.image}}   
                    className="h-[200px] w-[350px] mr-3 rounded-lg object-contain"
                    /> 
                    </View>
            )}
            />
    </View>

  )
}