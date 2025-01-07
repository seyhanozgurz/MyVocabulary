import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPersentage as wp,
  heightPersentage as hp,
} from "../../components/responsiveCalculator";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TouchableOpacity } from "react-native";
import { addDoc } from "firebase/firestore";
import { wordsRef } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addWordThunk } from "../../redux/thunks/addWordThunk";
import Loading from "../../components/addWordLoading";
import Colors from "../../assets/colors";
import { Divider } from "@rneui/base";

export default function addWord() {
  const dispatch = useDispatch();

  const [imageLink, setImageLink] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [examples, setExamples] = useState("");

  const { loading, error } = useSelector((state) => state.addWord);
  //console.log("addWord:", loading);

  const handleSave = async () => {
    dispatch(addWordThunk({ word, definition, examples, imageLink }));

    setImageLink("");
    setWord("");
    setDefinition("");
    setExamples("");
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.darkBlue, Colors.darkPink,]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {loading ? (
        <View style={styles.container}>
          <Loading size={hp(30)}></Loading>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <TextInput
              style={styles.image}
              placeholder="Enter image link"
              value={imageLink}
              onChangeText={setImageLink}
            />
            <TextInput
              style={styles.word}
              placeholder="enter word"
              value={word}
              onChangeText={setWord}
            />

            <View style={styles.definitionContainer}>
              <Text style={styles.definitionText}>definition</Text>
              <TextInput
                style={{ fontSize: hp(3) }}
                multiline={true}
                onChangeText={setDefinition}
                value={definition}
              />
            </View>

            <View style={styles.examplesContainer}>
              <Text style={styles.examplesText}>examples</Text>

              <TextInput
                style={{ fontSize: hp(3) }}
                multiline={true}
                onChangeText={setExamples}
                value={examples}
              />
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>SAVE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4fdff",
    borderColor: "black",
    borderRadius: 50,
    borderWidth: 4,
    marginVertical: hp(5),
    marginHorizontal: wp(5),
    paddingVertical: hp(2),

    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 20,
    // elevation: 5,
  },
  image: {
    fontSize: hp(3),
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.darkBlue,
    borderRadius: 10,
    paddingVertical: hp(8),
    paddingHorizontal: hp(1),
    marginTop: hp(3),
    backgroundColor: "#f4fdff",
    elevation: 10,
  },
  word: { fontSize: hp(5), textAlign: "center", margin: hp(3) },
  definitionText: {
    color: Colors.red,
    position: "absolute",
    paddingHorizontal: 3,
    top: -12,
    alignSelf: "center",
    backgroundColor: "#f4fdff",
    zIndex: 1,
  },
  definitionContainer: {
    position: "relative",
    borderColor: Colors.darkPink,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    maxHeight: hp(30),
    backgroundColor: "#f4fdff",
  },
  definition: {
    fontSize: hp(3),
    fontWeight: "500",
    color: "black",
  },
  examplesText: {
    color: Colors.red,
    position: "absolute",
    paddingHorizontal: 3,
    top: -12,
    alignSelf: "center",
    backgroundColor: "#f4fdff",
    zIndex: 1,
  },
  examplesContainer: {
    flex: 1,
    position: "relative",
    borderColor: Colors.darkPink,
    borderWidth: 2,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 20,
    borderRadius: 10,
    backgroundColor: "#f4fdff",
  },
  examples: { fontSize: hp(3), color: "black" },
  saveButton: {
    backgroundColor: Colors.darkPink,
    color: "white",
    fontSize: hp(3),
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
    borderRadius: 30,
  },
});
