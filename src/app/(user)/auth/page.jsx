"use client";
import { useEffect, useState } from "react";
import SendOTPForm from "./SendOTPForm";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtpApi, getOtpApi } from "@/services/authService";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";

const RESEND_TIME = 90;
function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);
  const { push } = useRouter();
  const {
    data: otpResponse,
    isPending: isLoadingGetOtp,
    mutateAsync: getOtp,
  } = useMutation({
    mutationFn: getOtpApi,
  });

  const { isPending: isLoadingCheckOtp, mutateAsync: checkOtp } = useMutation({
    mutationFn: checkOtpApi,
  });

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await getOtp({ phoneNumber });
      toast.success(data?.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const checkOTPHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await checkOtp({ phoneNumber, otp });
      toast.success(message);
      if (user.isActive) {
        push("/");
      } else {
        push("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((s) => s - 1);
      }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOTPHandler}
            isLoading={isLoadingGetOtp}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOTPHandler}
            isLoading={isLoadingCheckOtp}
            onBack={() => setStep((prevStep) => prevStep - 1)}
            otpResponse={otpResponse}
            time={time}
            onReSendOtp={sendOTPHandler}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
}

export default AuthPage;
