import api from "../components/utils/send";

function useAxiosData() {
  const defaultUrl = "http://ec2-13-125-37-74.ap-northeast-2.compute.amazonaws.com:8080/";

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
