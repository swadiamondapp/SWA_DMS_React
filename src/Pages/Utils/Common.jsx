export const setToLocalstorage = (token) => {
  localStorage.setItem("token", token);
  console.log("token>>>>", token);
};

export const removeLocalstorage = (navigate) => {
  localStorage.clear();
  navigate("/login");
};

export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return !!token;
  } catch (error) {
    return false;
  }
};

// export const isEmpty = (value) => value.trim() === "";
export const isEmpty = (value) => {
  // Check if the value is null or undefined
  if (value == null) {
    return true;
  }

  // Check if the trimmed value is an empty string
  return value.trim() === "";
};

export const isValidEmail = (email) => {
  // const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const mailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  return emailRegex.test(email) && mailRegex.test(email);
};

export const isValidPhoneNumber = (mobile) => {
  const mobileRegex = /^[0]?[6789]\d{9}$/;
  return mobileRegex.test(mobile);
};

export const truncateString = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};
