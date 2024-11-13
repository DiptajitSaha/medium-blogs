
export default function SearchBox({height, width, style}: PropType) {
    return (
        <div className="flex flex-col justify-center">
            <div className={`bg-gray-50 flex justify-between rounded-full h-[${height}px] w-[${width}px] ${style}`}>
                <div className="flex flex-col justify-center mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clip-rule="evenodd"></path></svg>
                </div>
                <div className="py-2 pr-4">
                    <input type="text" className="bg-transparent h-6 focus-visible:outline-none" placeholder="Search"/>
                </div>
            </div>
        </div>
    )
}

interface PropType {
    height: number,
    width?: number,
    style?: string
}