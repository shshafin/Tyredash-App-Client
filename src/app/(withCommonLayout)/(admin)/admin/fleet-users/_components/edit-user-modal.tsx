"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { FormProvider, useForm, Controller } from "react-hook-form";

const EditUserModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateUserPending,
  defaultValues,
}: any) => {
  if (!defaultValues) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange();
        methods.reset(defaultValues); // reset to defaultValues on close
      }}
      size="2xl">
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-lg font-semibold">
              Update Fleet User Verification
            </ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-2xl mx-auto space-y-6">
                  {/* Verification toggle */}
                  <Controller
                    name="isAdminApproved"
                    control={methods.control}
                    defaultValue={defaultValues.isAdminApproved}
                    render={({ field }) => (
                      <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <span className="text-sm font-medium">
                          {field.value ? "Verified ✅" : "Unverified ❌"}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:bg-indigo-600 transition-all duration-200"></div>
                          <div
                            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                              field.value ? "translate-x-5" : "translate-x-0"
                            }`}></div>
                        </label>
                      </div>
                    )}
                  />

                  <Button
                    color="primary"
                    type="submit"
                    className="w-full px-6 py-2 rounded text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    disabled={updateUserPending}>
                    {updateUserPending ? "Updating..." : "Update Status"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
