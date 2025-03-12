import http from "./httpService";

export function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function addNewCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}
