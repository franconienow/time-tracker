import fetchData from "./components/fetchData";
import getImageByKey from "./components/getImageByKey";
import "./main.css";
const timeTracker = document.querySelector("#time-tracker-cards");
import iconEllipsis from "./images/icon-ellipsis.svg";

const appendCard = (data) => {
  const template = `
    <div class="relative rounded-lg ${data.meta.color} pt-11">
      <img class="absolute right-0 top-0" src="${getImageByKey(data.meta.icon + ".svg")}" width="60" height="60">
      <div class="relative rounded-lg bg-indigo-900 p-7">
        <div class="flex justify-between items-center pb-7">
          <span class="font-semibold">${data.title}</span>
          <img src=${iconEllipsis}/>
        </div>
        <span class="block text-6xl pb-4">${
          data.timeframes.weekly.current
        }hrs</span>
        <span class="block text-gray-300">${
          data.timeframes.weekly.current
        }hrs</span>
      </div>
    </div>
  `;
  timeTracker.insertAdjacentHTML("beforeend", template);
};

const main = async () => {
  const activities = await fetchData();
  activities.forEach((activity) => {
    console.log(activity);
    appendCard(activity);
  });
};

main();
