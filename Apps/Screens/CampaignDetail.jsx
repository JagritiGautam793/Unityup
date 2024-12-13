import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CampaignDetailScreen = () => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Join me in supporting the Ocean Conservation Campaign! Learn more and contribute here: https://example.com/campaign",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing the campaign:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: "https://example.com/campaign-image.jpg" }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.imageOverlay}
          >
            <Text style={styles.campaignTitle}>
              Ocean Conservation Campaign
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>$52,375</Text>
              <Text style={styles.statLabel}>Raised</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>68%</Text>
              <Text style={styles.statLabel}>Goal Reached</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Donors</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About This Campaign</Text>
            <Text style={styles.description}>
              This campaign focuses on preserving marine ecosystems and
              protecting endangered species in our oceans. Join us in making a
              difference by contributing to this noble cause.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Key Initiatives</Text>
            <View style={styles.initiativeContainer}>
              <View style={styles.initiativeItem}>
                <Ionicons name="water" size={24} color="#007bff" />
                <Text style={styles.initiativeText}>
                  Marine life conservation programs
                </Text>
              </View>
              <View style={styles.initiativeItem}>
                <Ionicons name="trash" size={24} color="#007bff" />
                <Text style={styles.initiativeText}>
                  Ocean pollution cleanup drives
                </Text>
              </View>
              <View style={styles.initiativeItem}>
                <Ionicons name="megaphone" size={24} color="#007bff" />
                <Text style={styles.initiativeText}>
                  Awareness campaigns on sustainable practices
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.primaryActionButton}
              activeOpacity={0.7}
            >
              <Text style={styles.primaryActionButtonText}>Donate Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryActionButton}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryActionButtonText}>
                Share Campaign
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroImageContainer: {
    height: 250,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
    padding: 15,
  },
  campaignTitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  statLabel: {
    fontSize: 14,
    color: "#6c757d",
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#343a40",
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
    lineHeight: 24,
  },
  initiativeContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  initiativeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  initiativeText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#343a40",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryActionButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  primaryActionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryActionButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  secondaryActionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CampaignDetailScreen;
