import { productsListTHeads } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function ProductsListTable({ products }) {
  const pathName = usePathname();

  return (
    <>
      {products.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w[800px] text-sm">
            <thead>
              <tr>
                {productsListTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td className="table__td">{toPersianNumbers(index + 1)}</td>
                    <td className="table__td whitespace-nowrap font-medium">
                      {product.title}
                    </td>
                    <td className="table__td">{product.category.title}</td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(product.price)}
                    </td>
                    <td className="table__td">
                      % {toPersianNumbers(product.discount)}
                    </td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(product.offPrice)}
                    </td>
                    <td className="table__td">
                      {toPersianNumbers(product.countInStock)}
                    </td>
                    <td className="table__td">
                      <div className="flex items-center gap-x-3">
                        <Link href={`${pathName}/${product._id}`}>
                          <HiOutlineEye className="w-5 h-5 text-primary-900" />
                        </Link>
                        <button>
                          <HiOutlineTrash className="w-5 h-5 text-error" />
                        </button>
                        <Link href={`${pathName}/edit/${product._id}`}>
                          <RiEdit2Line className="w-5 h-5 text-secondary-700" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-secondary-500">محصولی وجود ندارد !</p>
      )}
    </>
  );
}

export default ProductsListTable;
