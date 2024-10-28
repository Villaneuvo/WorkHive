export default function Card({
    children,
    size = "md",
}: {
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}) {
    const sizecard = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
    };
    return (
        <div className={`w-full ${sizecard[size]} overflow-hidden rounded-lg bg-white shadow`}>
            <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
    );
}
