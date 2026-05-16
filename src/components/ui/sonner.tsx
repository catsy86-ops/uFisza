import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:font-body",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-beer-amber group-[.toast]:text-beer-dark group-[.toast]:font-bold",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:border-beer-hop/30 group-[.toaster]:bg-beer-hop/5",
          error: "group-[.toaster]:border-destructive/30",
        },
      }}
      icons={{
        success: <span style={{ fontSize: 18 }}>🍺</span>,
        error: <span style={{ fontSize: 18 }}>😢</span>,
        info: <span style={{ fontSize: 18 }}>🐟</span>,
        warning: <span style={{ fontSize: 18 }}>⚠️</span>,
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
