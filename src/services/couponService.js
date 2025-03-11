import http from "./httpService";

export function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}
