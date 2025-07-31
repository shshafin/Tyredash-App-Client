"use client"

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal"
import { Button } from "@heroui/button"
import { Select, SelectItem } from "@heroui/select"
import { FormProvider } from "react-hook-form"
import FXInput from "@/src/components/form/FXInput"

const EditUserModal = ({
  isOpen,
  onOpenChange,
  methods,
  handleSubmit,
  onSubmit,
  updateUserPending,
  defaultValues,
}: any) => {
  if (!defaultValues) return null

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
  ]

  const countryOptions = [
    { value: "USA", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "UK", label: "United Kingdom" },
    { value: "AU", label: "Australia" },
  ]

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange()
        methods.reset()
      }}
      size="2xl"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Edit User</ModalHeader>
            <ModalBody className="mb-5">
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <FXInput
                          label="First Name"
                          name="firstName"
                          defaultValue={defaultValues?.firstName}
                          required={true}
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <FXInput
                          label="Last Name"
                          name="lastName"
                          defaultValue={defaultValues?.lastName}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <FXInput
                          label="Email"
                          name="email"
                          type="email"
                          defaultValue={defaultValues?.email}
                          required={true}
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <FXInput label="Phone" name="phone" defaultValue={defaultValues?.phone} required={true} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <Select
                          label="Role"
                          placeholder="Select role"
                          {...methods.register("role")}
                          defaultSelectedKeys={[defaultValues?.role || "user"]}
                        >
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      {/* <div className="flex-1 min-w-[200px]">
                        <FXInput
                          label="Password"
                          name="password"
                          type="password"
                        //   placeholder="Leave blank to keep current password"
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Address Information</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[300px]">
                        <FXInput
                          label="Address Line 1"
                          name="addressLine1"
                          defaultValue={defaultValues?.addressLine1}
                          required={true}
                        />
                      </div>
                      <div className="flex-1 min-w-[200px]">
                        <FXInput
                          label="Address Line 2"
                          name="addressLine2"
                          defaultValue={defaultValues?.addressLine2}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="City" name="city" defaultValue={defaultValues?.city} required={true} />
                      </div>
                      <div className="flex-1 min-w-[150px]">
                        <FXInput label="State" name="state" defaultValue={defaultValues?.state} required={true} />
                      </div>
                      <div className="flex-1 min-w-[120px]">
                        <FXInput
                          label="Zip Code"
                          name="zipCode"
                          defaultValue={defaultValues?.zipCode}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[200px]">
                        <FXInput label="Country" name="country" defaultValue={defaultValues?.zipCode} required={true} />
                      </div>
                    </div>
                  </div>

                  <Button color="primary" type="submit" className="w-full px-6 py-2 rounded text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50" disabled={updateUserPending}>
                    {updateUserPending ? "Updating..." : "Update User"}
                  </Button>
                </form>
              </FormProvider>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditUserModal
