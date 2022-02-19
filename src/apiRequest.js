const apiRequest = async (url = "", optionsObj = null, errMsg = "") => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok)
      throw Error("Somethig went wrong!, please reload the app");
    const data = await response.json();
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};
export default apiRequest;
