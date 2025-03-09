import http from "./httpService";

export function getProductsApi(query, cookies) {
  return http
    .get(`/product/list?${query}`, {
      headers: {
        Cookie: cookies,
      },
    })
    .then(({ data }) => data.data);

  // return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/list?${query}`, {
  //   cache: "no-store",
  // })
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getOneProductBySlugApi(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getOneProductByIdApi(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export function likeProductApi(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

// admin related function
export function addProductApi(data) {
  return http.post("/admin/product/add", data).then(({ data }) => data.data);
}

export function updateProductApi({ productId, data }) {
  return http
    .patch(`/admin/product/update/${productId}`, data)
    .then(({ data }) => data.data);
}
