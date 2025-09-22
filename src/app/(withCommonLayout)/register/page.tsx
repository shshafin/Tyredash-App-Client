"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/src/schemas/register.schema";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { mutate: handleUserRegistration, isSuccess: registerSuccess } =
    useUserRegistration();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    handleUserRegistration(userData);
  };

  if (registerSuccess) {
    router.push("/login");
  }

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 h-[calc(100vh-100px)]">
      <h3 className="my-2 text-2xl font-bold">Register with TyreDash</h3>
      <p className="mb-4">Help Lost Items Find Their Way Home</p>
      <div className="w-full max-w-3xl">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerSchema)}
          defaultValues={{
            firstName: "Fahim",
            lastName: "Hossain",
            email: "fahim@examplea.com",
            phone: "01876543210",
            addressLine1: "Flat 5B, Green City",
            addressLine2: "Dhanmondi",
            zipCode: "1209",
            city: "Dhaka",
            state: "Dhaka",
            country: "Bangladesh",
            password: "12345678", // ✅ Updated: min 8 characters
          }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="py-2">
              <FXInput
                name="firstName"
                label="First Name"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="lastName"
                label="Last Name"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="email"
                label="Email"
                type="email"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="phone"
                label="Phone Number"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="addressLine1"
                label="Address Line 1"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="addressLine2"
                label="Address Line 2"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="zipCode"
                label="ZIP Code"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="city"
                label="City"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="state"
                label="State"
                required
              />
            </div>
            <div className="py-2">
              <FXInput
                name="country"
                label="Country"
                required
              />
            </div>
          </div>

          <div className="py-2 w-full">
            <FXInput
              name="password"
              label="Password"
              type="password"
              required
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit">
            Register
          </Button>
        </FXForm>

        <div className="text-center">
          Already have an account? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
