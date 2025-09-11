"use client";

import { useGetSingleAppointment } from "@/src/hooks/appointment.hook";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Settings,
  Shield,
  Zap,
  Timer,
  Users,
  FileText,
  Star,
  Award,
} from "lucide-react";

const SingleAppointmentPage = () => {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;

  const {
    data: appointmentData,
    isLoading,
    isError,
    refetch,
  } = useGetSingleAppointment(appointmentId);

  const appointment: any = appointmentData?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-black dark:to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
            Loading appointment details...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-black dark:to-black flex items-center justify-center">
        <div className="text-center space-y-6 p-8">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Appointment Not Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We couldn't load the appointment details. Please try again.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const user = appointment.user || {};
  const services = appointment.services || {};
  const mostPopularServices = services.mostPopularServices || {};
  const otherServices = services.otherServices || {};
  const schedule = appointment.schedule || {};

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
    }
  };

  const formatServiceName = (serviceName: string) => {
    return serviceName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase();
    if (name.includes("tire") || name.includes("wheel"))
      return <Car className="w-4 h-4" />;
    if (name.includes("repair")) return <Wrench className="w-4 h-4" />;
    if (name.includes("inspection")) return <Shield className="w-4 h-4" />;
    if (name.includes("balance")) return <Settings className="w-4 h-4" />;
    if (name.includes("fleet")) return <Users className="w-4 h-4" />;
    if (name.includes("pressure")) return <Zap className="w-4 h-4" />;
    if (name.includes("winter")) return <Timer className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-black dark:via-black dark:to-black">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors duration-200">
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Appointment Details
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  ID: {appointment.id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor(appointment.status)} transition-all duration-200`}>
                {appointment.status?.charAt(0).toUpperCase() +
                  appointment.status?.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Schedule & Customer */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule Card */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Schedule Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Date
                      </p>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {schedule.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Time
                      </p>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {schedule.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Car className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Service Plan
                      </p>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 capitalize">
                        {schedule.planTo?.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Vehicle Drop-off
                      </p>
                      <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {schedule.someoneElseWillBringCar
                          ? "Someone Else"
                          : "Customer"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Card */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Requested Services
                </h2>
              </div>

              <div className="space-y-6">
                {/* Most Popular Services */}
                {Object.entries(mostPopularServices).some(
                  ([_, value]) => value
                ) && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-amber-500" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Popular Services
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(mostPopularServices).map(
                        ([key, value]) =>
                          value ? (
                            <div
                              key={key}
                              className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                              {getServiceIcon(key)}
                              <span className="font-medium text-slate-800 dark:text-slate-200">
                                {formatServiceName(key)}
                              </span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 ml-auto" />
                            </div>
                          ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* Other Services */}
                {Object.entries(otherServices).some(([_, value]) => value) && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="w-5 h-5 text-blue-500" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Additional Services
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(otherServices).map(([key, value]) =>
                        value ? (
                          <div
                            key={key}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                            {getServiceIcon(key)}
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {formatServiceName(key)}
                            </span>
                            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-auto" />
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                {services.additionalNotes && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        Additional Notes
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {services.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Customer Info & Meta */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Customer Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Full Name
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {user.firstName} {user.lastName}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Email
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 break-all">
                    {user.email}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Phone
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200">
                    {user.phoneNumber}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Address
                    </span>
                  </div>
                  <div className="text-slate-800 dark:text-slate-200 space-y-1">
                    <p>{user.addressLine1}</p>
                    {user.addressLine2 && <p>{user.addressLine2}</p>}
                    <p>
                      {user.city}, {user.state} {user.zipCode}
                    </p>
                    <p>{user.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Timeline */}
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 p-6 shadow-xl shadow-slate-200/20 dark:shadow-slate-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  Timeline
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      Appointment Created
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(appointment.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      Last Updated
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(appointment.updatedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAppointmentPage;
