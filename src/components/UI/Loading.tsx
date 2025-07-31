import { Spinner } from "@heroui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-black/15 fixed inset-0 z-[999] backdrop-blur-md flex justify-center items-center">
      <Spinner color="danger" size="lg" />
    </div>
  );
};

export default Loading;
