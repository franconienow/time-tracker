import Trackers from "./components/Trackers";
import "./main.css";

const main = async () => {
  const trackersEl = document.querySelector("#trackers");
  new Trackers(trackersEl);
};

main();
