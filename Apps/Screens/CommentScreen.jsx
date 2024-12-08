import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  arrayRemove,
} from "firebase/firestore";
import { firebaseApp } from "../../firebaseConfig";

const firestore = getFirestore(firebaseApp);

const CommentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useUser();

  const [comment, setComment] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [postId, setPostId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserEmail(user.emailAddresses[0]?.emailAddress || "");
    }
    setComments(route.params.comments || []);
    setPostId(route.params.postId);
  }, [route.params, user]);

  const postComment = async () => {
    if (!userEmail || !postId || !comment.trim() || loading) {
      Alert.alert(
        "Error",
        "Invalid input. Please check your comment and try again."
      );
      return;
    }

    setLoading(true);
    try {
      const postRef = doc(firestore, "posts", postId);

      // If editing an existing comment
      if (editingCommentId) {
        // Remove the old comment
        const oldComment = comments.find((c) => c.id === editingCommentId);
        await updateDoc(postRef, {
          comments: arrayRemove(oldComment),
        });

        // Add updated comment
        const updatedComment = {
          ...oldComment,
          comment: comment.trim(),
          timestamp: Timestamp.now(),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(updatedComment),
        });

        // Update local state
        setComments(
          comments.map((c) => (c.id === editingCommentId ? updatedComment : c))
        );

        setEditingCommentId(null);
      } else {
        // Adding a new comment
        const newComment = {
          id: Date.now().toString(), // Unique ID
          userEmail,
          comment: comment.trim(),
          postId,
          timestamp: Timestamp.now(),
        };

        await updateDoc(postRef, {
          comments: arrayUnion(newComment),
        });

        setComments([...comments, newComment]);
      }

      setComment(""); // Clear input field
    } catch (error) {
      console.error("Error updating post:", error);
      Alert.alert("Error", "Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentToDelete) => {
    if (commentToDelete.userEmail !== userEmail) {
      Alert.alert("Error", "You can only delete your own comments.");
      return;
    }

    setLoading(true);
    try {
      const postRef = doc(firestore, "posts", postId);

      await updateDoc(postRef, {
        comments: arrayRemove(commentToDelete),
      });

      // Update local state
      setComments(comments.filter((c) => c.id !== commentToDelete.id));
    } catch (error) {
      console.error("Error deleting comment:", error);
      Alert.alert("Error", "Failed to delete comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const startEditComment = (commentToEdit) => {
    if (commentToEdit.userEmail !== userEmail) {
      Alert.alert("Error", "You can only edit your own comments.");
      return;
    }

    setEditingCommentId(commentToEdit.id);
    setComment(commentToEdit.comment);
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentContent}>
        <Text style={styles.userEmail}>{item.userEmail}</Text>
        <Text>{item.comment}</Text>
      </View>
      {item.userEmail === userEmail && (
        <View style={styles.commentActions}>
          <TouchableOpacity
            onPress={() => startEditComment(item)}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteComment(item)}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {editingCommentId ? "Edit Comment" : "Comments"}
        </Text>
      </View>

      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id}
        style={styles.commentsList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={comment}
          onChangeText={(txt) => setComment(txt)}
          placeholder="Type comment here"
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={postComment}
          disabled={loading}
          style={styles.sendButton}
        >
          <Text
            style={[
              styles.sendButtonText,
              { color: loading ? "#ccc" : "#3B82F6" },
            ]}
          >
            {editingCommentId ? "Update" : loading ? "Sending..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#8e8e8e",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 15,
  },
  backButtonText: {
    fontSize: 18,
  },
  headerTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "600",
  },
  commentsList: {
    flex: 1,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentContent: {
    flex: 1,
    marginRight: 10,
  },
  userEmail: {
    fontWeight: "bold",
  },
  commentActions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    color: "#3B82F6",
  },
  inputContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#8e8e8e",
  },
  textInput: {
    width: "80%",
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    marginRight: 10,
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CommentScreen;
