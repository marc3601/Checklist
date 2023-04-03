const { ipcRenderer, View } = window;

let currentScreen = "";
// Screens render functions

const addVehicleScreen = () => {
  if (currentScreen !== "add_vehicle") {
    currentScreen = "add_vehicle";
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    const addVehicleView = new View(root);
    addVehicleView.renderView([
      titleContainer("Dodaj pojazd"),
      addVehicleContainer,
      optionsContainer,
    ]);
  }
};

const homeScreen = () => {
  if (currentScreen !== "home") {
    currentScreen = "home";
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    const tankersView = new View(root);
    tankersView.renderView([
      titleContainer("Wybierz pojazd"),
      listContainer,
      optionsContainer,
    ]);

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
            className:
              "basis-1/5 text-4xl text-white	 bg-blue-700 p-4 rounded-l-lg",
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
  }
};

// Components
const titleContainer = (text) => {
  return {
    type: "div",
    id: "tank_choice",
    className: "w-4/5 mx-auto rounded-md p-4 bg-blue-500 shadow",
    children: [
      {
        type: "h1",
        className: "font-sans text-white text-center text-2xl",
        textContent: text,
      },
    ],
  };
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
      className: "rounded-md shadow-2xl cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-blue-500 active:bg-blue-400 rounded-md	p-2",
          src: "./images/home.svg",
        },
      ],
      eventHandler: {
        event: "pointerdown",
        handler: homeScreen,
      },
    },
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-green-600 active:bg-green-500 rounded-md	p-2",
          src: "./images/add.svg",
        },
      ],
      eventHandler: {
        event: "pointerdown",
        handler: addVehicleScreen,
      },
    },
    {
      type: "div",
      className: "rounded-md shadow-md cursor-pointer",
      children: [
        {
          type: "img",
          className: "bg-violet-600	rounded-md	p-2",
          src: "./images/list.svg",
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

const addVehicleContainer = {
  type: "div",
  className: "w-full rounded-lg mt-4",
  children: [
    {
      type: "div",
      className:
        "custom_container w-4/5 shadow-xl rounded-lg mx-auto p-10 bg-indigo-50 overflow-y-auto landscape:h-96",
      children: [
        {
          type: "div",
          className: "text-xl	mb-2",
          textContent: "Numer rejestracyjny:",
        },
        {
          type: "input",
          placeholder: "PO XXXX",
          className:
            "text-xl	p-2 rounded-lg shadow-md focus:shadow-lg transition-shadow focus:outline-0  w-3/4",
        },
        {
          type: "div",
          className: "text-xl	mb-2 mt-2",
          textContent: "Numer boczny:",
        },
        {
          type: "input",
          placeholder: "XXX",
          className:
            "text-xl	p-2 rounded-md shadow-md focus:shadow-lg transition-shadow focus:outline-0 w-1/2",
        },
        {
          type: "h2",
          className: "text-2xl text-center mt-6",
          textContent: "Wyposażenie pojazdu",
        },
        {
          type: "div",
          className: "flex items-center mt-6",
          children: [
            {
              type: "div",
              className: "input basis-3/4",
              children: [
                {
                  type: "input",
                  className:
                    "w-full text-xl	p-4 rounded-md shadow-md focus:shadow-lg transition-shadow focus:outline-0",
                  placeholder: "Dodaj wyposażenie",
                },
              ],
            },
            {
              type: "div",
              className: "button text-right cursor-pointer ml-4",
              children: [
                {
                  type: "img",
                  className:
                    "bg-green-600 active:bg-green-500 shadow-md	rounded-xl	  p-2",
                  src: "./images/add.svg",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
// Home screen initial render
homeScreen();
