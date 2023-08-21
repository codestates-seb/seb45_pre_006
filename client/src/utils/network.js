import api from "./send";
export default async function network(method, endpoint = "", requestBody) {
  try {
    const response = await api({ method, url: endpoint, data: requestBody });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
