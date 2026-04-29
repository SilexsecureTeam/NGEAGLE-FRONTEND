import axios from "axios";
import { makeUseAxios } from "axios-hooks";

// export const url = "https://hungry-bhaskara.154-68-232-27.plesk.page/";
// export const url = "https://online.messerand.com/";
export const url = "https://stock.ngeagle.com/";
// export const url = "https://demo.35-197-87-133.plesk.page/";
// export const url2 = 'https://priceless-mclean.154-68-232-27.plesk.page/'

const instance = makeUseAxios({
  axios: axios.create({
    baseURL: `${url}api/`,
  }),
});

export default instance;
