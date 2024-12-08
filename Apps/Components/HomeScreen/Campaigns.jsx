import React, { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Campaigns({ categoryList }) {
  const navigation = useNavigation();

  const LikeButton = () => {
    const [likeCount, setLikeCount] = useState(0);

    const handleLikePress = () => {
      setLikeCount(likeCount + 1);
    };

    return (
      <View className="flex flex-row items-center">
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleLikePress}
          className="flex flex-row items-center"
        >
          <FontAwesome5 name="thumbs-up" size={12} color="black" />
          <Text className="ml-2 text-xs">Like</Text>
        </TouchableOpacity>
        <Text className="ml-2 text-xs">{likeCount}</Text>
      </View>
    );
  };

  return (
    <View className="p-4">
      <Text className="font-bold text-[25px] mt-0 mb-3">Explore (Stay active)</Text>
      <Text className="font-bold text-[20px]">Campaigns</Text>
      <FlatList
        data={categoryList}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('campaign-detail')}
            className="flex-1 items-center justify-center p-2 border-[1px] border-gray-400 m-1 h-[150px] w-[100px] rounded-lg bg-gray-50"
          >
            <Image source={{ uri: item?.image }} className="w-[65px] h-[75px] p-2 border-[1px]" />
            <Text className="text-[10px] mt-1">{item.name}</Text>
            <LikeButton />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


























// import { View, Text, FlatList, Image } from 'react-native'
// import React from 'react' 
// import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { FontAwesome5 } from '@expo/vector-icons';

// export default function Campaigns({categoryList}){ 

//   const navigation=useNavigation();
//   const LikeButton = () => {
//   const [likeCount, setLikeCount] = useState(0);

//   const handleLikePress = () => {
//     setLikeCount(likeCount + 1);
//   };
// //   const handleTextPress = () => {
// //     // Perform desired actions when the text is touched
// //     console.log('Text touched');
//   };


//   return (  

   
//     <View className=" p-4"> 
//     <Text className="font-bold text-[25px] mt-0 mb-3">Explore (Stay active)</Text>
//       <Text className="font-bold text-[20px]">Campaigns</Text>  
//       <FlatList 
//       data={categoryList} 
//       numColumns={3} 
//       renderItem={({item,index})=>( 
//         <TouchableOpacity 
//         onPress={()=>navigation.navigate('item-list',{
//           category:item.name
//         })}
//          className="flex-1 items-center justify-center p-2 border-[1px] border-gray-400 m-1 h-[150px] w-[100px] rounded-lg bg-gray-50 " > 
//             <Image source={{uri:item?.image}} 
//             className="w-[65px] h-[75px] p-2 border-[1px]"
//             />  
//             <Text className="text-[10px] mt-1">{item.name}</Text> 

            
     
            


//         </TouchableOpacity>

//       )}
//       />
//     </View>
//   )
// }