import { LoadingSpinner } from "../ui/loading-spinner";

export function LoadingFolder() {
  return (
    <div className="flex items-center justify-center mt-4">
      <LoadingSpinner className="w-10 h-10" />
    </div>
  );
}
