async function page({ params }) {
  const { id } = await params;
  // fetch based on Product Id to get product detail
  return (
    <div>
      <p>اطلاعات محصولات : {id}</p>
    </div>
  );
}

export default page;
