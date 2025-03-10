"use client";

import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  return <div>اطلاعات دسته بندی : {id}</div>;
}

export default page;
