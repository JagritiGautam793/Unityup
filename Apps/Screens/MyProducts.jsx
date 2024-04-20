import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function MyProducts() {  
    const db=getFirestore(app) 
    const {user}=useUser();   
    const [productList,setProductList] =useState([]); 
    const navigation=useNavigation();
    useEffect(()=>{ 

        user&&getUserPost();

    },[user]) 
    // only when the user will be available then only execute the user post  so that is why useEffect handler  




    // pls make sue to understand this
    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
        //    in order to get updated post
            getUserPost();
        })

    },[navigation])



    // in order to get the user post only 
    const  getUserPost=async()=>{  
        setProductList([]);
        const q=query(collection(db,'UserPost'),where('userEmail','==',user.primaryEmailAddress.emailAddress));
        const snapshot =await getDocs(q); 
        snapshot.forEach(doc=>{
             
            setProductList(productList=>[...productList,doc.data()]);

        })

    }
  return (
    <View> 
        <LatestItemList latestItemList={productList} 

        />
     
    </View>
  )
}
