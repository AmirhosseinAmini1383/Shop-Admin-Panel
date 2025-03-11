"use client";
import { useParams } from "next/navigation";

function page() {
  const { id } = useParams();
  return <div>اطلاعات سفارش : {id}</div>;
}

export default page;
