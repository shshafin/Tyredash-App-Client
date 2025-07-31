import { CloudAlert, LoaderCircle, SearchX } from "lucide-react";

export const DataLoading = () => {
  return (
    <div className="flex justify-center items-center gap-2 w-full h-[200px] rounded-lg bg-white dark:bg-zinc-900 px-3 pt-1 pb-3 rounded-b-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-900/50">
      <LoaderCircle className="h-5 w-5 animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export const DataError = () => {
  return (
    <div className="flex justify-center items-center gap-2 w-full h-[200px] rounded-lg bg-white dark:bg-zinc-900 px-3 pt-1 pb-3 rounded-b-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-900/50">
      <CloudAlert className="h-5 w-5" />
      <p>Error...</p>
    </div>
  );
};

export const DataEmpty = () => {
  return (
    <div className="flex justify-center items-center gap-2 w-full h-[200px] rounded-lg bg-white dark:bg-zinc-900 px-3 pt-1 pb-3 rounded-b-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-900/50">
      <SearchX className="h-5 w-5" />
      <p>No data...</p>
    </div>
  );
};
