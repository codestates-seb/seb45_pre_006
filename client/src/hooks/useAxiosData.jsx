import api from "../components/utils/send";

function useAxiosData() {
  return async (method, endpoint = "", requestBody) => {
    try {
      const response = await api({
        method,
        url: endpoint,
        data: requestBody,
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
