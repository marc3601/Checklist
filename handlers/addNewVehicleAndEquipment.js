const { addNewVehicle } = require("./../database/queries/addNewVehicle");
const addNewVehicleAndEquipment = async (e, requestData) => {
  try {
    const status = await addNewVehicle(requestData);
    console.log(status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addNewVehicleAndEquipment };
