const { saveNewChecklist } = require("./../database/queries/saveNewChecklist");
const addNewChecklist = async (e, requestData) => {
  // console.log(requestData);
  try {
    const status = await saveNewChecklist(requestData);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { addNewChecklist };
