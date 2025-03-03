import http from "./httpService";

export function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}
