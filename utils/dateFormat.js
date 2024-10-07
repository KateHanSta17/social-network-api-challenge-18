// utils/dateFormat.js
import dayjs from 'dayjs';

const formatDate = (timestamp) => {
  return dayjs(timestamp).format('MMM D, YYYY [at] h:mm A');
};

export default formatDate;
