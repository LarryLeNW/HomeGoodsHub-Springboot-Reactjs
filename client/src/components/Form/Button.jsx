import { memo } from "react";
import ICONS from "utils/icons";

function Button({
    name,
    handleClick,
    style,
    iconBefore,
    iconAfter,
    fw,
    disabled,
    isLoading,
    type = "button",
}) {
    return (
        <button
            type={type}
            className={
                style ||
                `px-4 p-2 rounded-md text-white bg-main font-semibold cursor-pointer text-center ${
                    fw ? "w-full" : "w-fit"
                } ${(isLoading || disabled) && "opacity-30 cursor-not-allowed"}
        `
            }
            onClick={() => {
                !isLoading && !disabled && type != "submit" && handleClick();
            }}
        >
            <div className="flex gap-2 justify-center items-center">
                <div className="flex gap-2 items-center">
                    {iconBefore}
                    <span> {name}</span>
                    {iconAfter}
                </div>
                {isLoading && (
                    <div>
                        <ICONS.AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                )}
            </div>
        </button>
    );
}

export default memo(Button);
