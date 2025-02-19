import Button from "@/common/Button";
import SpinnerMini from "@/common/SpinnerMini";
import TextField from "@/common/TextField";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onChange}
        />
        <div>
          {isLoading ? (
            <Button variant="primary" className="w-full">
              <SpinnerMini className="mx-auto" />
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="w-full">
              ارسال کد تایید
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
