import { useEffect, useState } from "react"

export const Menu = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            setIsScrolled(scrollTop > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 font-archivo ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="w-[90%] mx-auto xl:py-9 md:py-7 py-4 border-b border-[#0F1011]/10 flex justify-between items-center transition-all duration-500">
                <a href="https://stobay.ai" aria-label="Stobay Logo" title="Stobay Logo" className='flex gap-2 items-center'>
                    <img
                        alt="Stobay Logo"
                        src="images/logo.png"
                        title='Stobay Logo'
                        className='md:h-[2.5rem] h-[2rem] w-auto'
                    />
                </a>
            </div>
        </header>
    )
}