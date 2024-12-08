import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import ItemList from "../Screens/ItemList";
import ProductDetails from "../Screens/ProductDetails";
import CampaignDetail from "../Screens/CampaignDetail";

const Stack = createStackNavigator();

export default function HomeScreenStack() {
  return (
    // we are jumping from home screen and we want to go in the itemlist

    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
        })}
      />

      <Stack.Screen
        name="campaign-detail"
        component={CampaignDetail}
        options={{
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
          headerTitle: "Detail",
        }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetails}
        options={{
          headerStyle: {
            backgroundColor: "#3b82f6",
          },
          headerTintColor: "#fff",
          headerTitle: "Detail",
        }}
      />
    </Stack.Navigator>
  );
}
