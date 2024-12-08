import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebaseConfig";

export default function AddPostScreen() {
  const [image, setImage] = useState(null);
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Community"));
    querySnapshot.forEach((doc) => {
      setCategoryList((prev) => [...prev, doc.data()]);
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    setLoading(true);

    try {
      const resp = await fetch(image);
      const blob = await resp.blob();
      const storageRef = ref(storage, `reportedIssues/${Date.now()}.jpeg`);

      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);

      const submissionData = {
        ...value,
        image: downloadUrl,
        userName: user.fullName,
        userEmail: user.primaryEmailAddress.emailAddress,
        userImage: user.imageUrl,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(collection(db, "UserIssue"), submissionData);

      if (docRef.id) {
        setLoading(false);
        Alert.alert(
          "Submission Successful",
          "Your issue has been reported and will be reviewed shortly.",
          [{ text: "OK", onPress: () => {} }]
        );
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Submission Error",
        "We couldn't process your report. Please try again.",
        [{ text: "OK", onPress: () => {} }]
      );
      console.error(error);
    }
  };

  return (
    <LinearGradient colors={["#F7F9FC", "#E9F0F7"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerTitle}>Report an Issue</Text>
              <Text style={styles.headerSubtitle}>
                Your Community, Your Voice
              </Text>
            </View>
            <Ionicons name="shield-checkmark" size={40} color="#4A90E2" />
          </View>

          <Formik
            initialValues={{
              title: "",
              desc: "",
              category: "",
              address: "",
            }}
            onSubmit={onSubmitMethod}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Issue title is required";
              }
              if (!values.category) {
                errors.category = "Please select a category";
              }
              return errors;
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              setFieldValue,
              errors,
            }) => (
              <View style={styles.formContainer}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.imagePicker}
                >
                  {image ? (
                    <View style={styles.imagePreviewContainer}>
                      <Image
                        source={{ uri: image }}
                        style={styles.selectedImage}
                      />
                      <View style={styles.imageOverlay}>
                        <Ionicons name="camera" size={30} color="white" />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.placeholderContainer}>
                      <Ionicons name="cloud-upload" size={50} color="#4A90E2" />
                      <Text style={styles.placeholderText}>
                        Upload Evidence Photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="document-text"
                    size={20}
                    color="#4A90E2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, errors.title && styles.inputError]}
                    placeholder="Briefly describe the issue"
                    placeholderTextColor="#A9A9A9"
                    value={values.title}
                    onChangeText={handleChange("title")}
                  />
                </View>
                {errors.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="information-circle"
                    size={20}
                    color="#4A90E2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.multilineInput}
                    placeholder="Detailed description of the issue"
                    placeholderTextColor="#A9A9A9"
                    value={values.desc}
                    onChangeText={handleChange("desc")}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Ionicons
                    name="location"
                    size={20}
                    color="#4A90E2"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Precise Location Address"
                    placeholderTextColor="#A9A9A9"
                    value={values.address}
                    onChangeText={handleChange("address")}
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <Ionicons
                    name="list"
                    size={20}
                    color="#4A90E2"
                    style={styles.inputIcon}
                  />
                  <Picker
                    selectedValue={values.category}
                    onValueChange={(itemValue) =>
                      setFieldValue("category", itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item
                      label="Select Issue Category"
                      value=""
                      color="#A9A9A9"
                    />
                    {categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                  </Picker>
                </View>
                {errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}

                <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                  <LinearGradient
                    colors={
                      loading ? ["#CCCCCC", "#999999"] : ["#4A90E2", "#1E5FD4"]
                    }
                    style={styles.submitButton}
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <View style={styles.submitButtonContent}>
                        <Ionicons
                          name="send"
                          size={20}
                          color="white"
                          style={styles.submitButtonIcon}
                        />
                        <Text style={styles.submitButtonText}>
                          Submit Issue
                        </Text>
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
    fontStyle: "italic",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  imagePicker: {
    alignSelf: "center",
    marginBottom: 25,
  },
  imagePreviewContainer: {
    position: "relative",
  },
  selectedImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    alignSelf: "center",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContainer: {
    width: 180,
    height: 180,
    borderRadius: 20,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  placeholderText: {
    marginTop: 15,
    color: "#4A90E2",
    fontSize: 15,
    fontWeight: "600",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    fontSize: 16,
    color: "#2C3E50",
  },
  inputError: {
    borderBottomColor: "#E74C3C",
  },
  multilineInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 100,
    color: "#2C3E50",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 30,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 15,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  submitButton: {
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 15,
  },
  submitButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  submitButtonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
