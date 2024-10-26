import { SearchJobPosition } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

export function SearchBarResultPosition({
    position,
    handleSelectPosition,
}: {
    position: SearchJobPosition;
    handleSelectPosition: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <>
            <li
                key={position.id}
                className="text-text-main cursor-pointer px-4 py-2 text-sm leading-5 hover:bg-gray-50"
                onClick={() => handleSelectPosition(position.title)}
            >
                <Link className="ml-3 flex flex-row items-center gap-x-5 text-base" href="#">
                    <div className="h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                        <Image
                            width={60}
                            height={60}
                            alt={position?.title}
                            src={position?.bannerUrl}
                            className="group-hover:opacity-75"
                        />
                    </div>
                    <div className="flex flex-col gap-y-1 text-xs">
                        <span className="text-sm font-semibold">{position.title}</span>
                        <span>{position.admin.companyName}</span>
                        <span>
                            {position.cityLocation}, {position.provinceLocation}
                        </span>
                    </div>
                </Link>
            </li>
        </>
    );
}

export function SearchBarLocationResult({
    location,
    handleSelectLocation,
}: {
    location: string;
    handleSelectLocation: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <>
            <li
                key={location}
                className="text-text-main cursor-pointer px-4 py-2 text-sm leading-5 hover:bg-gray-50"
                onClick={() => handleSelectLocation(location)}
            >
                <div className="ml-3 text-base">
                    <span>{location}</span>
                </div>
            </li>
        </>
    );
}
