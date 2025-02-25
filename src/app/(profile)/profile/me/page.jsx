"use client";
import Button from "@/common/Button";
import Loading from "@/common/Loading";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfileApi } from "@/services/authService";
import { includeObject } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MePage() {
  const { user, isLoading } = useGetUser();
  const [formData, setFormData] = useState({});

  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutateAsync: updateProfile } = useMutation({
    mutationFn: updateProfileApi,
  });

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includeObject(user, includesKey));
  }, [user]);

  if (isLoading) return <Loading />;

  const updateFormHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await updateProfile(formData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-user-data"] });
        },
      });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="max-w-sm">
      <h1 className="mt-5 mb-10 font-bold text-xl">اطلاعات کاربری</h1>
      <form className="space-y-8" onSubmit={updateFormHandler}>
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
        <div>
          {isUpdating ? (
            <Button variant="primary" className="w-full">
              <SpinnerMini className="mx-auto" />
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="w-full">
              ویرایش اطلاعات
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MePage;
