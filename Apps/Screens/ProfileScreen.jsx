import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import diary from "./../../assets/images/diary.png";
import search from "./../../assets/images/search.png";
import logout from "./../../assets/images/turn-off.png";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  // in order to fetch user information

  const { isLoaded, signOut } = useAuth();

  const { user } = useUser();
  console.log("userrrrrrrr:", user.id);
  const navigation = useNavigation();

  const menuList = [
    {
      id: 1,
      name: "My Issues",
      icon: diary,
      path: "my-product",
    },
    {
      id: 2,
      name: "Explore",
      icon: search,
      path: "explore",
    },
    // {
    //   id:1,
    //   name:'My Products',
    //   icon:diary

    // } ,
    {
      id: 3,
      name: "Logout",
      icon: logout,
    },
  ];

  const onMenuPress = (item) => {
    if (item.name == "Logout") {
      signOut();

      return;
    }
    // ?ternary operator for seperating the condition with its two possible outcomes
    item?.path ? navigation.navigate(item.path) : null;
  };

  return (
    <View className="p-5">
      <View className="items-center mt-20">
        <Image
          source={{ uri: user?.imageUrl }}
          className="w-[100px] h-[100px] rounded-full "
        />
        <Text className="font-bold text-[25px] mt-2">{user?.fullName}</Text>
        <Text className="font-bold text-[25px] mt-2">{user?.id}</Text>

        <Text className="text-[18px] mt-2 text-gray-500">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>
      {/* flatlist in order to iterate over the menu list  */}
      <FlatList
        data={menuList}
        numColumns={3}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuPress(item)}
            className="flex-1 p-3 border-[1px] items-center m-4 rounded-lg border-gray-400 mt-4 mx-1"
          >
            {item.icon && (
              <Image source={item?.icon} className="w-[40px] h-[40px]" />
            )}
            <Text className="text-[12px] mt-2 font-bold">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
