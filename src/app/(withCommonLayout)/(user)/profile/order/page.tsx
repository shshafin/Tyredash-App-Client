"use client";

import React from "react";
import { IWheel } from "@/src/types";
import { useGetAllOrders } from "@/src/hooks/order.hook";
import OrderTable from "./_components/OrderTable";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../../(admin)/admin/_components/DataFetchingStates";

const Page = () => {
  const { data: orders, isLoading, isError } = useGetAllOrders({});
  console.log({ orders }, "order_data");

  return (
    <div>
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {orders?.data?.length === 0 && <DataEmpty />}
      {orders?.data?.length > 0 && (
        <h1 className="text-xl md:text-2xl font-extrabold text-center   mb-6 tracking-wide">
          All orders
        </h1>
      )}

      {!isLoading && orders?.data?.length > 0 && <OrderTable orders={orders} />}
    </div>
  );
};

export default Page;
