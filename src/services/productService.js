import http from "./httpService";

export function getProductsApi(query) {
  return http.get(`/product/list?${query}`).then(({ data }) => data.data);
}
