import { useState, useEffect } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page, sort]);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {};

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-500/20 text-purple-600";
      case "dispatched":
        return "bg-yellow-500/20 text-yellow-600";
      case "delivered":
        return "bg-green-500/20 text-green-600";
      case "recieved":
        return "bg-green-500/20 text-green-600";
      case "cancelled":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-purple-500/20 text-purple-600";
    }
  };

  return (
    <>
      <div className="p-6 overflow-y-scroll overflow-x-scroll px-0 bg-white">
        {totalOrders > 0 ? (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th
                  onClick={(e) =>
                    handleSort({
                      sort: "id",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                  className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Order#{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 uppercase">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Items{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Total Ammount{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    order status{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th
                  className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={(e) =>
                    handleSort({
                      sort: "createdAt",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    order time{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th
                  className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={(e) =>
                    handleSort({
                      sort: "updatedAt",
                      order: sort?._order === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    last updated{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Payment method{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Payment Status{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Shipping Address{" "}
                    <svg
                      xmlns=""
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      />
                    </svg>
                  </p>
                </th>
                <th className="uppercase cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-bold leading-none opacity-70">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {order.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.items.map((item) => (
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.thumbnail}
                          className="inline-block relative object-cover object-center !rounded-full w-9 h-9 rounded-md"
                        />
                        <div className="flex flex-col">
                          <span className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-medium">
                            {item.product.title} - $
                            {item.product.discountedPrice}
                          </span>
                          <span className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            Quantity: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        ${order.totalAmount}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className={`${statusColor(
                          order.status
                        )} relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md`}
                        style={{ opacity: 1 }}
                      >
                        {order.id !== editableOrderId ? (
                          <span>{order.status}</span>
                        ) : (
                          <select
                            className="rounded-xl"
                            onChange={(e) => handleOrderStatus(e, order)}
                          >
                            <option className="text-purple-500" value="pending">
                              Pending
                            </option>
                            <option
                              className="text-yellow-500"
                              value="dispatched"
                            >
                              Dispatched
                            </option>
                            <option
                              className="text-green-500"
                              value="delivered"
                            >
                              Delivered
                            </option>
                            <option className="text-red-600" value="cancelled">
                              Cancelled
                            </option>
                          </select>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : null}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {order.updatedAt
                          ? new Date(order.updatedAt).toLocaleString()
                          : null}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className={`${statusColor(
                          order.paymentStatus
                        )} relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none py-1 px-2 text-xs rounded-md`}
                        style={{ opacity: 1 }}
                      >
                        {order.id !== editableOrderId ? (
                          <span>{order.paymentStatus}</span>
                        ) : (
                          <select
                            className="rounded-xl"
                            onChange={(e) => handleOrderPaymentStatus(e, order)}
                          >
                            <option className="text-purple-500" value="pending">
                              Pending
                            </option>
                            <option className="text-green-500" value="recieved">
                              Recieved
                            </option>
                          </select>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      <strong>{order.selectedAddress.name}</strong>
                      <br />
                      {order.selectedAddress.street}{" "}
                      {order.selectedAddress.city}
                      <br />
                      {order.selectedAddress.postalcode},{" "}
                      {order.selectedAddress.state}
                      <br />
                      Phone: {order.selectedAddress.phone}
                      <br />
                      Email: {order.selectedAddress.email}
                      <br />
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                      type="button"
                      onClick={(e) => handleShow(order)}
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns=""
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <EyeIcon></EyeIcon>
                        </svg>
                      </span>
                    </button>
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30"
                      type="button"
                      onClick={(e) => handleEdit(order)}
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <PencilIcon></PencilIcon>
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Order(s) Yet</p>
        )}
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
}

export default AdminOrders;
