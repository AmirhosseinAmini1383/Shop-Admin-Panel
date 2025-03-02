import http from "./httpService";

export function getProductsApi(query) {
  return http.get(`/product/list?${query}`).then(({ data }) => data.data);

  // return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/list?${query}`, {
  //   cache: "no-store",
  // })
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getOneProductBySlugApi(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}
