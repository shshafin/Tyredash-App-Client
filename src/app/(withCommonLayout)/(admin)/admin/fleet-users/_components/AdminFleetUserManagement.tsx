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

import UsersTable from "./UsersTable";
import EditUserModal from "./edit-user-modal";
import {
  useDeleteFleetUser,
  useGetFleetUsers,
  useUpdateFleetUser,
} from "@/src/hooks/fleet.hook";

export default function AdminFleetUserManagement() {
  const queryClient = useQueryClient();
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
    useDeleteFleetUser({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_FLEET_USERS"] });
        toast.success("Fleet User deleted successfully");
        setSelectedUser(null);
        onDeleteClose();
      },
      id: selectedUser?._id,
    }); // user deletion handler

  const { mutate: handleUpdateUser, isPending: updateUserPending } =
    useUpdateFleetUser({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_FLEET_USERS"] });
        toast.success("Fleet User updated successfully");
        methods.reset();
        setSelectedUser(null);
        onEditClose();
      },
      id: selectedUser?._id,
    }); // User update handler

  const { data: users, isLoading, isError, refetch } = useGetFleetUsers(); // Get existing users
  console.log(users, "fleet");
  // Handle form submission

  const onEditSubmit: SubmitHandler<FieldValues> = async (data, e) => {
    e?.preventDefault(); // add this line
    handleUpdateUser(data as any);
  };

  console.log({ selectedUser });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-md md:text-3xl font-semibold text-gray-900 dark:text-white">
          Fleet User Management
        </h1>
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
                ⚠️ Are you sure you want to delete this fleet user? This action
                cannot be undone.
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
