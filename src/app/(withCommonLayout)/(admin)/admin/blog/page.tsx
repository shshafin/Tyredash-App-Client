"use client";

import { useDeleteTire, useGetTires } from "@/src/hooks/tire.hook";
import React, { useState, useRef } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../_components/DataFetchingStates";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { ITire } from "@/src/types";
import Link from "next/link";
import { Button } from "@heroui/button";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDeleteBlog, useGetBlogs } from "@/src/hooks/blog.hook";

const Page = () => {
  const queryClient = useQueryClient();
  const [selectedBlog, setSelectedBlog] = useState<ITire | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure(); // Modal open state for create tire with csv file
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { mutate: handleDeleteBlog, isPending: deleteBlogPending } =
    useDeleteBlog({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
        toast.success("Blog deleted successfully");
        setSelectedBlog(null);
        onDeleteClose();
      },
      id: selectedBlog?._id,
    }); // Blog deletion handler

  const { data: Blogs, isLoading, isError } = useGetBlogs({});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Blogs
        </h1>
        <div className="flex items-center gap-3">
          <Link href="/admin/blog/create">
            <Button
              color="primary"
              className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
              + Add Blog
            </Button>
          </Link>
        </div>
      </div>
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {Blogs?.data?.length === 0 && <DataEmpty />}

      {/* {!isLoading && Blogs?.data?.length > 0 && (
        <TiresTable
          tires={Blogs}
          onDeleteOpen={onDeleteOpen}
          onEditOpen={onEditOpen}
          setSelectedTire={setSelectedBlog}
        />
      )} */}

      {/* Modal for deleting a Tire */}
      {/* <DeleteBlogModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteBlog={handleDeleteBlog}
        deleteBlogPending={deleteBlogPending}
      /> */}
    </div>
  );
};

export default Page;

const DeleteBlogModal = ({
  isOpen,
  onOpenChange,
  handleDeleteBlog,
  deleteBlogPending,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Delete
            </ModalHeader>

            <ModalBody>
              <p className="text-sm text-red-500">
                ⚠️ Are you sure you want to delete this Blog? This action cannot
                be undone.
              </p>
            </ModalBody>

            <ModalFooter className="flex justify-end gap-2">
              <Button
                variant="bordered"
                className="rounded"
                onPress={onOpenChange}>
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={handleDeleteBlog}
                disabled={deleteBlogPending}
                className="rounded">
                {deleteBlogPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
