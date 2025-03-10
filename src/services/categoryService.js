import http from "./httpService";

export function getCategoriesApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function AddNewCategoryApi(data) {
  return http.post("/admin/category/add", data).then(({ data }) => data.data);
}

export function getCategoryByIdApi(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function updateCategoryApi({ id, data }) {
  return http
    .patch(`/admin/category/update/${id}`, data)
    .then(({ data }) => data.data);
}
 