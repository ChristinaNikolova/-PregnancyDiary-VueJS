import { httpMethods } from "../utils/constants/global";
import { api } from "./api";

function all(articleId) {
  return fetch(`${api.comments}/${articleId}/`, {
    method: httpMethods.GET,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

export default {
  all,
};
