export const convertPhoto = (bytePhoto) => {
  const base64 = btoa(
    new Uint8Array(bytePhoto).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return base64;
};

export const getNonCommonCourses = (studentCourses, allCourses) => {
  var filterd = allCourses?.filter((c) => {
    var flag = true;
    studentCourses?.map((sc) => {
      if (sc.courseCode === c.courseCode) flag = false;
      return sc;
    });
    return flag;
  });
  return filterd;
};

export const getCurrentDateMinusYear = (yearsToBeMinused) => {
  const today = new Date();
  var year = today.getFullYear() - yearsToBeMinused;
  const month =
    today.getMonth() < 9 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
  const day = today.getDate() <= 9 ? "0" + today.getDate() : today.getDate();
  const date = year + "-" + month + "-" + day;
  return date;
};

// check the user object before registering
// returns true if valid
export const validateUser = (user) => {
  return (
    validateName(user.firstName) &&
    validateName(user.lastName) &&
    validateEmail(user.email) &&
    validateDob(user.dob) &&
    validatePassword(user.password)
  );
};

export const validateName = (name) => {
  const namePattern = /^[a-zA-Z]+$/;
  return namePattern.test(name);
};

export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  return emailPattern.test(email);
};

export const validateDob = (dob) => {
  return dob !== "";
};

export const validatePassword = (pass) => {
  return pass.length >= 6;
};
