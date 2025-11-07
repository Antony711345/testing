import { useCallback } from "react";
import { Contact, MobilePhone, Share } from "../../assets/icons";
import { OutlineButton } from "../../common/button";
import type { TemplateFormDataType } from "../../services/user";

export const Footer = ({ businessDetail }: { businessDetail: TemplateFormDataType | undefined }) => {
    const handleShareContact = useCallback(async () => {
        const bot_username = window.location.pathname.split('/')[1] || '';
        if (businessDetail) {
            try {
                // Create contact text to share
                const contactText = `
                Contact: ${bot_username}
                ${businessDetail?.aboutText ? `About: ${businessDetail?.aboutText}` : ''}
                ${businessDetail?.phoneNumber ? `Phone: ${businessDetail?.phoneNumber}` : ''}
                Powered by Stobay
                `.trim();

                // Check if Web Share API is supported
                if (navigator.share) {
                    await navigator.share({
                        title: `${bot_username} - Contact`,
                        text: contactText,
                        url: window.location.href,
                    });
                } else {
                    // Fallback: Copy to clipboard
                    await navigator.clipboard.writeText(contactText);
                }
            } catch (error) {
                console.error('Error sharing contact:', error);
            }
        }
    }, [businessDetail]);

    const ButtonData = [
        { label: 'Book a call', icon: <MobilePhone className="h-4 w-4" />, pathName: `tel:${businessDetail?.phoneNumber}` },
        { label: 'Contact Owner', icon: <Contact className="h-4 w-4" />, pathName: `tel:${businessDetail?.phoneNumber}` },
        { label: 'Share Page', icon: <Share className="h-4 w-4" />, pathName: `#`, handleClick: handleShareContact }
    ]

    return (
        <footer className="md:py-10 py-5 border-t border-[#032246] font-inter md:mt-24 mt-12">
            <div className="md:w-[90%] w-full md:px-0 px-3 mx-auto flex flex-wrap-reverse items-center justify-between gap-5">
                <div className="text-[#434343] text-sm leading-normal text-center md:w-fit w-full">This page is powered by <a href="https://stobay.ai" className="text-[#316FF6]">Stobay</a> </div>
                <div className="md:flex hidden flex-wrap items-center justify-center md:gap-4 gap-2.5">
                    {
                        ButtonData.map((button, index) => (
                            <OutlineButton
                                key={index}
                                label={button.label}
                                icon={button.icon}
                                paddingX="md:px-4 px-2.5"
                                paddingY="md:py-2 py-1.5"
                                borderRadius="rounded-md"
                                hoverBgColor="hover:bg-[#032246]"
                                hoverTextColor="hover:text-[#FC0]"
                                pathName={button.pathName}
                                isOpenNewTap={false}
                                handleClick={button.handleClick}
                            />
                        ))
                    }
                </div>
            </div>
        </footer>
    );
}