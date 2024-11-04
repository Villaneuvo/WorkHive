import CVTemplateATS from "@/components/section/cv-form/CVTemplate";

export default function CVPage() {
    const userId = "1"; // TODO: ambil dari NextAuth
    return (
        <div>
            <CVTemplateATS userId={userId} />
        </div>
    );
}
