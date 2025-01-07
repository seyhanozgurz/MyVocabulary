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
import { Fontisto } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/loading";

import { useAuth } from "../context/authContext";
import { StatusBar } from "expo-status-bar";

export default function SignIn() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the blank fields!");
      return;
    }
    setLoading(true);

    const response = await login(emailRef.current, passwordRef.current);
    //console.log(response);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign In", response.message);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 90 }}
        style={styles.container}
      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require("../assets/images/vocabulary-image.jpg")}
        />

        <View>
          {/* <Text style={styles.SignInText}>Sign In</Text> */}
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
            <Fontisto name="locked" size={hp(2.5)} color="gray" />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
            />
          </View>
          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </View>

        {/* Sign in button */}
        <View>
          {loading ? (
            <View>
              <Loading size={hp(15)} />
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin} style={styles.signInBox}>
              <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Pressable
            onPress={() => {
              router.push("signUp");
            }}
          >
            <Text style={styles.signUp}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(10),
    paddingHorizontal: wp(2),
  },
  image: { height: wp(50), alignSelf: "center", marginVertical: wp(5) },
 
  inputBox: {
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    paddingLeft: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
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
    backgroundColor: "#150085",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpText: {
    fontSize: hp(1.8),
    textAlign: "center",
    paddingTop: 10,
    color: "gray",
    fontWeight: "500",
  },
  signIn: {
    fontSize: hp(2.7),
    fontWeight: "bold",
    color: "white",
  },
  signUp: {
    fontSize: hp(2),
    paddingTop: 10,
    color: "#150085",
    fontWeight: "bold",
  },
});
