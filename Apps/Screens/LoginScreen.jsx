import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useOAuth, useUser } from "@clerk/clerk-expo";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

// Firebase Firestore instance
const firestore = getFirestore(firebaseApp);

// Function to store user in Firebase
const storeUserInFirebase = async (userData) => {
  try {
    const userRef = doc(firestore, "users", userData.userId);
    await setDoc(userRef, userData, { merge: true });
    console.log("User stored in Firebase successfully");
  } catch (error) {
    console.error("Error storing user in Firebase:", error);
    Alert.alert("Error", "Failed to store user information");
  }
};

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { user } = useUser();

  const onPress = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });

        if (user) {
          const userData = {
            userId: user.id,
            email: user.emailAddresses[0]?.emailAddress || "",
            username: user.username || "",
            profileImage: user.profileImageUrl || "",
          };

          console.log("User Data:", userData);

          // Store user data in Firebase
          await storeUserInFirebase(userData);
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("./../../assets/images/Urbanex.jpeg")}
        style={{ width: "100%", height: 400, resizeMode: "cover" }}
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Unity Up
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#6B7280",
            marginTop: 12,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          "Empowering Voices, Building Better Neighborhoods!"
        </Text>
        {error && (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 12 }}>
            {error}
          </Text>
        )}
        <TouchableOpacity
          onPress={onPress}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 40,
            backgroundColor: "#3B82F6",
            borderRadius: 50,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: "white", fontSize: 18 }}>Get Started</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
