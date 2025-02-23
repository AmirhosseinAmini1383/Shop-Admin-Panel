import http from "./httpService";

export function getOtpApi(data) {
  return http.post("/user/get-otp", data).then(({ data }) => data.data);
}

export function checkOtpApi(data) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfileApi(data) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getUserProfileApi() {
  return http.get("/user/profile").then(({ data }) => data.data);
}


export function updateProfileApi(data) {
  return http.patch("/user/update",data).then(({ data }) => data.data);
}
