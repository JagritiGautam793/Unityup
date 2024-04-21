import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() { 
    const {params}=useRoute();  
    const db=getFirestore(app)  
    const [itemList,setItemList]=useState([]); 
    const[loading,setLoading]=useState(false);
    // only when params is there then only we will execute it morover the point is 
    // it will fetch the particular category wale product details
    useEffect(()=>{
       params** getItemListByCategory();
},[params]) 
    const getItemListByCategory=async()=>{ 
        setItemList([]); 
        setLoading(true);
        const q=query(collection(db,'UserIssue'),where('category','==',params.category)) 
        const snapshot=await getDocs(q); 
        setLoading(false)
        snapshot.forEach(doc=>{
            console.log(doc.data());  
            // in order to push the item in existing ones
            setItemList(itemList=>[...itemList,doc.data()]); 
            setLoading(false)
        })
    }
  return (
    <View className="p-2">  
    {loading?
    <ActivityIndicator size={'large'} color={'#3b82f6'}/> 
    :

     itemList?.length>0?<LatestItemList latestItemList={itemList}
      heading={'Latest Post'}/>
      :<Text className="p-5 text-[20px] justify-center text-gray-400 text-center mt-24">No Issue found</Text>}
    </View>
  )
}