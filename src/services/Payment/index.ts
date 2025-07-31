"use server";

import { axiosInstance } from "@/src/lib/AxiosInstance";

export const createPayment = async ( payment: any): Promise<any> => {
  console.log({payment})
  try {
    const { data } = await axiosInstance.post(`/payment/create-payment-intent`, {...payment}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error({error});
    throw new Error("Failed to create payment!");
  }
};

export const getSinglePayment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/payment/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Tire");
  }
};


export const verifyStripePayment = async ( payment: any): Promise<any> => {
  console.log({payment})
  try {
    const { data } = await axiosInstance.post(`/payment/verify-stripe`, {...payment}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error({error});
    throw new Error("Failed to verify stripe payment!");
  }
};

export const verifyPaypalPayment = async ( payment: any): Promise<any> => {
  console.log({payment})
  try {
    const { data } = await axiosInstance.post(`/payment/verify-paypal`, {...payment}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error({error});
    throw new Error("Failed to verify paypal payment!");
  }
};
