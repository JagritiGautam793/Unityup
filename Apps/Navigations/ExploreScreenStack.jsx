// ExploreScreenStack.js
// import React from 'react';
// import { ScrollView, Text } from 'react-native';
// import ExploreScreen from '../Screens/ExploreScreen';

// export default function ExploreScreenStack() {
//   return (
//     <ScrollView>
//       <ExploreScreen />
//     </ScrollView>
//   );
// }

// ExploreScreenStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExploreScreen from "../Screens/ExploreScreen";
import CommentScreen from "../Screens/CommentScreen";

const Stack = createStackNavigator();

const ExploreScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ExploreScreenStack;

// // ExploreScreenStack.js
// import React, { useState } from 'react';
// import { ScrollView } from 'react-native';
// import ExploreScreen from '../Screens/ExploreScreen';

// export default function ExploreScreenStack() {
//   // Function to handle like action

//   const [posts, setPosts] = useState(data);
//   const [likes, setLikes] = useState({}); // { postId: likeCount }
//   const [comments, setComments] = useState({}); // { postId: commentCount }

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

//   return (
//     <ScrollView>
//       <ExploreScreen handleLike={handleLike} handleComment={handleComment} />
//     </ScrollView>
//   );
// }

// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

// export default function ExploreScreenStack() {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       title: "Annual Community Picnic",
//       text: "Join us this Saturday for our annual Community Picnic at Central Park! Enjoy a day filled with games, music, food, and fun. Don't miss out on this opportunity to connect with your neighbors and celebrate our community spirit!",
//       time: '1 day ago',
//       likes: 78,
//       comments: 25,
//     },
//     // Add more posts as needed...
//   ]);

//   const handleLike = (id) => {
//     // Find the post by id and update its likes count
//     const updatedPosts = posts.map(post =>
//       post.id === id ? { ...post, likes: post.likes + 1 } : post
//     );
//     setPosts(updatedPosts);
//   };

//   const handleComment = (id) => {
//     // Navigate to the comment screen or implement comment functionality as needed
//     console.log(`Navigate to comment screen for post with id ${id}`);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.heading}>Latest News and Updates</Text>
//       </View>
//       <FlatList
//         style={styles.list}
//         data={posts}
//         keyExtractor={item => item.id.toString()}
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
//                   <TouchableOpacity
//                     style={styles.socialBarButton}
//                     onPress={() => handleLike(item.id)}
//                   >
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/color/70/000000/filled-like.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>{item.likes}</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.socialBarButton}
//                     onPress={() => handleComment(item.id)}
//                   >
//                     <Image
//                       style={styles.icon}
//                       source={{
//                         uri: 'https://img.icons8.com/ios-glyphs/75/ffffff/comments.png',
//                       }}
//                     />
//                     <Text style={styles.socialBarLabel}>{item.comments}</Text>
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
