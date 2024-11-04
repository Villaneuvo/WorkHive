import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface RatingModalProps {
    handleCloseModal: () => void;
    handleFinish: () => void;
    children: ReactNode;
    isAnonymous: boolean;
    setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
}

const RatingModal: React.FC<RatingModalProps> = ({
    handleCloseModal,
    handleFinish,
    children,
    isAnonymous,
    setIsAnonymous,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            >
                <div className="text-center">{children}</div>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleCloseModal}
                        className="mr-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleFinish}
                        className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-400"
                    >
                        Submit
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default RatingModal;
