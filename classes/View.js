const { ipcRenderer } = require("electron");

class View {
  constructor(root) {
    this.root = root;
  }

  static dataListener = (e, data) => {};

  static renderItem(item, parent) {
    const tempRef = document.createElement(item.type);
    parent.appendChild(tempRef);
    const keys = Object.keys(item);
    for (const attribute of keys) {
      if (
        attribute !== "children" &&
        attribute !== "type" &&
        attribute !== "eventHandler"
      ) {
        tempRef[attribute] = item[attribute];
      } else if (attribute === "eventHandler") {
        tempRef.addEventListener(
          item.eventHandler.event,
          item.eventHandler.handler
        );
      }
    }
    if (item.children) {
      item.children.forEach((child) => {
        View.renderItem(child, tempRef);
      });
    }
  }

  static getData([...events]) {
    return new Promise((resolve, reject) => {
      const eventName = events[1];
      if (ipcRenderer.listenerCount(eventName) > 0) {
        ipcRenderer.removeListener(eventName, this.dataListener);
      }
      this.dataListener = (e, data) => {
        resolve(data);
      };
      ipcRenderer.send(events[0]);
      ipcRenderer.on(eventName, this.dataListener);
    });
  }

  static setData(event, data) {
    ipcRenderer.send(event, data);
  }

  renderView([...items]) {
    items.forEach((item) => {
      if (item.type) {
        View.renderItem(item, this.root);
      } else {
        throw new TypeError("Item needs to have type attribute");
      }
    });
  }
}

module.exports = View;

// This is class named View that has several static methods and a constructor that takes a root parameter.
// The renderView() method iterates through an array of items and calls
// the static renderItem() method for each item.
// The renderItem() method creates a new element with the type specified in the item object
// and appends it to the parent element
// specified in the parent parameter.
// It then iterates through the keys of the item object and sets the attributes of the newly created
// element based on the keys of the item object. If the item object has a children array,
// it recursively calls renderItem() for each child.
// The getData() method returns a promise that sends a message to the main process with the first element
// of the events array and
// listens for an event with the second element of the events array.
// When the event is received, it resolves the promise with the received data.
