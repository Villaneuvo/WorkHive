export default function SubscriptionCard({
    title,
    price,
    description,
    features,
}: {
    title: string;
    price: string;
    description: string;
    features: string[];
}) {
    return (
        <div className="rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-reseda-green mt-2 text-lg font-medium">{price} / month</p>
            <p className="mt-4 text-gray-600">{description}</p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-700">
                {features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
}
