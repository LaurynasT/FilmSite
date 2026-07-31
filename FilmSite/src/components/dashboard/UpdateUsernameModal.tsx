import { useState } from "react";
import { updateName } from "../../services/userService";
import { NewName } from "../../interfaces/user/UpdateName";
import { useNotificationStore } from "../../store/errorStore";

type Props = {
  onClose: () => void;
};
export default function UpdateUsernameModal({ onClose }: Props) {
  const [newName, setNewName] = useState<NewName | null>({
    NewName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotificationStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!newName) return;
      await updateName(newName);
      showSuccess("Username updated successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Failed to update username.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-lg p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition text-xl bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-white text-xl font-bold mb-6">Change Username</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="New Username"
            value={newName?.NewName}
            onChange={(e) =>
              setNewName({
                NewName: e.target.value,
              })
            }
            required
            className="w-full p-2 border border-gray-600 rounded bg-white/10 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-red-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Username"}
          </button>
        </form>
      </div>
    </div>
  );
}
