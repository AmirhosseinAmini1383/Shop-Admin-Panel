async function page({ params }) {
  const { id } = await params;
  return (
    <div>
      <p>اطلاعات کاربر : {id}</p>
    </div>
  );
}

export default page;
