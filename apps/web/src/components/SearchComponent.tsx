import { Input, InputGroup } from "@/components/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function SearchComponent({ setCallback }: { setCallback: (search: string) => void }) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setCallback(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    return (
        <InputGroup>
            <MagnifyingGlassIcon />
            <Input
                name="search"
                placeholder="Search…"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </InputGroup>
    );
}
