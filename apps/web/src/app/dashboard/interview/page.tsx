import { Button } from "@/components/Button";
import ScheduleForm from "@/components/form/schedule/ScheduleForm";
import InterviewScheduleTable from "@/components/table/interview/InterviewScheduleTable";

export default function InterviewSchedulePage() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Interview Schedule</h1>
                    <p className="mt-2 text-sm text-gray-700">Manage interview schedules for your organization</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <ScheduleForm />
                </div>
            </div>
            <InterviewScheduleTable />
        </div>
    );
}
