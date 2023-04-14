const { getAllVehicles } = require("./../database/queries/getAllVehicles");
const requestTankers = async (e) => {
  try {
    const rows = await getAllVehicles();
    e.reply("send-tankers", rows);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { requestTankers };
