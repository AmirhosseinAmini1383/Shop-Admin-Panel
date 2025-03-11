import http from "./httpService";

export function createPaymentApi() {
  return http.post("/payment/create").then(({ data }) => data.data);
}

export function getAllPaymentsApi() {
  return http.get("admin/payment/list").then(({ data }) => data.data);
}
