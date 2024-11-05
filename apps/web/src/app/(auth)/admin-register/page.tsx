import Card from "@/components/Card1";
import AdminRegisterForm from "@/components/form/register/AdminRegisterForm";
export default function LoginPage() {
    return (
        <Card className="">
            <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl">
                Create an admin company account
            </h1>
            <AdminRegisterForm />
        </Card>
    );
}
