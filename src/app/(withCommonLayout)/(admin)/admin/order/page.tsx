"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../_components/DataFetchingStates";
import { IWheel } from "@/src/types";
import { useDeleteOrder, useGetAllOrders } from "@/src/hooks/order.hook";
import OrderTable from "./_components/OrderTable";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@heroui/button";

const Page = () => {
  const queryClient = useQueryClient();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const { mutate: handleDeleteOrder, isPending: deleteOrderPending } =
    useDeleteOrder({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_ORDERS"] });
        toast.success("Order deleted successfully");
        setSelectedOrder(null);
        onDeleteClose();
      },
      id: selectedOrder?._id,
    });

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

      {!isLoading && orders?.data?.length > 0 && (
        <OrderTable
          orders={orders}
          setSelectedOrder={setSelectedOrder}
          onDeleteOpen={onDeleteOpen}
        />
      )}

      {/* Delete Blog Modal */}
      <DeleteOrderModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteOrder={handleDeleteOrder}
        deleteOrderPending={deleteOrderPending}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

const DeleteOrderModal = ({
  isOpen,
  onOpenChange,
  handleDeleteOrder,
  deleteOrderPending,
  selectedOrder,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you want to delete the order ?</p>
              <p className="text-sm text-danger">
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDeleteOrder();
                }}
                disabled={deleteOrderPending}>
                {deleteOrderPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Page;
