import Card from "@/components/Card";
import ChangePasswordForm from "@/components/form/change-password/ChangePasswordForm";

export default function ChangePasswordPage({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    return (
        <Card>
            <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl">Change Password</h1>
            <ChangePasswordForm token={(searchParams?.token as string) || ""} />
        </Card>
    );
}
