"use client";
import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOtpApi } from "@/services/authService";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    data,
    error,
    isPending,
    mutateAsync: getOtp,
  } = useMutation({
    mutationFn: getOtpApi,
  });
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await getOtp({ phoneNumber });
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={phoneNumberHandler}
          onSubmit={sendOTPHandler}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}

export default AuthPage;
