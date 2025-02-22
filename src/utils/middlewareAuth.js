export async function middlewareAuth(request) {
  let strCookie = "";
  request.cookies
    .getAll()
    .forEach((item) => (strCookie += `${item?.name}=${item?.value}; `));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: strCookie,
    },
  });
  const { data } = await res.json();
  const { user } = data || {};
  return user;
}
