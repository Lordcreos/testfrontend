import axios from "axios";

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '608c2546feb5d107b9f23f09';

export const fetchDummyData = (url, setLoading, setData) => {
  setLoading(true);
  console.log(`${BASE_URL}/${url}`);
  axios.get(`${BASE_URL}/${url}`, { headers: { 'app-id': APP_ID } })
    .then(({ data }) => {
      setData(data.data ? data.data : data);
      console.log(data.data ? data.data : data);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}