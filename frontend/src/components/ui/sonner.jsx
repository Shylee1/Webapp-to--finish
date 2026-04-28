import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({
  ...props
}) => {
  // Using dark theme by default since the app uses a dark theme
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-900 group-[.toaster]:text-white group-[.toaster]:border-zinc-800 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-zinc-400",
          actionButton:
            "group-[.toast]:bg-[#0FECEC] group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-zinc-800 group-[.toast]:text-zinc-400",
        },
      }}
      {...props} />
  );
}

export { Toaster, toast }
