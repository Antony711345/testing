import { useEffect, useState } from "react"
import { LocationPin, Message, MobilePhone } from "../../assets/icons"
import { OutlineButton } from "../../common/button"
import type { TemplateFormDataType } from "../../services/user/user.interfaces";

export const Menu = ({ businessDetail }: { businessDetail: TemplateFormDataType | undefined }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            setIsScrolled(scrollTop > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const ButtonData = [
        {
            label: 'Book a call',
            icon: <MobilePhone className="h-4 w-4" />,
            pathName: businessDetail?.phoneNumber ? `tel:${businessDetail.phoneNumber}` : '#',
            isOpenNewTap: false
        },
        {
            label: 'WhatsApp',
            icon: <Message className="h-4 w-4" />,
            pathName: businessDetail?.whatsAppUrl || '#',
            isOpenNewTap: true
        },
        {
            label: 'Directions',
            icon: <LocationPin className="h-4 w-4" />,
            pathName: businessDetail?.googleMapLink || '#',
            isOpenNewTap: true
        }
    ]

    useEffect(() => {
        if (businessDetail?.uploadLogo) {
            if (typeof businessDetail?.uploadLogo === 'string') {
                setImagePreview(businessDetail.uploadLogo);
            }
        }
    }, [businessDetail])

    return (
        <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 font-inter h-fit ${isScrolled || isMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="w-[90%] mx-auto md:py-6 py-2.5 flex justify-between items-center transition-all duration-500 md:px-4">
                <a href="#" title="Logo" aria-label="Logo" className="relative z-10 flex items-center gap-2">
                    <img src={imagePreview} alt="Logo" title="Logo" className="w-auto xl:h-auto md:h-14 h-9" />
                    {!imagePreview && <span className="md:text-2xl">{businessDetail?.businessName}</span>}
                </a>
                <div className="md:flex hidden items-center gap-4">
                    {ButtonData &&
                        ButtonData.map((button, index) => (
                            <OutlineButton
                                key={index}
                                label={button.label}
                                icon={button.icon}
                                paddingX="px-4"
                                paddingY="py-2"
                                borderRadius="rounded-md"
                                hoverBgColor="hover:bg-[#032246]"
                                hoverTextColor="hover:text-[#FC0]"
                                pathName={button.pathName}
                                isOpenNewTap={button.isOpenNewTap}
                            />
                        ))
                    }
                </div>
                <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex cusor-pointer relative z-10">
                    {isMenuOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" className='w-7 h-7 text-black'>
                        <path d="M22.1574 8.10742L7.41992 22.8449M7.41992 8.10742L22.1574 22.8449" stroke="black" strokeWidth="2.45625" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='w-7 h-7 text-black'>
                            <path fill="currentColor" d="M3 8h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2m18 8H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2m0-5H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2" />
                        </svg>}
                </div>
            </div>
            <div className={`${isMenuOpen ? '-translate-y-2' : '-translate-y-[400%]'} transition-transform duration-500 md:hidden bg-white w-full absolute left-0 top-full shadow-md`}>
                <div className="flex items-center gap-2.5 flex-wrap justify-center py-4">
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
                                isOpenNewTap={button.isOpenNewTap}
                            />
                        ))
                    }
                </div>
            </div>
        </header>
    )
}