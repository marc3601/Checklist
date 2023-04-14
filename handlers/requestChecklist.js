const {
  getVehicleChecklist,
} = require("./../database/queries/getVehicleChecklist");
const requestChecklist = async (e, requestData) => {
  try {
    const checklist = await getVehicleChecklist(requestData);
    e.reply("send-checklist", checklist);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { requestChecklist };
