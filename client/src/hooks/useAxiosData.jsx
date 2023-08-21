import api from "../utils/send";

function useAxiosData() {
  const defaultUrl = "https://62c2-175-125-163-108.ngrok-free.app/";

  return async (method, endpoint = "", requestBody) => {
    const url = defaultUrl + endpoint;

    try {
      const response = await api({
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
