import { formatDate } from "@/utils/helpers";

export default function SubscriptionStatus({
    status,
    endDate,
    method,
}: {
    status: boolean;
    endDate: string;
    method: string;
}) {
    return (
        <div className="mb-6 rounded-md bg-indigo-50 p-4 shadow-sm">
            <p className="text-lg font-medium text-gray-800">
                Status Berlangganan:{" "}
                <span className="text-reseda-green font-semibold">{status ? `Aktif (${method})` : "Tidak Aktif"}</span>
            </p>
            {status && (
                <p className="text-sm text-gray-600">Berlangganan aktif hingga: {formatDate(new Date(endDate))}</p>
            )}
        </div>
    );
}
