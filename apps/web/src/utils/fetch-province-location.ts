export const fetchProviceLocation = async (val: string) => {
    try {
        const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
        const rawData = await res.json()
        const data = rawData.map((item: { name: string }) =>
            item.name
                .toLowerCase()
                .split(" ")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
        );
        return data
    } catch (error) {
        console.log(error)
    }
}