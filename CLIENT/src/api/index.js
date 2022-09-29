import axios from "axios";
// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { getTokenFromStorage } from "../helpers";

// require('dotenv').config();


const getQuotes = async (params = {}) => {
  let paramsStr = "";
  Object.keys(params).forEach((key) => {
    paramsStr = paramsStr + key + "=" + params[key]?.join(",") + "&";
  });
  const res = await axios.get(
    `http://localhost:8000/quotes?${paramsStr && "?" + paramsStr}`,
    {
      headers: { Authorization: "Bearer " + getTokenFromStorage() },
    }
    
    
    );
    console.log(paramsStr)
    console.log(res.data.quotes)
  return res.data.quotes;
};


// const paginationQuotes = async (page , pageNumber) => {
//   const res = await axios.get( `http://localhost:8000/quotes?pageSize=${page}&page=${pageNumber}`,
//   {
//     headers: { Authorization: "Bearer " + getTokenFromStorage() },
//   })
//   console.log(res.data.quotes)
//   return res.data.quotes
// }

const getTags = async () => {
  const res = await axios.get("http://localhost:8000/tags", {
    headers: { Authorization: "Bearer " + getTokenFromStorage() },
  });

  return res.data;
};

const login = async (user) => {
  
  // console.log(user);
  return await axios.post("http://localhost:8000/sessions", user);
};

const addQuote = async (data) => {
  return await axios.post("http://localhost:8000/quotes", data, {
    headers: { Authorization: "Bearer " + getTokenFromStorage() },
  });

};
const deleteVote = async (quote) => {
  return await axios.delete(
    `http://localhost:8000/quotes/${quote.id}/${quote.givenVote}`,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
};

const downVote = async (quote) => {
  return await axios.post(
    `http://localhost:8000/quotes/${quote.id}/downvote`,
    null,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
};

const upVote = async (quote) => {
  return await axios.post(
    `http://localhost:8000/quotes/${quote.id}/upvote`,
    null,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
};

const api = {
  getQuotes,
  addQuote,
  getTags,
  login,
  deleteVote,
  downVote,
  upVote,
};

export default api;
