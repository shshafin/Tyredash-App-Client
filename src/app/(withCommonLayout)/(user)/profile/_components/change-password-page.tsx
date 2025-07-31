"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useChangePassword } from "@/src/hooks/auth.hook"
import { useUser } from "@/src/context/user.provider"
import { Button } from "@heroui/button"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Input } from "@heroui/input"
import { Eye, EyeOff, Lock, Shield, Check, X } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePasswordPage = () => {
  const { user } = useUser()
  const router = useRouter()

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordForm>()

  const { mutate: changePassword, isPending: isChangingPassword } = useChangePassword({
    onSuccess: () => {
      toast.success("Password changed successfully!")
      reset()
      // Optionally redirect to profile or dashboard
      router.push("/profile")
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to change password")
    },
  })

  const newPassword = watch("newPassword")
  const confirmPassword = watch("confirmPassword")

  const onSubmit = (data: ChangePasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }

    if (data.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long")
      return
    }

    changePassword({
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    })
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    if (strength <= 2) return { strength, label: "Weak", color: "text-red-500" }
    if (strength <= 4) return { strength, label: "Medium", color: "text-yellow-500" }
    return { strength, label: "Strong", color: "text-green-500" }
  }

  const passwordStrength = getPasswordStrength(newPassword || "")
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword

  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-red-500">Please login to change your password</p>
          <Button className="mt-4" onPress={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Change Password</h1>
            <p className="text-gray-500">Update your account password</p>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Input
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                startContent={<Lock className="h-4 w-4 text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                isInvalid={!!errors.currentPassword}
                errorMessage={errors.currentPassword?.message}
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Input
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                startContent={<Lock className="h-4 w-4 text-gray-400" />}
                endContent={
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                isInvalid={!!errors.newPassword}
                errorMessage={errors.newPassword?.message}
              />

              {/* Password Strength Indicator */}
              {/* {newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Strength:</span>
                    <span className={`text-sm font-medium ${passwordStrength.color}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength <= 2
                          ? "bg-red-500"
                          : passwordStrength.strength <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordStrength.strength / 6) * 100}%` }}
                    />
                  </div>
                </div>
              )} */}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Input
                label="Confirm New Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                startContent={<Lock className="h-4 w-4 text-gray-400" />}
                endContent={
                  <div className="flex items-center gap-2">
                    {confirmPassword && (
                      <div className="mr-2">
                        {passwordsMatch ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                }
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) => value === newPassword || "Passwords do not match",
                })}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
              />
            </div>

            {/* Password Requirements */}
            {/* <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${newPassword?.length >= 6 ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  At least 6 characters long
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${/[A-Z]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Contains uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${/[a-z]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Contains lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${/[0-9]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Contains number
                </li>
                <li className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${/[^A-Za-z0-9]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300"}`}
                  />
                  Contains special character
                </li>
              </ul>
            </div> */}

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full px-7 py-2 rounded-lg text-sm font-medium transition-all transform bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-white"
              disabled={isChangingPassword || !passwordsMatch || !newPassword || !confirmPassword}
            >
              {isChangingPassword ? "Changing Password..." : "Change Password"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default ChangePasswordPage
