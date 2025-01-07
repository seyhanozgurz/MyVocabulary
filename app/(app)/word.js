import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  widthPersentage as wp,
  heightPersentage as hp,
} from "../../components/responsiveCalculator";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { doc, deleteDoc } from "firebase/firestore";
import { getWordsRef } from "../../redux/services/firebaseRefs";
import Colors from "../../assets/colors";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

export default function word() {
  const { item, index, wordListLength } = useLocalSearchParams();

  const wordObject = JSON.parse(item);

  const { words } = useSelector((state) => state.words);

  // definition area won't be appear until clicked.
  const [showDefinition, setShowDefinition] = useState(false);
  useEffect(() => {
    setShowDefinition(false);
  }, [index]);

  const toggleDefinition = () => {
    setShowDefinition((prev) => !prev); // durumu terse çevir
  };

  const nextWord = () => {
    const nextIndex = parseInt(index) + 1;
    if (index < wordListLength - 1) {
      router.navigate({
        pathname: "word",
        params: {
          item: JSON.stringify(words[nextIndex]),
          index: nextIndex,
          wordListLength: wordListLength,
        },
      });
    } else {
      Alert.alert("The end...", "There is no more words!");
    }
  };

  const previousWord = () => {
    const previousIndex = parseInt(index) - 1;
    if (index > 0) {
      router.navigate({
        pathname: "word",
        params: {
          item: JSON.stringify(words[previousIndex]),
          index: previousIndex,
          wordListLength: wordListLength,
        },
      });
    } else {
      Alert.alert("You are at the first word!");
    }
  };

  const backHome = () => {
    router.back();
  };

  const deleteWord = async () => {
    const wordsRef = await getWordsRef();
    Alert.alert("Delete", "Are you sure you want to delete?", [
      {
        text: "YES",
        onPress: async () => {
          await deleteDoc(doc(wordsRef, wordObject.id));
          if (index == wordListLength - 1) {
            previousWord();
          } else {
            nextWord();
          }
        },
      },
      { text: "NO" },
    ]);
  };

  const randomWord = () => {
    let randomIndex = Math.floor(Math.random() * wordListLength);
    if (randomIndex == index) {
      randomIndex = Math.floor(Math.random() * wordListLength);
    }
    router.navigate({
      pathname: "word",
      params: {
        item: JSON.stringify(words[randomIndex]),
        index: randomIndex,
        wordListLength: wordListLength,
      },
    });
  };

  const handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      `https://dictionary.cambridge.org/dictionary/english/${wordObject.word}`
    );
    console.log(result && JSON.stringify(result));
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={[Colors.darkBlue, Colors.darkPink]}
    >
      <View style={styles.container}>
        <ScrollView>
          {wordObject.imageLink ? (
            <Image
              style={styles.image}
              source={{
                uri: wordObject.imageLink,
              }}
            ></Image>
          ) : (
            <></>
          )}
          <TouchableOpacity onPress={handlePressButtonAsync}>
            <Text style={styles.word}>{wordObject.word}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleDefinition}
            style={styles.definitionContainer}
          >
            <Text style={styles.definitionText}>definition</Text>

            {showDefinition ? ( //duruma bağlı olarak göster
              <Text style={styles.definition}>{wordObject.definition}</Text>
            ) : (
              <Text style={styles.clickDefinitionText}>CLICK</Text>
            )}
          </TouchableOpacity>

          <View style={styles.examplesContainer}>
            <Text style={styles.examplesText}>examples</Text>
            <View>
              <Text style={styles.examples}>{wordObject.examples}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={previousWord}>
          <Feather name="chevron-left" size={hp(5)} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteWord}>
          <FontAwesome5 name="trash-alt" size={hp(3)} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={backHome}>
          <AntDesign name="home" size={hp(3.5)} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={randomWord}>
          <FontAwesome5 name="random" size={hp(3)} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextWord}>
          <Feather name="chevron-right" size={hp(5)} color={"white"} />
        </TouchableOpacity>
      </View>
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
    alignSelf: "center",
    width: hp(20),
    height: hp(20),
    marginTop: hp(2),
    borderRadius: 10,
    elevation: 10,
  },
  word: {
    fontSize: hp(4.5),
    fontWeight: "600",
    color: Colors.darkBlue,
    margin: hp(2),
    alignSelf: "center",
  },
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
    elevation: 5,
  },
  definition: {
    fontSize: hp(3),
    fontWeight: "500",
    color: "black",
  },
  clickDefinitionText: {
    alignSelf: "center",
    fontSize: hp(2.5),
    color: "gray",
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
    elevation: 5,
  },
  examples: { fontSize: hp(3), color: "black" },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
  },
});
