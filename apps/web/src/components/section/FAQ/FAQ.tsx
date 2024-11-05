import { Container } from "@/components/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const faq = [
    {
        question: "Bagaimana cara membuat akun di WorkHive.com?",
        answer: "Kamu dapat membuat akun dengan mendaftar menggunakan email, akun Google, atau LinkedIn, lalu mengisi data pribadi dan profesional.",
    },
    {
        question: "Apakah WorkHive.com gratis digunakan?",
        answer: "Ya, WorkHive.com dapat digunakan secara gratis oleh pencari kerja untuk membuat profil, mencari lowongan, dan melamar pekerjaan.",
    },
    {
        question: "Bagaimana cara melamar pekerjaan di WorkHive.com?",
        answer: "Setelah menemukan lowongan yang sesuai, kamu bisa klik 'Lamar' dan mengirimkan CV serta surat lamaran langsung melalui platform.",
    },
    {
        question: "Apakah CV saya bisa dilihat oleh perusahaan lain?",
        answer: "CV yang kamu unggah bisa dilihat oleh perusahaan yang terdaftar di WorkHive.com, terutama jika kamu membuatnya publik.",
    },
    {
        question: "Apakah saya bisa mengedit profil dan CV setelah diunggah?",
        answer: "Ya, kamu bisa memperbarui informasi profil dan CV kapan saja melalui dashboard akunmu.",
    },
    {
        question: "Bagaimana cara mengetahui status lamaran saya?",
        answer: "Kamu dapat memeriksa status lamaran di akunmu, biasanya ada notifikasi jika lamaran diterima atau ditindaklanjuti oleh perusahaan.",
    },
    {
        question: "Apakah saya bisa melamar pekerjaan dari luar negeri?",
        answer: "Ya, WorkHive.com juga memiliki lowongan dari perusahaan internasional yang membuka kesempatan bagi pencari kerja dari berbagai lokasi.",
    },
    {
        question: "Bagaimana cara mengaktifkan notifikasi lowongan terbaru?",
        answer: "Kamu bisa mengaktifkan notifikasi dengan mengatur preferensi lowongan di akunmu untuk menerima email tentang pekerjaan baru yang relevan.",
    },
    {
        question: "Apakah saya bisa melamar lebih dari satu pekerjaan?",
        answer: "Tentu saja, kamu bisa melamar ke beberapa lowongan sekaligus tanpa batasan, selama kamu memenuhi kualifikasi yang diminta.",
    },
    {
        question: "Bagaimana jika saya lupa password akun WorkHive.com?",
        answer: "Kamu bisa menggunakan fitur 'Lupa Password' di halaman login, dan instruksi pemulihan kata sandi akan dikirim ke emailmu.",
    },
];

export default function FAQ() {
    return (
        <section className="py-10 sm:py-20" id="faq">
            <Container>
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-reseda-green text-base font-medium tracking-tight">FAQ</h2>
                    <p className="mt-2 text-3xl font-medium text-gray-900">Frequently Asked Questions</p>
                </div>

                <div className="mt-16 grid gap-6">
                    {faq.map((item, index) => (
                        <Disclosure as="div" key={index} className="mx-auto w-full max-w-xl">
                            <DisclosureButton className="group flex w-full justify-between border-b pb-2 text-left">
                                <span className="group-hover:text-reseda-green font-semibold">{item.question}</span>
                                <ChevronDownIcon className={`w-5 group-data-[open]:rotate-180`} />
                            </DisclosureButton>
                            <div className="overflow-hidden py-2">
                                <DisclosurePanel
                                    transition
                                    className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
                                >
                                    {item.answer}
                                </DisclosurePanel>
                            </div>
                        </Disclosure>
                    ))}
                </div>
            </Container>
        </section>
    );
}
