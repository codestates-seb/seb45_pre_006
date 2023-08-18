import axios from "axios";

function useAxiosData() {
  const defaultUrl = "https://c285-175-125-163-108.ngrok-free.app/";

  return async (method, endpoint = "", requestBody) => {
    const url = defaultUrl + endpoint;

    try {
      const response = await axios({
        method,
        url,
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      console.log("성공");
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default useAxiosData;
