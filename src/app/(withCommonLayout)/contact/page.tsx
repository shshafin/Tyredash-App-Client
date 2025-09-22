"use client";

import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Divider } from "@heroui/divider";
import { useRouter } from "next/navigation";
import { Textarea } from "@heroui/input";
import { useCreateContact } from "@/src/hooks/contact.hook";
import { Mail, MapPin, Phone } from "lucide-react";

type ContactFormData = {
  name: string;
  address: string;
  contactInfo: string;
  description: string;
};

export default function ContactPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit, register, reset } = methods;

  const { mutate: handleCreateContact, isPending: createContactPending } =
    useCreateContact({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GET_CONTACTS"] });
        toast.success("Your query submitted successfully");
      },
    });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await handleCreateContact({
      name: data.name,
      address: data.address,
      contactInfo: data.contactInfo,
      description: data.description,
    });

    // Reset the form fields after successful submission
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-24 px-6 text-center rounded-b-3xl shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-wide">
          Get in Touch with Tiresdash
        </h1>
        <p className="text-md md:text-xl max-w-3xl mx-auto opacity-90">
          Have questions about our tire services or products? Fill out the form
          below and our team will get back to you promptly.
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Info */}
        <div className="space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 dark:text-orange-400">
            Contact Information
          </h2>
          <div className="flex items-center gap-4">
            <Mail className="text-orange-500 dark:text-orange-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-300">
              info@tiresdash.com
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-orange-500 dark:text-orange-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-300">(561) 232-3230</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="text-orange-500 dark:text-orange-400 w-6 h-6" />
            <p className="text-gray-700 dark:text-gray-300">
              Boynton Beach, FL, USA
            </p>
          </div>
          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400 italic">
              Tiresdash offers premium tire sales, installation, and maintenance
              services. We’re here to help you choose the right tires for your
              vehicle.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FXInput
                  label="Name"
                  name="name"
                  required
                />
                <FXInput
                  label="Address"
                  name="address"
                  required
                />
                <FXInput
                  label="Contact Info"
                  name="contactInfo"
                  required
                />
              </div>

              <Textarea
                label="Message"
                placeholder="Tell us about your inquiry..."
                minRows={4}
                {...register("description", {
                  required: "Message is required",
                })}
                required
                className="rounded-xl border border-gray-300 dark:border-gray-700 p-4 w-full focus:ring-2 focus:ring-orange-400 dark:focus:ring-orange-500 focus:outline-none transition shadow-sm"
              />

              <div className="flex justify-end gap-4">
                <Button
                  color="default"
                  variant="bordered"
                  onPress={() => router.back()}
                  className="px-6 py-2 rounded-lg text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  disabled={createContactPending}
                  className="px-8 py-2 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white rounded-lg shadow-lg transition">
                  {createContactPending ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>

      {/* Optional CTA / Testimonials Section */}
      <section className="bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800 py-16 px-6 text-center rounded-t-3xl shadow-inner">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-600 dark:text-orange-400">
          Why Contact Tiresdash?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 opacity-90">
          We provide expert guidance on tires, fast installation, and ongoing
          vehicle support. Your safety and satisfaction are our top priorities.
        </p>
      </section>
    </div>
  );
}
