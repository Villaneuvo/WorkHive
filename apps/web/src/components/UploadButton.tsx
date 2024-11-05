import { CloudinaryUrl } from "@/utils/interfaces";
import { CldUploadWidget } from "next-cloudinary";

export default function UploadButton({ setCallback }: { setCallback: (url: string) => void }) {
    return (
        <div>
            <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result, widget) => {
                    if (result?.event === "success") {
                        result?.info;
                        const url = (result?.info as CloudinaryUrl)?.url;
                        setCallback(url);
                    }
                }}
            >
                {({ open }) => {
                    return (
                        <button
                            className="bg-reseda-green hover:bg-reseda-green/75 focus:ring-reseda-green/50 relative my-1 w-fit transform rounded-md px-4 py-2 font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
                            onClick={(e) => {
                                e.preventDefault();
                                open();
                            }}
                        >
                            Upload
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
