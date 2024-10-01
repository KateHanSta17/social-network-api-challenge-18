// utils/dateFormat.js
const dayjs = require('dayjs');

const formatDate = (timestamp) => {
  return dayjs(timestamp).format('MMM D, YYYY [at] h:mm A');
};

module.exports = formatDate;
