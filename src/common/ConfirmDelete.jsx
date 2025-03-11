import { HiOutlineTrash } from "react-icons/hi";

function ConfirmDelete({ resourceName, onClose, disabled, onConfirm }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-8 text-secondary-700">
        آیا از حذف {resourceName} مطمئن هستید؟
      </h2>

      <div className="flex justify-between items-center gap-x-14">
        <button
          className="flex-1 btn btn--outline text-center"
          variant="outline"
          onClick={onClose}
          type="button"
        >
          لغو
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={disabled}
          variant="danger"
          className="flex gap-x-2 justify-center items-center flex-1 btn btn--danger"
        >
          <span>حذف</span>
          <HiOutlineTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
