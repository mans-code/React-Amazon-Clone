import axios from "axios";

const instanse = axios.create({
  baseURL: "http://localhost:5001/amozan-clone-e340e/us-central1/api",
});

export default instanse;
