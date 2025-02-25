import http from "./httpService";

export function getProductsApi() {
  return http.get("/product/list").then(({ data }) => data.data);
}
