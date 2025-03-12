import { userListTHeads } from "@/constants/tableHeads";
import { toPersianNumbers } from "@/utils/numberFormatter";
import toLocalDateShort from "@/utils/toLocalDateShort";
import Link from "next/link";
import { HiCheckCircle, HiOutlineEye } from "react-icons/hi";

function UsersTable({ users }) {
  return (
    <>
      {users.length > 0 ? (
        <div className="shadow-sm overflow-auto my-8">
          <table className="border-collapse table-auto w-full min-w[800px] text-sm">
            <thead>
              <tr>
                {userListTHeads.map((item) => {
                  return (
                    <th className="whitespace-nowrap table__th" key={item.id}>
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <td className="table__td">{toPersianNumbers(index + 1)}</td>
                    <td className="table__td">{user.name}</td>
                    <td className="table__td">{user.email}</td>
                    <td className="table__td">
                      <div className="flex whitespace-nowrap items-center gap-x-2">
                        {toPersianNumbers(user.phoneNumber)}
                        {user.isVerifiedPhoneNumber && (
                          <HiCheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                    </td>
                    <td className="table__td">
                      <div className="flex flex-col gap-y-2 items-start">
                        {user.Products.length ? (
                          user.Products.map((product, index) => {
                            return (
                              <span
                                key={index}
                                className="badge badge--secondary"
                              >
                                {product.title}
                              </span>
                            );
                          })
                        ) : (
                          <p className="text-secondary-900">
                            محصولی وجود ندارد !
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="table__td">
                      {toLocalDateShort(user.createdAt)}
                    </td>
                    <td className="table__td">
                      <Link href={`/admin/users/${user._id}`}>
                        <HiOutlineEye className="w-5 h-5 text-primary-900" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-8 text-secondary-500">کاربری وجود ندارد !</p>
      )}
    </>
  );
}

export default UsersTable;
