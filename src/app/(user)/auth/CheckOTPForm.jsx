import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import OTPInput from "react-otp-input";
import { CiEdit } from "react-icons/ci";
import { HiArrowRight, HiRefresh } from "react-icons/hi";
import { toPersianDigits } from "@/utils/numberFormatter";

function CheckOTPForm({
  onSubmit,
  otp,
  setOtp,
  isLoading,
  otpResponse,
  onBack,
  time,
  onReSendOtp,
}) {
  return (
    <div>
      <button onClick={onBack}>
        <HiArrowRight className="w-6 h-6 text-secondary-500 mb-2" />
      </button>
      <form className="space-y-10" onSubmit={onSubmit}>
        <p className="font-bold text-secondary-800 mb-3">
          کد تایید را وارد کنید
        </p>
        {otpResponse && (
          <p className="mb-8 text-secondary-500 flex items-center gap-x-1 text-sm">
            <span>{otpResponse?.message}</span>
            <button onClick={onBack}>
              <CiEdit className="w-5 h-5 text-primary-900" />
            </button>
          </p>
        )}
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
          }}
          containerStyle="flex flex-row-reverse gap-x-2 items-center justify-between text-secondary-900"
          renderInput={(props) => <input {...props} />}
        />
        <div className="mt-4 mb-10 text-secondary-500 text-sm">
          {time > 0 ? (
            <p>{toPersianDigits(time)} ثانیه تا ارسال مجدد کد</p>
          ) : (
            <button onClick={onReSendOtp} className="flex items-center gap-x-1">
              <span>ارسال مجدد کد تایید</span>
              <span>
                <HiRefresh className="w-4 h-4 text-primary-900" />
              </span>
            </button>
          )}
        </div>
        <div>
          {isLoading ? (
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
  );
}

export default CheckOTPForm;
