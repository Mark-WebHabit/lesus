export const throwError = (error) => {
  if (error.response?.data) {
    console.log(error.response.data);
    throw new Error(error.response.data);
  } else {
    console.log(error.message);
    throw new Error(error.message);
  }
};
