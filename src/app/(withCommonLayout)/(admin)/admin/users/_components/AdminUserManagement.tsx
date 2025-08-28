"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  DataEmpty,
  DataError,
  DataLoading,
} from "../../_components/DataFetchingStates";
import {
  useCreateUser,
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "@/src/hooks/user.hook";
import UsersTable from "./UsersTable";
import AddUserModal from "./add-user-modal";
import EditUserModal from "./edit-user-modal";

export default function AdminUserManagement() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const methods = useForm(); // Hook form methods
  const { handleSubmit } = methods;
  const { mutate: handleDeleteUser, isPending: deleteUserPending } =
    useDeleteUser({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
        toast.success("User deleted successfully");
        setSelectedUser(null);
        onDeleteClose();
      },
      id: selectedUser?._id,
    }); // user deletion handler
  const { mutate: handleCreateUser, isPending: createUserPending } =
    useCreateUser({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
        toast.success("User created successfully");
        methods.reset();
        onClose();
      },
    }); // User creation handler
  const { mutate: handleUpdateUser, isPending: updateUserPending } =
    useUpdateUser({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
        toast.success("User updated successfully");
        methods.reset();
        setSelectedUser(null);
        onEditClose();
      },
      id: selectedUser?._id,
    }); // User update handler

  const { data: users, isLoading, isError, refetch } = useGetUsers(); // Get existing users
  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    handleCreateUser(data as any);
  };

  const onEditSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    e?.preventDefault(); // add this line
    handleUpdateUser(data as any);
  };

  console.log({ selectedUser });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          User Management
        </h1>
        <Button
          color="primary"
          className="px-6 py-2 rounded-full text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onPress={onOpen}>
          + Add User
        </Button>
      </div>
      {isLoading && <DataLoading />}
      {isError && <DataError />}
      {users?.data?.length === 0 && <DataEmpty />}

      {users?.data?.length > 0 && (
        <UsersTable
          users={users}
          onEditOpen={onEditOpen}
          onDeleteOpen={onDeleteOpen}
          setSelectedUser={setSelectedUser}
        />
      )}

      {/* Modal for adding a new user */}
      <AddUserModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        createUserPending={createUserPending}
      />
      {/* Modal for editing a user */}
      <EditUserModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        methods={methods}
        handleSubmit={handleSubmit}
        onSubmit={onEditSubmit}
        updateUserPending={updateUserPending}
        defaultValues={selectedUser}
      />
      {/* Modal for deleting a user */}
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteOpenChange}
        handleDeleteUser={handleDeleteUser}
        deleteUserPending={deleteUserPending}
      />
    </div>
  );
}

const DeleteUserModal = ({
  isOpen,
  onOpenChange,
  handleDeleteUser,
  deleteUserPending,
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
                ⚠️ Are you sure you want to delete this user? This action cannot
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
                onPress={handleDeleteUser}
                disabled={deleteUserPending}
                className="rounded">
                {deleteUserPending ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
