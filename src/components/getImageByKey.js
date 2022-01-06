import { find } from "lodash";

const importAllImgs = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAllImgs(
  require.context("../images", false, /\.(png|jpe?g|svg)$/)
);

const getImageByKey = (key) => {
  return images[key];
};

export default getImageByKey;
