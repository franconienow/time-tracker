export default class Trackers {
  constructor(el) {
    this.el = el;
    this.data = [];
    this.periods = [
      {
        id: 1,
        title: "Day",
        key: "daily",
      },
      {
        id: 2,
        title: "Week",
        key: "weekly",
      },
      {
        id: 3,
        title: "Month",
        key: "monthly",
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
    const res = await fetch("/db.json");
    const json = await res.json();
    return json;
  }

  addListeners() {
    const filters = Array.from(
      this.el.querySelectorAll("#trackers-period-filter > button")
    );
    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        filters.forEach(filter => filter.classList.remove('text-white'));
        filter.classList.add("text-white");
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
        current: tracker.timeframes[period.key].current,
        previous: tracker.timeframes[period.key].previous,
        period: period.title,
      });
    });
  }

  getPeriod(id) {
    return this.periods.find((period) => period.id == id);
  }

  appendCard(data) {
    const template = `
      <div class="relative rounded-xl ${data.color} pt-12">
        <img class="absolute top-0 right-7" src="${data.icon}" width="75">
        <div class="relative rounded-xl bg-indigo-900 hover:bg-indigo-800 cursor-pointer p-7">
          <div class="flex justify-between items-center pb-3 lg:pb-7">
            <span class="font-semibold">${data.title}</span>
            <div class="cursor-pointer p-3">
              <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <div class="flex justify-between items-center gap-3 lg:flex-col lg:items-start">
            <span class="block text-3xl lg:text-6xl">${data.current}hrs</span>
            <span class="block text-gray-400">Last ${data.period} ${data.previous}hrs</span>
          </div>
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
