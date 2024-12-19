import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Slider from "../Components/HomeScreen/Slider";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Categories from "../Components/HomeScreen/Categories";
import LatestItemList from "../Components/HomeScreen/LatestItemList";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const db = getFirestore(app);
  // default value as an empty
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setlatestItemList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getSliders();
    getCategoryList();
    getLatestItemList();

    const unsubscribe = navigation.addListener("focus", getLatestItemList);
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  // [] means here it will runonly once there is no dependency that can trigger the functioning of this //

  /*In order to get sliders for homescreen*/
  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "SliderComm"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      // doc.data() is never undefined for query doc snapshots
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  // used to get category list
  const getCategoryList = async () => {
    setCategoryList([]);

    const querySnapshot = await getDocs(collection(db, "Community"));

    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  // in order to fetch latest item list

  const getLatestItemList = async () => {
    setlatestItemList([]);
    const querySnapshot = await getDocs(
      collection(db, "UserIssue"),
      orderBy("createdAt", "desc")
    );
    querySnapshot.forEach((doc) => {
      console.log("Docs", doc.data());
      setlatestItemList((latestItemList) => [...latestItemList, doc.data()]);
    });
  };

  return (
    <ScrollView className="py-8 px-6  flex-1">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList
        latestItemList={latestItemList}
        heading={"Latest Issues"}
      />
    </ScrollView>
  );
}
