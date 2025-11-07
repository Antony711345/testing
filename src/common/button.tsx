import type { ReactNode } from "react";

export interface ButtonProps {
    label: string;
    bgColor?: string;
    textColor?: string;
    paddingX?: string;
    paddingY?: string;
    borderRadius?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
}

export const Button = ({ label, bgColor, textColor, paddingX, paddingY, borderRadius, hoverBgColor, hoverTextColor, handleClick }: ButtonProps & { handleClick: () => void }) => {
    return (
        <button
            type="button"
            aria-label="button"
            className={`${bgColor} ${textColor} ${paddingX} ${paddingY} ${borderRadius} ${hoverBgColor} ${hoverTextColor} cursor-pointer font-bold transition text-center h-fit duration-300 leading-5 capitalize md:text-base text-sm`}
            onClick={handleClick}
        >
            {label}
        </button>
    )
}

export const OutlineButton = (
    { label, paddingX, paddingY, borderRadius, hoverBgColor, hoverTextColor, icon, hoverBorderColor, pathName, isOpenNewTap, handleClick }: Omit<ButtonProps, 'bgColor' | 'textColor'> & { icon?: ReactNode , hoverBorderColor?: string, pathName: string, isOpenNewTap: boolean , handleClick?: () => void  }
) => {
    return (
        <a
            href={pathName}
            target={isOpenNewTap ? "_blank" : "_self"}
            rel="noopener noreferrer"
            onClick={handleClick || undefined}
            className={`border border-[#032246] md:text-sm text-xs ${paddingX} ${paddingY} ${borderRadius} ${hoverBgColor} ${hoverTextColor} ${hoverBorderColor} text-[#032246] cursor-pointer transition text-center h-fit duration-300 leading-5 capitalize flex items-center`}
        >
            {icon && <span className="mr-1">{icon}</span>}
            {label}
        </a>
    )
}