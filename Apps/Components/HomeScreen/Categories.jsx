import { View, Text, FlatList, Image } from 'react-native'
import React from 'react' 
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Categories({categoryList}) {  

  const navigation=useNavigation();

  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>  
      <FlatList 
      data={categoryList} 
      numColumns={3} 
      renderItem={({item,index})=>( 
        <TouchableOpacity 
        onPress={()=>navigation.navigate('item-list', {
// in order to know category we have seleccted
        category:item.name

      
        })}
        className="flex-1 items-center justify-center p-1 border-[1px] border-gray-400 m-1 h-[60px] rounded-lg bg-gray-100"> 
            <Image source={{uri:item?.icon}} 
            className="w-[35px] h-[35px] p-2 border-[1px]"
            />  
            <Text className="text-[10px] mt-1">{item.name}</Text>
            


        </TouchableOpacity>

      )}
      />
    </View>
  )
}