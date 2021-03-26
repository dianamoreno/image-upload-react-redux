import axios from "axios";

//Se inicializa cliente de axios y se configura la url donde tenemos alojado los servicios del API REST
export default axios.create({
  baseURL: "http://localhost:8080"
});