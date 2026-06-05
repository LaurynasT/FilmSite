import { useState, useEffect } from "react";

export default function UnderConstructionModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("construction-popup");

    if (!seen) {
      setOpen(true);
      localStorage.setItem("construction-popup", "true");
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="w-[90%] max-w-md rounded-xl bg-black p-6 text-center shadow-xl border border-2 border-red">
        <h2 className="text-xl font-bold text-white">🚧 Under Construction</h2>

        <p className="mt-3 text-white">
          Some pages may have a different design while updates are being
          completed.
        </p>

        <button
          onClick={handleClose}
          className="mt-5 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
