import api from "./send";
export default async function network(method, endpoint = "", requestBody) {
  try {
    const response = await api({
      method,
      url: endpoint,
      data: requestBody,
    });
    console.log("성공");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
