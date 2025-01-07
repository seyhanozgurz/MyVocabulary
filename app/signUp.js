import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPersentage as wp,
  heightPersentage as hp,
} from "../components/responsiveCalculator";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/loading";
import { useAuth } from "../context/authContext";
import { StatusBar } from "expo-status-bar";

export default function SignUp() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Sign Up", "Please fill all the blank fields!");
      return;
    }
    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    if (!response.success) {
      Alert.alert("Sign Up", response.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        style={styles.container}
      >
        <Image
          style={{ height: wp(60), alignSelf: "center" }}
          resizeMode="contain"
          source={require("../assets/images/welcome.jpg")}
        />

        <View>
          {/* inputs */}
          <View style={styles.inputBox}>
            <Fontisto name="email" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={styles.input}
              placeholder="Email adress"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <FontAwesome name="user" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (usernameRef.current = value)}
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <Fontisto name="locked" size={hp(2.5)} color="gray" />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <FontAwesome name="user-secret" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (profileRef.current = value)}
              style={styles.input}
              placeholder="Profile Url"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Register button */}
        <View>
          {loading ? (
            <View>
              <Loading size={hp(15)} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleRegister} style={styles.signInBox}>
              <Text style={styles.signIn}>Sign Up</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.forgetPassword}>Already have an account? </Text>
          <Pressable
            onPress={() => {
              router.push("signIn");
            }}
          >
            <Text style={styles.signUp}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(6),
    paddingHorizontal: wp(5),
  },
  SignInText: {
    fontSize: hp(4),
    alignSelf: "center",
    fontWeight: "bold",
    color: "#150085",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    paddingLeft: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: hp(6),
    fontSize: hp(2),
    paddingLeft: 10,
  },
  forgetPassword: {
    fontSize: hp(1.8),
    textAlign: "center",
    paddingTop: 10,
    color: "gray",
    fontWeight: "500",
  },
  signInBox: {
    height: hp(7),
    backgroundColor: "#e32722",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signIn: {
    fontSize: hp(2.7),
    fontWeight: "bold",
    color: "white",
  },
  signUp: {
    fontSize: hp(2),
    paddingTop: 10,
    color: "#e32722",
    fontWeight: "bold",
  },
});
