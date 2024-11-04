import React from "react";

interface RatingModalProps {
    handleCloseModal: () => void;
    children: React.ReactNode; // Children for modal content
}

const RatingModal: React.FC<RatingModalProps> = ({ handleCloseModal, children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <button onClick={handleCloseModal} className="absolute right-2 top-2 text-gray-600">
                    &times;
                </button>
                <div>{children}</div>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleCloseModal} className="bg-reseda-green rounded px-4 py-2 text-white">
                        Close Statistics
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingModal;
