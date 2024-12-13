import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { app } from "../../firebaseConfig";

// Placeholder comment data
const DUMMY_COMMENTS = [
  {
    id: "1",
    userName: "John Doe",
    text: "This is an amazing post! I really enjoyed reading it.",
    timestamp: "2 hours ago",
    userAvatar: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    userName: "Jane Smith",
    text: "Great insights shared here. Looking forward to more content like this.",
    timestamp: "1 hour ago",
    userAvatar: "https://via.placeholder.com/50",
  },
  {
    id: "3",
    userName: "Mike Johnson",
    text: "Could you elaborate more on this topic? Very interesting!",
    timestamp: "30 mins ago",
    userAvatar: "https://via.placeholder.com/50",
  },
];

const CommentScreen = ({ route }) => {
  const db = getFirestore(app);
  const [commentText, setCommentText] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const { user } = useUser();
  console.log(user.id, user.primaryEmailAddress?.emailAddress, user.fullName);
  const annIdRef = route.params.announID;
  console.log("Announcement ID:", annIdRef);

  const navigation = useNavigation();

  // Fetch comments from the database of the current announcement annIdRef
  useEffect(() => {
    const getAnnComments = async () => {
      if (user) {
        try {
          console.log("Fetching comments for announcement:", annIdRef);
          const q = query(
            collection(db, "Comments"),
            where("AnnId", "==", annIdRef)
          );
          const snapshot = await getDocs(q);
          const comments = [];
          snapshot.forEach((doc) => {
            console.log(doc.data());
            comments.push(doc.data());
          });
          setCommentsList(comments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    };

    // Call getAnnComments when the component mounts or when the navigation focus changes
    getAnnComments();

    // Add a listener to re-fetch comments when the navigation focus changes
    const unsubscribe = navigation.addListener("focus", getAnnComments);
    console.log(commentsList);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const handleCommentSubmit = async () => {
    try {
      const submissionData = {
        AnnId: annIdRef,
        UserId: user.id,
        UserAvatar: user.imageUrl,
        UserName: user.fullName,
        createdAt: Date.now(),
        UserComment: commentText.trim(),
      };
      // add a new comment to the database
      await addDoc(collection(db, "Comments"), submissionData);

      // prev - > 4 comment ["1","2","3","4"]
      // prev - > 5 comment ["1","2","3","4","5"]
      setCommentsList((prev) => [...prev, submissionData]);
      setCommentText("");
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Render individual comment
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image source={{ uri: item.UserAvatar }} style={styles.userAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.userName}>{item.UserName}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.commentText}>{item.UserComment}</Text>

        {/* Like and Reply Actions */}
        {/* <View style={styles.commentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Comments Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Comments</Text>
        <Text style={styles.commentCount}>{commentsList.length} Comments</Text>
      </View>

      {/* Comments List */}
      <FlatList
        data={commentsList}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.commentsList}
      />

      {/* Comment Input Area */}
      <View style={styles.inputContainer}>
        <Image
          source={{ uri: user.imageUrl || "https://via.placeholder.com/40" }}
          style={styles.currentUserAvatar}
        />
        <TextInput
          style={styles.input}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Write a comment..."
          multiline
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          style={styles.sendButton}
          disabled={!commentText.trim()}
          onPress={handleCommentSubmit}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  commentCount: {
    color: "#888",
  },
  commentsList: {
    paddingBottom: 20,
  },
  commentContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: "white",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timestamp: {
    color: "#888",
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: "row",
    marginTop: 10,
  },
  actionButton: {
    marginRight: 15,
  },
  actionText: {
    color: "#888",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "white",
  },
  currentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    opacity: 0.5,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CommentScreen;
