export const isEmailValid = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(String(email).toLowerCase())) {
    return true;
  } else {
    return "Invalid Email Format";
  }
};

export const isUsernameValid = (username) => {
  if (username.length == "") return "Username Blank";

  if (username.length < 4) return "Username must be 4 characters and above";

  return true;
};

export const isPasswordValid = (password) => {
  if (password.length == "") return "Password Blank";

  if (password.length < 8) return "Password must be 8 characters and above";

  return true;
};

export const validPhone = (phone) => {
  const pattern = /^639\d{9}$/;
  const pattern2 = /^09\d{9}$/;

  return pattern.test(phone) || pattern2.test(phone);
};
