"use client";
import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import http from "@/services/httpService";
import toast from "react-hot-toast";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };
  const sendOTPHandler = async (e) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_BASE_URL + "/user/get-otp");
    try {
      const { data } = await http.post("/user/get-otp", { phoneNumber });
      toast.success(data?.data?.message);
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
        />
      </div>
    </div>
  );
}

export default AuthPage;
