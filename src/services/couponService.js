import http from "./httpService";

export function getAllCouponsApi() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function addNewCouponApi(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function getOneCouponByIdApi(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function updateCouponApi({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}
