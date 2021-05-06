const axios = require('axios');
module.exports = async(url) => {
  let data;
  try {
    const response = await axios.get(url);
    data = await response.data;
  } catch (err) {

  }
  
  return data;
};