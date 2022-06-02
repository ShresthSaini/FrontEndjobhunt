import axios from "axios";

export default axios.create({
  baseURL: "https://jobhuntbackend.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});