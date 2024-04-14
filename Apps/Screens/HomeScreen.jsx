import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../Components/HomeScreen/Categories'

export default function HomeScreen() {  
  const db=getFirestore(app);    
  // default value as an empty
  const[sliderList,setSliderList] =useState([]); 
  const[categoryList,setCategoryList]=useState([]);
  useEffect(()=>{
    getSliders(); 
    getCategoryList();
  },[])
// [] means here it will runonly once there is no dependency that can trigger the functioning of this //

  /*In order to get sliders for homescreen*/
  const getSliders=async()=>{ 
    setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => { 
      console.log(doc.id,"=>",doc.data());
      // doc.data() is never undefined for query doc snapshots
      setSliderList(sliderList=>[...sliderList,doc.data()]);
    });
  }  
  // used to get category list 
  const getCategoryList=async()=>{

    setCategoryList([]);
    
    const querySnapshot=await getDocs(collection(db,'Types'))

    querySnapshot.forEach((doc)=>{
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }





  return (
    <View className="py-8 px-6  flex-1"> 
    <Header/> 
    <Slider sliderList={sliderList}/> 
    <Categories categoryList={categoryList}/>
     
    </View>
  )
}