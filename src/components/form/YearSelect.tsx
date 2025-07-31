import { useFormContext } from "react-hook-form";

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear + 2 - 1900 },
  (_, i) => 1900 + i,
);

export const YearSelect = ({ defaultValue }: any) => {
  const { register } = useFormContext();

  return (
    <div className="flex-1 min-w-[150px]">
      <select
        {...register("year.numeric", { required: true })}
        defaultValue={defaultValue}
        className="w-full border-2 border-[#71717ab3] bg-default-50 rounded-lg px-2 py-3.5"
      >
        <option value="">Select Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};
