import SearchBar from "@/components/SearchBar";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
                <div className="max-w-8xl mx-auto flex flex-col-reverse pb-24 pt-5 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                    <div className="px-6 lg:px-0 lg:pt-4">
                        <div className="mx-auto max-w-2xl">
                            <div className="max-w-lg">
                                <h1 className="mt-10 text-4xl font-semibold tracking-tight sm:text-6xl">
                                    Temukan dan wujudkan karier impianmu di{" "}
                                    <span className="text-reseda-green font-bold">WorkHive.com.</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus atque provident
                                    nesciunt sunt? Quod neque excepturi nobis fugiat quo alias veritatis blanditiis sit
                                    dolores! Tempora saepe rem tenetur fuga magnam.
                                </p>
                                <SearchBar />
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                        <div
                            className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
                            aria-hidden="true"
                        />
                        <div className="shadow-lg md:rounded-3xl">
                            <div className="bg-reseda-green [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                                <div
                                    className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                                    aria-hidden="true"
                                />
                                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                                    <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                                        <div className="rounded-tl-xl">
                                            <div className="flex">
                                                <div className="-mb-px">
                                                    <Image
                                                        src="/hero-image-with-bg.jpeg"
                                                        alt="Hero Image"
                                                        width={1000}
                                                        height={1000}
                                                        className="rounded object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>
        </div>
    );
}
