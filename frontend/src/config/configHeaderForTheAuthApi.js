export const userData = JSON.parse(localStorage.getItem("user"));
export const configHeaderAuth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
