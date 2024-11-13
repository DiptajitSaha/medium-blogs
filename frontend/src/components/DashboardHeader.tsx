import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

const DashboardHeader = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        addEventListener('resize', () => setWidth(window.innerWidth));
        return removeEventListener('resize', () => setWidth(window.innerWidth));
    }, []);

    return (
        <div className="mx-5 p-1 flex justify-between text-gray-500">
            <div className="flex gap-1 flex-grow">
                <img itemType="image/svg+xml" src="/medium.svg" height={40} width={112.5}/>
                {width >= 550 ? <SearchBox height={40} style={'ml-5'}/> : ''}
            </div>
            <div className="flex">
                {width < 550 ? <div className="flex flex-col justify-center mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z" clip-rule="evenodd"></path></svg>
                </div> : ''}
                <div className="flex  mr-3">
                    <img itemType="image/svg+xml" src="/write.svg" className="my-3" height={24} width={24}/>
                    <div className="my-3 ml-2">
                        Write
                    </div>
                </div>
                <div className="m-3 ">
                    <img itemType='image/svg+xml' src="bell.svg" className="mx-3" height={24} width={24}/>
                </div>
            </div>
        </div>
    );
}

export default DashboardHeader;