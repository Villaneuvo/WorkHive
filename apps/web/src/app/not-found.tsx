import Link from "next/link";

function NotFoundPage() {
    return (
        <section className="">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">404</h1>
                    <p className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Something's missing.</p>
                    <p className="mb-4 text-lg font-light">
                        Sorry, we can't find that page. You'll find lots to explore on the home page.{" "}
                    </p>
                    <Link
                        href={"/"}
                        className="bg-reseda-green hover:bg-reseda-green/750 my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white"
                    >
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFoundPage;
