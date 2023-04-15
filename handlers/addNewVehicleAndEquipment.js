const { saveNewVehicle } = require("../database/queries/saveNewVehicle");
const addNewVehicleAndEquipment = async (e, requestData) => {
  try {
    const status = await saveNewVehicle(requestData);
    console.log(status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addNewVehicleAndEquipment };
