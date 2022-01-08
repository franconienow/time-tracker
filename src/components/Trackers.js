export default class Trackers {
  constructor(el) {
    this.el = el;
    this.data = [];
    this.dataURL = "http://localhost:3000/posts";
    this.periods = [
      {
        id: 1,
        label: "daily",
      },
      {
        id: 2,
        label: "weekly",
      },
      {
        id: 3,
        label: "monthly",
      },
    ];
    this.init();
    this.addListeners();
  }

  async init() {
    this.data = await this.getData();
    this.renderCards(this.data, 1);
  }

  async getData() {
    const res = await fetch("http://localhost:3000/posts");
    const json = await res.json();
    return json;
  }

  addListeners() {
    const filters = Array.from(
      this.el.querySelectorAll("#trackers-period-filter > button")
    );
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        this.clearGrid();
        this.renderCards(this.data, filter.dataset["periodId"]);
      });
    });
  }

  renderCards(data, periodId) {
    const period = this.getPeriod(periodId);
    data.forEach((tracker) => {
      this.appendCard({
        color: tracker.meta.color,
        icon: tracker.meta.icon,
        title: tracker.title,
        current: tracker.timeframes[period.label].current,
        previous: tracker.timeframes[period.label].previous,
      });
    });
  }

  getPeriod(id) {
    return this.periods.find((period) => period.id == id);
  }

  appendCard(data) {
    const template = `
      <div class="relative rounded-lg ${data.color} pt-11">
        <img class="absolute right-0 top-0" src="${data.icon}" width="60" height="60">
        <div class="relative rounded-lg bg-indigo-900 p-7">
          <div class="flex justify-between items-center pb-7">
            <span class="font-semibold">${data.title}</span>
            <a href="#" class="p-3">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
              </svg>
            </a>
          </div>
          <span class="block text-6xl pb-4">${data.current}hrs</span>
          <span class="block text-gray-300">${data.previous}hrs</span>
        </div>
      </div>
    `;
    this.el.insertAdjacentHTML("beforeend", template);
  }

  clearGrid() {
    const infoCard = this.el.children[0];
    this.el.innerHTML = "";
    this.el.appendChild(infoCard);
  }
}
