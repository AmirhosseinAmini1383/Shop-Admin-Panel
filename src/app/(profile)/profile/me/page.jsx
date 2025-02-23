"use client";
import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { includeObject } from "@/utils/objectUtils";
import { useEffect, useState } from "react";

function MePage() {
  const { user, isLoading } = useGetUser();
  const [formData, setFormData] = useState({});

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includeObject(user, includesKey));
  }, [user]);

  if (isLoading) return <Loading />;
  return (
    <div className="max-w-sm">
      <h1 className="mt-5 mb-10 font-black text-xl">اطلاعات کاربری</h1>
      <form className="space-y-8">
        {Object.keys(includeObject(user, includesKey)).map((key) => {
          return (
            <TextField
              key={key}
              label={key}
              name={key}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
      </form>
    </div>
  );
}

export default MePage;
