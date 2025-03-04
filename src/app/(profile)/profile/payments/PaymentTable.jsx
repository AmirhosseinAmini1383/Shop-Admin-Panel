import { userPaymentTHeads } from "@/constants/tableHeads";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/numberFormatter";
import toLocalDateShort from "@/utils/toLocalDateShort";

function PaymentTable({ payments }) {
  return (
    <>
      {payments.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w[800px] text-sm">
            <thead>
              <tr>
                {userPaymentTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => {
                return (
                  <tr key={payment._id}>
                    <td className="table__td">{toPersianNumbers(index + 1)}</td>
                    <td className="table__td">
                      {toPersianNumbers(payment.invoiceNumber)}
                    </td>
                    <td
                      className="table__td max-w-[280px] whitespace-nowrap truncate"
                      title={payment.description}
                    >
                      {payment.description}
                    </td>
                    <td className="table__td">
                      <div className="flex flex-col gap-y-2 items-start">
                        {payment.cart.productDetail.map((product) => {
                          return (
                            <span
                              key={product._id}
                              className="badge badge--secondary"
                            >
                              {product.title}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="table__td">
                      {toPersianNumbersWithComma(payment.amount)}
                    </td>
                    <td className="table__td">
                      {toLocalDateShort(payment.createdAt)}
                    </td>
                    <td className="table__td">
                      {payment.status === "COMPLETED" ? (
                        <span className="badge badge--success">موفق</span>
                      ) : (
                        <span className="badge badge--error">ناموفق</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-secondary-500">سفارشی وجود ندارد !</p>
      )}
    </>
  );
}

export default PaymentTable;
