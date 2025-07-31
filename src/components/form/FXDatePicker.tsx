import { IInput } from "@/src/types";
import { DatePicker } from "@heroui/date-picker";
import { Controller } from "react-hook-form";

interface IProps extends IInput {}

const FXDatePicker = ({ label, name, variant = "bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          {...fields}
          variant={variant}
        />
      )}
    />
  );
};

export default FXDatePicker;
