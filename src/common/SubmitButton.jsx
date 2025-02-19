import Button from "./Button";
import SvgLoaderComponent from "./SvgLoaderComponent";

function SubmitButton({ children, className, pending, ...props }) {
  return (
    <Button
      {...props}
      disabled={pending}
      className={`flex items-center justify-center gap-x-4 w-full
          ${className} 
          `}
    >
      {children}
      {pending && <SvgLoaderComponent />}
    </Button>
  );
}
export default SubmitButton;
