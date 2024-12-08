import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Categories from "../Components/HomeScreen/Campaigns";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const ExploreScreen = () => {
  const db = getFirestore(app);
  // default value as an empty
  const navigation = useNavigation();

  const [campaignList, setCampaignList] = useState([]);

  useEffect(() => {
    getCampaignList();
  }, []);

  const getCampaignList = async () => {
    setCampaignList([]);

    const querySnapshot = await getDocs(collection(db, "Campaigns"));

    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCampaignList((campaignList) => [...campaignList, doc.data()]);
    });
  };

  const [announ, setAnnoun] = useState(data);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    getAnnoun();
  }, []);

  const getAnnoun = async () => {
    setAnnoun([]);

    const querySnapshot = await getDocs(collection(db, "Announcements"));

    querySnapshot.forEach((doc) => {
      console.log("annData:", doc.data());
      setAnnoun((announ) => [...announ, doc.data()]);
    });
  };
  const data = [];

  // const data = [
  //   {
  //     id: 1,
  //     title: "Annual Community Picnic",
  //     text: "Join us this Saturday for our annual Community Picnic at Central Park! Enjoy a day filled with games, music, food, and fun. Don't miss out on this opportunity to connect with your neighbors and celebrate our community spirit! ",
  //     time: "1 day ago",
  //     likes: 0,
  //     comments: 0,
  //   },
  //   {
  //     id: 2,
  //     title: "Infrastructure Update",
  //     text: "We're excited to announce that construction on Main Street will begin next week to repair potholes and improve road safety. Please be advised of temporary road closures and plan alternate routes during this time. Thank you for your patience as we work to enhance our community's infrastructure.",
  //     time: "2 minutes ago",
  //     likes: 0,
  //     comments: 0,
  //   },
  //   {
  //     id: 3,
  //     title: "Neighborhood Watch Meeting",
  //     text: "Attention neighbors: Our next Neighborhood Watch meeting will be held this Thursday at the community center. Join us to discuss safety concerns, share updates, and collaborate on strategies to keep our neighborhood secure. Together, we can make a difference",
  //     time: "3 hours ago",
  //     likes: 0,
  //     comments: 0,
  //   },
  //   {
  //     id: 4,
  //     title: "Local Business Spotlight!!",
  //     time: "4 months ago",
  //     text: "Introducing our newest addition to the neighborhood: The Green Bean Café! Swing by for a delicious cup of coffee, freshly baked pastries, and a cozy atmosphere. Let's show our support for local businesses and welcome them to our community!",
  //     likes: 0,
  //     comments: 0,
  //   },
  //   {
  //     id: 5,
  //     title: "Public Health Notice",
  //     time: "5 weeks ago",
  //     text: "Attention residents: With the flu season approaching, it's important to prioritize your health and well-being. Remember to get your flu shot, practice good hygiene habits, and stay home if you're feeling unwell. Let's work together to keep our community healthy and safe!",
  //     likes: 0,
  //     comments: 0,
  //   },
  // ];

  const handleLike = async (postId) => {
    // Ensure postId (which is actually the custom id you're assigning) is valid
    if (!postId) {
      console.error("Post ID is missing.");
      return;
    }

    try {
      // Reference to the "Announcements" collection
      const announcementsRef = collection(db, "Announcements");

      // Query to find the document with the specific id
      const querySnapshot = await getDocs(announcementsRef);
      let targetDocRef = null;

      // Find the document with the matching 'id' field
      querySnapshot.forEach((docSnap) => {
        if (docSnap.data().id === postId) {
          targetDocRef = doc(db, "Announcements", docSnap.id); // Using the Firestore document ID
        }
      });

      // If we found the document, update the 'likes' field
      if (targetDocRef) {
        // Increment the 'likes' field by 1
        await updateDoc(targetDocRef, {
          likes: increment(1),
        });
        console.log("Likes updated successfully!");
      } else {
        console.error("Document with id " + postId + " not found.");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleComment = (postId) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      updatedComments[postId] = (updatedComments[postId] || 0) + 1;
      return updatedComments;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Categories categoryList={campaignList} />

      <View style={styles.header}>
        <Text style={styles.heading}>Latest News and Updates</Text>
      </View>
      <FlatList
        style={styles.list}
        data={announ}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.card}>
              <Image style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.text}>{item.text}</Text>
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.socialBarButton}
                    onPress={() => handleLike(item.id)}
                  >
                    <Image
                      style={styles.icon}
                      source={{
                        uri: "https://img.icons8.com/color/70/000000/filled-like.png",
                      }}
                    />
                    <Text style={styles.socialBarLabel}>
                      {likes[item.id] || 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialBarButton}
                    onPress={() => {
                      navigation.navigate("Comments", {
                        postId: item.id,
                        comments: item.comments,
                      });
                    }}
                  >
                    <Image
                      style={styles.icon}
                      source={{
                        uri: "https://cdn-icons-png.freepik.com/256/1370/1370907.png?uid=R142649988&ga=GA1.1.1223597880.1711173553&semt=ais_hybrid",
                      }}
                    />
                    <Text style={styles.socialBarLabel}>
                      {comments[item.id] || 0}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    padding: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
  },
  list: {
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 1,
  },
  card: {
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#ffffff",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 13,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0,
  },
  cardImage: {
    flex: 1,
    height: 20,
    width: null,
  },
  title: {
    fontSize: 17,
    color: "#000000",
    marginTop: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#000000",
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  socialBarContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  socialBarButton: {
    gap: 2,
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialBarLabel: {
    marginLeft: 4,
  },
});

export default ExploreScreen;

// import { View, Text, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
// import { app } from '../../firebaseConfig'
// import LatestItemList from '../Components/HomeScreen/LatestItemList'

// export default function ExploreScreen() {

//   const db=getFirestore(app)
//   const[productList,setProductList]=useState([]);

//   useEffect(()=>{
//       getAllProducts();
//   },[])

//   // in order to fetch the data
//   const getAllProducts=async()=>{
//     setProductList([]);

//     const q=query(collection(db,'UserIssue'),orderBy('createdAt','desc'));
//     const snapshot=await getDocs(q);
//     snapshot.forEach((doc)=>{
//       console.log(doc.data());
//       setProductList(productList=>[...productList,doc.data()]);

//     })

//   }

//   return (
//     <ScrollView className="p-5 py-8">
//       <Text className="text-[30px] font-bold">Explore More</Text>
//       <LatestItemList latestItemList={productList}/>
//     </ScrollView>
//   )
// }

// ExploreScreen.js
// import React, { useState } from 'react';
// import { FlatList, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// export default function ExploreScreen({ handleLike, handleComment }) {
//   const [posts, setPosts] = useState([
//     // Your post data...
//   ]);

//   return (
//     <FlatList
//       data={posts}
//       renderItem={({ item }) => (
//         <TouchableOpacity onPress={() => handleComment(item)}>
//           <View style={styles.card}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.time}>{item.time}</Text>
//             <Text style={styles.text}>{item.text}</Text>
//             <View style={styles.buttonsContainer}>
//               <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.button}>
//                 <Text style={styles.buttonText}>Like</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => handleComment(item)} style={styles.button}>
//                 <Text style={styles.buttonText}>Comment</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}
//       keyExtractor={(item) => item.id.toString()}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#ffffff',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   time: {
//     fontSize: 12,
//     color: '#808080',
//   },
//   text: {
//     fontSize: 14,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
// });

// ExploreScreen.js
// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

// const ExploreScreen = () => {
//   const data = [
//     {
//       id: 1,
//       title: "Annual Community Picnic",
//       text: "Join us this Saturday for our annual Community Picnic at Central Park! Enjoy a day filled with games, music, food, and fun. Don't miss out on this opportunity to connect with your neighbors and celebrate our community spirit! ",
//       time: '1 day ago',
//       likes: 0,
//       comments: 0,
//     },
//     {
//       id: 2,
//       title: 'Infrastructure Update',
//       text: "We're excited to announce that construction on Main Street will begin next week to repair potholes and improve road safety. Please be advised of temporary road closures and plan alternate routes during this time. Thank you for your patience as we work to enhance our community's infrastructure.",
//       time: '2 minutes ago',
//       likes: 0,
//       comments: 0,
//     },
//     {
//       id: 3,
//       title: 'Neighborhood Watch Meeting',
//       text: "Attention neighbors: Our next Neighborhood Watch meeting will be held this Thursday at the community center. Join us to discuss safety concerns, share updates, and collaborate on strategies to keep our neighborhood secure. Together, we can make a difference",
//       time: '3 hours ago',
//       likes: 0,
//       comments: 0,
//     },
//     {
//       id: 4,
//       title: 'Local Business Spotlight!!',
//       time: '4 months ago',
//       text: "Introducing our newest addition to the neighborhood: The Green Bean Café! Swing by for a delicious cup of coffee, freshly baked pastries, and a cozy atmosphere. Let's show our support for local businesses and welcome them to our community!",
//       likes: 0,
//       comments: 0,
//     },
//     {
//       id: 5,
//       title: 'Public Health Notice',
//       time: '5 weeks ago',
//       text: "Attention residents: With the flu season approaching, it's important to prioritize your health and well-being. Remember to get your flu shot, practice good hygiene habits, and stay home if you're feeling unwell. Let's work together to keep our community healthy and safe!",
//       likes: 0,
//       comments: 0,
//     },
//   ];

//   const [posts, setPosts] = useState(data);
//   const [likes, setLikes] = useState({});
//   const [comments, setComments] = useState({});

//   const handleLike = (postId) => {
//     setLikes((prevLikes) => {
//       const updatedLikes = { ...prevLikes };
//       updatedLikes[postId] = (updatedLikes[postId] || 0) + 1;
//       return updatedLikes;
//     });
//   };

//   const handleComment = (postId) => {
//     setComments((prevComments) => {
//       const updatedComments = { ...prevComments };
//       updatedComments[postId] = (updatedComments[postId] || 0) + 1;
//       return updatedComments;
//     });
//   };

//   // Rest of your component code...
// };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.heading}>Latest News and Updates</Text>
//       </View>
//       <FlatList
//         style={styles.list}
//         data={posts}
//         keyExtractor={(item) => item.id.toString()}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         renderItem={({ item }) => (
//           <TouchableOpacity>
//             <View style={styles.card}>
//               <Image style={styles.cardImage} />
//               <View style={styles.cardContent}>
//                 <View>
//                   <Text style={styles.title}>{item.title}</Text>
//                   <Text style={styles.time}>{item.time}</Text>
//                   <Text style={styles.text}>{item.text}</Text>
//                 </View>
//                 <View style={styles.cardFooter}>
//                   <TouchableOpacity style={styles.socialBarButton} onPress={() => handleLike(item.id)}>
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/color/70/000000/filled-like.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>{likes[item.id] || 0}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.socialBarButton} onPress={() => handleComment(item.id)}>
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/ios-glyphs/75/ffffff/comments.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>{comments[item.id] || 0}</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... (your styles)
// });

// export default ExploreScreen;

// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

// export default function ExploreScreenStack() {
//   const data = [
//     {
//       id: 1,
//       title: "Annual Community Picnic",
//       text: "Join us this Saturday for our annual Community Picnic at Central Park! Enjoy a day filled with games, music, food, and fun. Don't miss out on this opportunity to connect with your neighbors and celebrate our community spirit! ",
//       time: '1 day ago',
//       likes:0,
//       comments:0,
//     },
//     {
//       id: 2,
//       title: 'Infrastructure Update',
//       text: "We're excited to announce that construction on Main Street will begin next week to repair potholes and improve road safety. Please be advised of temporary road closures and plan alternate routes during this time. Thank you for your patience as we work to enhance our community's infrastructure.",
//       time: '2 minutes ago',
//       likes:0,
//       comments:0,
//     },
//     {
//       id: 3,
//       title: 'Neighborhood Watch Meeting',
//       text: "Attention neighbors: Our next Neighborhood Watch meeting will be held this Thursday at the community center. Join us to discuss safety concerns, share updates, and collaborate on strategies to keep our neighborhood secure. Together, we can make a difference",
//       time: '3 hours ago',
//       likes:0,
//       comments:0,
//     },
//     {
//       id: 4,
//       title: 'Local Business Spotlight!!',
//       time: '4 months ago',
//       text: "Introducing our newest addition to the neighborhood: The Green Bean Café! Swing by for a delicious cup of coffee, freshly baked pastries, and a cozy atmosphere. Let's show our support for local businesses and welcome them to our community!",
//       likes:0,
//       comments:0,
//     },
//     {
//       id: 5,
//       title: 'Public Health Notice',
//       time: '5 weeks ago',
//       text: "Attention residents: With the flu season approaching, it's important to prioritize your health and well-being. Remember to get your flu shot, practice good hygiene habits, and stay home if you're feeling unwell. Let's work together to keep our community healthy and safe!",
//       likes:0,
//       comments:0,
//     },
//   ];

//   const [posts, setPosts] = useState(data);

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.heading}>Latest News and Updates</Text>
//       </View>
//       <FlatList
//         style={styles.list}
//         data={posts}
//         keyExtractor={item => item.id.toString()}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         renderItem={({ item }) => (
//           <TouchableOpacity>
//             <View style={styles.card}>
//               <Image style={styles.cardImage} />
//               <View style={styles.cardContent}>
//                 <View>
//                   <Text style={styles.title}>{item.title}</Text>
//                   <Text style={styles.time}>{item.time}</Text>
//                   <Text style={styles.text}>{item.text}</Text>
//                 </View>
//                 <View style={styles.cardFooter}>
//                   <TouchableOpacity style={styles.socialBarButton}>
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/color/70/000000/filled-like.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>78</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={styles.socialBarButton}>
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/ios-glyphs/75/ffffff/comments.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>25</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
//   header: {
//     padding: 10,
//   },
//   heading: {
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   list: {
//     backgroundColor: '#E6E6E6',
//   },
//   separator: {
//     marginTop: 1,
//   },
//   card: {
//     margin: 0,
//     borderRadius: 2,
//     borderWidth: 1,
//     borderColor: '#DCDCDC',
//     backgroundColor: '#ffffff',
//   },
//   cardContent: {
//     paddingVertical: 12.5,
//     paddingHorizontal: 16,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 13,
//     paddingBottom: 0,
//     paddingVertical: 7.5,
//     paddingHorizontal: 0,
//   },
//   cardImage: {
//     flex: 1,
//     height: 250,
//     width: null,
//   },
//   title: {
//     fontSize: 14,
//     color: '#000000',
//     marginTop: 10,
//     fontWeight: 'bold',
//   },
//   text: {
//     fontSize: 10,
//     color: '#000000',
//   },
//   time: {
//     fontSize: 13,
//     color: '#808080',
//     marginTop: 5,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
//   socialBarContainer: {
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//     flex: 1,
//   },
//   socialBarButton: {
//     gap: 2,
//     marginLeft: 8,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialBarLabel: {
//     marginLeft: 4,
//   },
// });
