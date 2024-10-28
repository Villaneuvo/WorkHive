import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from "@heroicons/react/20/solid";
type AlertProps = {
    type: "success" | "info" | "warning" | "error";
    message: string;
};
export default function Alert({ type, message }: AlertProps) {
    const typealert = {
        success: {
            background: "bg-green-50",
            text: "text-green-800",
            icon: <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />,
        },
        info: {
            background: "bg-blue-50",
            text: "text-blue-800",
            icon: <InformationCircleIcon aria-hidden="true" className="h-5 w-5 text-blue-400" />,
        },
        warning: {
            background: "bg-yellow-50",
            text: "text-yellow-800",
            icon: <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />,
        },
        error: {
            background: "bg-red-50",
            text: "text-red-800",
            icon: <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />,
        },
    };
    return (
        <div className={`my-2 rounded-md p-4 ${typealert[type].background}`}>
            <div className="flex">
                <div className="flex-shrink-0">{typealert[type].icon}</div>
                <div className="ml-3">
                    <p className={`text-sm font-medium ${typealert[type].text}`}>{message}</p>
                </div>
            </div>
        </div>
    );
}
