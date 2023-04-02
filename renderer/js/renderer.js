const { ipcRenderer, View } = window;
//text component
const title2Container = {
  type: "div",
  id: "tank_choice",
  className: "w-4/5 mx-auto rounded-md p-4 bg-blue-500 shadow",
  children: [
    {
      type: "h1",
      className: "font-sans text-white text-center text-2xl",
      textContent: "Nowy widok...",
    },
  ],
};
// Render main view container
const titleContainer = {
  type: "div",
  id: "tank_choice",
  className: "w-4/5 mx-auto rounded-md p-4 bg-blue-500 shadow",
  children: [
    {
      type: "h1",
      className: "font-sans text-white text-center text-2xl",
      textContent: "Wybierz pojazd",
    },
  ],
};
const listContainer = {
  type: "div",
  className: "w-full rounded-lg mt-4",
  children: [
    {
      type: "ul",
      id: "tank_list",
      className:
        "w-4/5 shadow-xl rounded-lg text-center mx-auto p-6 bg-indigo-50 overflow-y-auto landscape:h-96",
    },
  ],
};

const optionsContainer = {
  type: "div",
  id: "options",
  className:
    "w-4/5 shadow-xl mx-auto bg-indigo-100 rounded-lg mt-4 p-2 flex justify-around",
  children: [
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-green-600 rounded-md	p-2",
          src: "./images/add.svg",
        },
      ],
      eventHandler: {
        event: "click",
        handler: () => {
          while (root.firstChild) {
            root.removeChild(root.firstChild);
          }
          const nextView = new View(root);
          nextView.renderView([
            title2Container,
            listContainer,
            optionsContainer,
          ]);
        },
      },
    },
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-slate-400	rounded-md	p-2",
          src: "./images/question.svg",
        },
      ],
    },
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-slate-400	rounded-md	p-2",
          src: "./images/question.svg",
        },
      ],
    },
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-red-600 rounded-md	p-2",
          src: "./images/delete.svg",
        },
      ],
    },
  ],
};

const tankersView = new View(root);
tankersView.renderView([titleContainer, listContainer, optionsContainer]);
const tank_list = document.getElementById("tank_list");

/// Fetch and render list of license plates in main view
const listItem = (license, no) => {
  return {
    type: "li",
    className:
      "ring-1 ring-offset-2 ring-zinc-950 rounded-md bg-white	 mb-3 cursor-pointer flex flex-row",
    children: [
      {
        type: "div",
        className: "basis-1/5 text-4xl text-white	 bg-blue-700 p-4 rounded-l-lg",
        textContent: "PL",
      },
      {
        type: "div",
        className: "basis-4/5 text-5xl p-4",
        textContent: `${license} (${no})`,
      },
    ],
  };
};

const listOfTankers = new View(tank_list);
View.getData(["request-tankers", "send-tankers"])
  .then((data) => {
    listOfTankers.renderView(
      (() => {
        const dataToRender = [];
        data.forEach((item) =>
          dataToRender.push(listItem(item.licensePlate, item.Number))
        );
        return dataToRender;
      })()
    );
  })
  .catch((err) => console.error(err));
