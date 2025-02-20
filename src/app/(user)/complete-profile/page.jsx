"use client";
import RHFTextField from "@/common/RHFTextField";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/common/Button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { completeProfileApi } from "@/services/authService";
import toast from "react-hot-toast";
import SpinnerMini from "@/common/SpinnerMini";

const schema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "نام و نام خانوادگی الزامی است" })
      .min(5, { message: "نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد" }),
    email: z
      .string()
      .nonempty({ message: "ایمیل الزامی است" })
      .email({ message: "ایمیل نامعتبر است" }),
  })
  .required();

function CompleteProfile() {
  const { isPending, mutateAsync: completeProfile } = useMutation({
    mutationFn: completeProfileApi,
  });
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const { message } = await completeProfile(data);
      toast.success(message);
      push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            name="name"
            label="نام و نام خانوادگی"
            register={register}
            errors={errors}
            isRequired
          />
          <RHFTextField
            name="email"
            label="ایمیل"
            register={register}
            errors={errors}
            isRequired
          />
          <div>
            {isPending ? (
              <Button variant="primary" className="w-full">
                <SpinnerMini className="mx-auto" />
              </Button>
            ) : (
              <Button type="submit" variant="primary" className="w-full">
                تایید
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
