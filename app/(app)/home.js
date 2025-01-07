import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import {
  widthPersentage as wp,
  heightPersentage as hp,
} from "../../components/responsiveCalculator";
import { LinearGradient } from "expo-linear-gradient";
import Loading from "../../components/loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchThunk } from "../../redux/thunks/fetchThunk";
import { Divider, SearchBar } from "@rneui/base";
import WordButton from "../../components/WordButton";
import { StatusBar } from "expo-status-bar";
import dumyData from "../../assets/dumyData"

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchThunk());
  }, [dispatch]);
  // tum kelimeler yukleniyor
  const { words, loading, error } = useSelector((state) => state.words);

  // ana ekrana geldiğinde kelimelerin yenilenmesi için
  //const pathname = usePathname();
  //console.log(pathname)

  // Aranan kelime atanıyor.
  const [search, setSearch] = useState("");
  const [filteredWords, setFilteredWords] = useState(words);

  useEffect(() => {
    //eğer aranan kelime boşsa tüm kelimeler görünecek
    if (search.trim == "") {
      setFilteredWords(words);
    } else {
      const filtered = words.filter((word) =>
        word.word.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredWords(filtered);
    }
  }, [search, words]);

  const [refreshing, setRefreshing] = useState(false);
  // sayfa yenilendiğinde tekrar veriler çekilecek
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchThunk()).finally(() => setRefreshing(false));
  }, []);

  const handlePress = (item) => {
    const index = words.findIndex((word) => word.word === item.word);

    router.navigate({
      pathname: "word",
      params: {
        item: JSON.stringify(item),
        index: index,
        wordListLength: words.length,
      },
    });
  };

  const renderItem = ({ item, index }) => (
    <WordButton item={item} index={index} onPress={handlePress} />
  );

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["#b5c6e0", "#f0f6f8", "#b5c6e0"]}
      start={[0, 1]}
      end={[1, 0]}
    >
      <StatusBar />
      <SearchBar
        platform="android"
        containerStyle={styles.searchBar}
        onChangeText={setSearch}
        placeholder="Search..."
        placeholderTextColor="gray"
        value={search}
      />
      {loading ? (
        <Loading size={hp(20)}></Loading>
      ) : words.length == 0 ? (
        // <Text>There is no word yet. Please add new word.</Text>
        <FlatList
          data={dumyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.word}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          data={filteredWords}
          renderItem={renderItem}
          keyExtractor={(item) => item.word}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 20,
    marginTop: 25,
    width: wp(80),
    height: wp(10),
    alignSelf: "center",
    justifyContent: "center",
  },
});
