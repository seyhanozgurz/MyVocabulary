import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const widthPersentage = (persentage) => {
  return (persentage * width) / 100;
};
export const heightPersentage = (persentage) => {
  return (persentage * height) / 100;
};
