const { View } = window;

// Global state object
const stateContainer = {
  currentScreen: "",
  addVehicleState: {
    registration: "",
    sideNumber: "",
    equipmentList: [""],
  },
};

// Screens render functions
const addVehicleScreen = () => {
  if (stateContainer.currentScreen !== "add_vehicle") {
    stateContainer.currentScreen = "add_vehicle";
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    const addVehicleView = new View(root);
    addVehicleView.renderView([
      titleContainer("Dodaj pojazd"),
      addVehicleContainer,
      optionsContainer,
    ]);
    handleAddEquipment();
  }
};

const homeScreen = () => {
  if (stateContainer.currentScreen !== "home") {
    stateContainer.currentScreen = "home";
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
    const licensePlateItem = (license, no) => {
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
              dataToRender.push(
                licensePlateItem(item.licensePlate, item.Number)
              )
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
          id: "registration",
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
          id: "side_number",
          className:
            "text-xl	p-2 rounded-md shadow-md focus:shadow-lg transition-shadow focus:outline-0 w-1/2",
        },
        {
          type: "h2",
          className: "text-2xl text-center mt-6",
          textContent: "Wyposażenie pojazdu",
        },
        {
          type: "ul",
          id: "equipment_list",
          className: "mt-6",
        },
      ],
    },
  ],
};

//Utility functions
const handleAddEquipment = () => {
  const eqli = document.getElementById("equipment_list");
  const registr = document.getElementById("registration");
  const side_nr = document.getElementById("side_number");

  registr.value = stateContainer.addVehicleState.registration;
  side_nr.value = stateContainer.addVehicleState.sideNumber;

  registr.addEventListener("change", (e) => {
    const input_value = e.target.value;
    stateContainer.addVehicleState.registration = input_value;
  });
  side_nr.addEventListener("change", (e) => {
    const input_value = e.target.value;
    stateContainer.addVehicleState.sideNumber = input_value;
  });

  const equipment_list_add = new View(eqli);
  let last;
  equipment_list_add.renderView(
    (() => {
      return stateContainer.addVehicleState.equipmentList.map((item, id) => ({
        type: "li",
        className: "flex mt-2 mb-4 items-center",
        id: `equipment_${id}`,
        children: [
          {
            type: "div",
            className: "input basis-3/4",
            children: [
              {
                type: "input",
                value: item,
                className:
                  "w-full text-xl	p-4 rounded-md shadow-md focus:shadow-lg transition-shadow focus:outline-0",
                placeholder: "Dodaj wyposażenie",
                disabled: (last =
                  id === stateContainer.addVehicleState.equipmentList.length - 1
                    ? false
                    : true),
                eventHandler: {
                  event: "change",
                  handler: (e) => {
                    const inputValue = e.target.value;
                  },
                },
              },
            ],
          },
          {
            type: "div",
            className: "button text-right cursor-pointer ml-4",
            children: [
              {
                type: "img",
                className: `${
                  !last
                    ? "bg-green-600 active:bg-green-500"
                    : "bg-red-600 active:bg-red-500"
                }  shadow-md	rounded-xl p-2`,
                src: `./images/${!last ? "add" : "delete"}.svg`,
              },
            ],
            eventHandler: {
              event: "pointerdown",
              handler: (e) => {
                const inputValue =
                  e.currentTarget.previousSibling.children[0].value;
                const isRed = e.target.className.includes("red");
                if (inputValue !== "" && !isRed) {
                  if (stateContainer.addVehicleState.equipmentList[0] === "") {
                    stateContainer.addVehicleState.equipmentList = [];
                    stateContainer.addVehicleState.equipmentList.push(
                      inputValue
                    );
                    stateContainer.addVehicleState.equipmentList.push("");
                  } else if (
                    stateContainer.addVehicleState.equipmentList.length >= 2
                  ) {
                    stateContainer.addVehicleState.equipmentList.pop();
                    stateContainer.addVehicleState.equipmentList.push(
                      inputValue
                    );
                    stateContainer.addVehicleState.equipmentList.push("");
                  }
                  while (eqli.firstChild) {
                    eqli.removeChild(eqli.firstChild);
                  }
                  handleAddEquipment();
                } else if (isRed) {
                  const filter =
                    e.currentTarget.previousSibling.firstChild.value;
                  const filtered =
                    stateContainer.addVehicleState.equipmentList.filter(
                      (item) => item !== filter
                    );

                  stateContainer.addVehicleState.equipmentList = filtered;
                  while (eqli.firstChild) {
                    eqli.removeChild(eqli.firstChild);
                  }
                  handleAddEquipment();
                }
              },
            },
          },
        ],
      }));
    })()
  );
};

// Home screen initial render
homeScreen();
