"use client";

import { useDeleteBlog, useGetBlogs } from "@/src/hooks/blog.hook";
import { IBlog } from "@/src/types";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import BlogsTable from "./BlogsTable";

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [selectedBlog, setSelectedBlog] = useState<IBlog | null>(null);

  const { mutate: handleDeleteBlog, isPending: deleteBlogPending } =
    useDeleteBlog({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_BLOGS"] });
        toast.success("Blog deleted successfully");
        setSelectedBlog(null);
        onDeleteClose();
      },
      id: selectedBlog?._id,
    });

  const { data: blogs, isLoading, isError } = useGetBlogs({});

  // Client-side pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const pageSizeOptions = [5, 10, 25];

  const totalItems = blogs?.data?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalItems, pageSize, totalPages, page]);

  const paginatedBlogs = blogs
    ? {
        ...blogs,
        data: blogs.data.slice((page - 1) * pageSize, page * pageSize),
      }
    : blogs;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Blog Management
        </h1>
        <div className="flex gap-2">
          <Button
            color="primary"
            variant="bordered"
            className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-white"
            onPress={() => router.push("/admin/blog/create")}>
            + Add Blog
          </Button>
        </div>
      </div>

      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {blogs?.data?.length === 0 && <DataEmpty />}

      {!isLoading && blogs?.data?.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Show</label>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded px-2 py-1">
                {pageSizeOptions.map((opt) => (
                  <option
                    key={opt}
                    value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <span className="text-sm text-muted">items per page</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">{`Page ${page} of ${totalPages}`}</span>
              <Button
                variant="bordered"
                className="rounded disabled:opacity-50"
                onPress={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}>
                Prev
              </Button>
              <Button
                className="rounded disabled:opacity-50"
                variant="bordered"
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </div>

          <BlogsTable
            blogs={paginatedBlogs}
            onDeleteOpen={onDeleteOpen}
            setSelectedBlog={setSelectedBlog}
          />
        </>
      )}

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteBlog={handleDeleteBlog}
        deleteBlogPending={deleteBlogPending}
        selectedBlog={selectedBlog}
      />
    </div>
  );
}

const DeleteBlogModal = ({
  isOpen,
  onOpenChange,
  handleDeleteBlog,
  deleteBlogPending,
  selectedBlog,
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
              <p>
                Are you sure you want to delete the blog "{selectedBlog?.title}
                "?
              </p>
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
                  handleDeleteBlog();
                }}
                disabled={deleteBlogPending}>
                {deleteBlogPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
