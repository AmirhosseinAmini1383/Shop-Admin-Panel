"use client";

import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  return <div>اطلاعات کد تخفیف : {id}</div>;
}

export default page;
