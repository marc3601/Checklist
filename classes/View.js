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
