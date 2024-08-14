import { memo } from "react";

function Footer() {
    return (
        <div className="w-full bg-main h-[20vh] text-center p-2 flex items-center justify-center">
            <h1 className="text-white font-bold">Design by Lê Bá Trình</h1>
        </div>
    );
}

export default memo(Footer);
