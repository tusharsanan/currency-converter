import { ajax } from "@lion/ajax";

// TODO: Return these error and better display in the UI, by creating an error logger component
/**
 * This method takes in a URL endpoint and hits the ajax API to fetch the data
 * @param endpoint The endpoint of the API
 * @returns {Promise<Response>}
 */
const getData = async (endpoint) => {
  try {
    return await ajax.fetch(endpoint).then((response) => response.json());
  } catch (error) {
    if (error.response) {
      if (error?.response?.status === 400) {
        console.log("Bad request error, please check and reform your request");
      } else {
        console.log("Error while fetching data", error);
      }
    } else {
      console.log(
        "Error happened before receiving a request, maybe check your internet connection"
      );
    }
  }
};

export const currencyConversionService = {
  getData,
};
