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
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    getAnnoun();
  }, []);

  const getAnnoun = async () => {
    setAnnoun([]);

    const querySnapshot = await getDocs(collection(db, "Announcements"));

    querySnapshot.forEach((doc) => {
      console.log("annData:", doc.data());
      console.log("annId:", doc.id);
      const datawithId = { ...doc.data(), anID: doc.id };
      // console.log("datawithId:", datawithId);
      setAnnoun((announ) => [...announ, datawithId]);
    });
  };

  const data = [];

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
        // Toggle like status
        const isCurrentlyLiked = likedPosts[postId];

        // Update Firestore document
        await updateDoc(targetDocRef, {
          likes: isCurrentlyLiked ? increment(-1) : increment(1),
        });

        // Update local state
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !isCurrentlyLiked,
        }));

        // Update likes count
        setLikes((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + (isCurrentlyLiked ? -1 : 1),
        }));

        console.log(isCurrentlyLiked ? "Unliked" : "Liked" + " successfully!");
      } else {
        console.error("Document with id " + postId + " not found.");
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
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
                  <Text style={styles.text}>{item.anId}</Text>
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.socialBarButton}
                    onPress={() => handleLike(item.id)}
                  >
                    <Image
                      style={styles.icon}
                      source={
                        likedPosts[item.id]
                          ? {
                              uri: "https://img.icons8.com/?size=100&id=DFU1kReSUccu&format=png&color=000000",
                            }
                          : {
                              uri: "https://img.icons8.com/?size=50&id=87&format=png",
                            }
                      }
                    />
                    <Text style={styles.socialBarLabel}>{item.likes || 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialBarButton}
                    onPress={() => {
                      navigation.navigate("Comments", {
                        announID: item.anID,
                      });
                    }}
                  >
                    <Image
                      style={styles.icon}
                      source={{
                        uri: "https://cdn-icons-png.freepik.com/256/1370/1370907.png?uid=R142649988&ga=GA1.1.1223597880.1711173553&semt=ais_hybrid",
                      }}
                    />
                    {/* <Text style={styles.socialBarLabel}>
                      {comments[item.id] || 0}
                    </Text> */}
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
