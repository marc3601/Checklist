const { saveNewChecklist } = require("./../database/queries/saveNewChecklist");
const addNewChecklist = async (e, requestData) => {
  try {
    const status = await saveNewChecklist(requestData);
    e.reply("send-checklist-status", status);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addNewChecklist };
