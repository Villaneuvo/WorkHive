import Card from "@/components/Card";
import RegisterForm from "@/components/form/register/RegisterForm";
export default function LoginPage() {
    return (
        <Card>
            <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl">Create an account</h1>
            <RegisterForm />
        </Card>
    );
}
