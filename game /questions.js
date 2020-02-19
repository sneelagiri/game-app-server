const axios = require("axios");

module.exports = {
  getCategories: async () => {
    try {
      const response = await axios.get("https://opentdb.com/api_category.php");
    }
  }
};
