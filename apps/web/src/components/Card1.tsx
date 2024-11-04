import clsx from "clsx";

export default function Card({
    children,
    size = "md",
    className,
}: {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}) {
    const sizecard = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };
    return (
        <div className={clsx("rounded-lg shadow-lg", "overflow-hidden", "w-full", sizecard[size], className)}>
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
}
