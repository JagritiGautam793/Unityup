// import { View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
// import { app } from '../../firebaseConfig'
// import { useUser } from '@clerk/clerk-expo'
// import LatestItemList from '../Components/HomeScreen/LatestItemList'
// import { useNavigation } from '@react-navigation/native'

// export default function MyProducts() {  
//     const db=getFirestore(app) 
//     const {user}=useUser();   
//     const [productList,setProductList] =useState([]); 
//     const navigation=useNavigation();
//     useEffect(()=>{ 

//         user&&getUserPost();

//     },[user]) 
//     // only when the user will be available then only execute the user post  so that is why useEffect handler  




//     // pls make sue to understand this
//     useEffect(()=>{
//         navigation.addListener('focus',(e)=>{
//         //    in order to get updated post
//             getUserPost();
//         })

//     },[navigation])



//     // in order to get the user post only 
//     const  getUserPost=async()=>{  
//         setProductList([]);
//         const q=query(collection(db,'UserIssue'),where('userEmail','==',user.primaryEmailAddress.emailAddress));
//         const snapshot =await getDocs(q); 
//         snapshot.forEach(doc=>{
             
//             setProductList(productList=>[...productList,doc.data()]);

//         })

//     }
//   return (
//     <View> 
//         <LatestItemList latestItemList={productList}/>
     
//     </View>
//   )
// } 

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {  
    const db = getFirestore(app);
    const { user } = useUser();
    const [productList, setProductList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const getUserPost = async () => {
            if (user) {
                try {
                    const q = query(collection(db, 'UserIssue'), where('userEmail', '==', user.primaryEmailAddress.emailAddress));
                    const snapshot = await getDocs(q);
                    const products = [];
                    snapshot.forEach(doc => {
                        products.push(doc.data());
                    });
                    setProductList(products);
                } catch (error) {
                    console.error('Error fetching user posts:', error);
                }
            }
        };

        // Call getUserPost when the component mounts or when the navigation focus changes
        getUserPost();

        // Add a listener to re-fetch user posts when the navigation focus changes
        const unsubscribe = navigation.addListener('focus', getUserPost);

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            unsubscribe();
        };
    }, [db, user, navigation]);

    return (
        <View> 
            <LatestItemList latestItemList={productList}/>
        </View>
    );
}

