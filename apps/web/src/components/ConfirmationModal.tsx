export default function ConfirmationModal({
    handleCloseModal,
    handleFinish,
}: {
    handleCloseModal: () => void;
    handleFinish: () => void;
}) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-5">
                <h4 className="mb-4 text-lg font-semibold">Confirm Submission</h4>
                <p>Are you sure you want to submit your answers?</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={handleCloseModal} className="mr-2 rounded border border-gray-300 px-4 py-2">
                        Cancel
                    </button>
                    <button onClick={handleFinish} className="bg-reseda-green rounded px-4 py-2 text-white">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
