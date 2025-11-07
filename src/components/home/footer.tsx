import { Arrow, Facebook, Instagram, LinkedIn, Twitter } from "../../assets/icons";
import { buttonData } from "../data.tsx";

export const Footer = () => {
    return (
        <footer className="xl:pt-10 xl:pb-20 pt-5 pb-5">
            <div className="w-[90%] mx-auto flex flex-wrap xl:gap-24 md:gap-10 gap-5 font-archivo">
                <div className="xl:w-[calc(48%_-_3rem)] md:w-[calc(45%_-_1.25rem)] w-full flex flex-col justify-between">
                    <div className="flex flex-col xl:gap-7 gap-5">
                        <span className="xl:text-[1.313rem] md:text-lg font-medium text-[#0F1011] xl:!leading-loose">Your trusted local business directory for Madurai. Connecting customers with quality service providers across the temple city.</span>
                        <div className="w-11/12 h-px bg-[#0F1011]/50"></div>
                        <div className="flex flex-wrap gap-x-5 gap-y-2 xl:w-3/5 md:w-3/4 w-full">
                            {
                                buttonData.map((button, index) => {
                                    return (
                                        <button key={index} className="text-[#0F1011] flex md:gap-5 gap-2 md:text-base text-sm capitalize cursor-pointer">
                                            {button}
                                            <span>/</span>
                                        </button>
                                    );
                                })
                            }
                            <button className="text-[#0F1011] flex md:gap-5 gap-2 md:text-base text-sm cursor-pointer">
                                Contacts
                            </button>
                        </div>
                    </div>
                    <div className="flex xl:gap-7 md:gap-5 gap-2.5 md:mt-0 mt-5">
                        <a href="#" title="Facebook" aria-label="Facebook" className="hover:scale-110 transition-transform">
                            <Facebook className="md:w-7 w-5 md:h-7 h-5"/>
                        </a>
                        <a href="#" title="Twitter" aria-label="Twitter" className="hover:scale-110 transition-transform">
                            <Twitter className="md:w-7 w-5 md:h-7 h-5"/>
                        </a>
                        <a href="#" title="Instagram" aria-label="Instagram" className="hover:scale-110 transition-transform">
                            <Instagram className="md:w-7 w-5 md:h-7 h-5"/>
                        </a>
                        <a href="#" title="LinkedIn" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                            <LinkedIn className="md:w-7 w-5 md:h-7 h-5"/>
                        </a>
                    </div>
                </div>


                <div className="xl:w-[calc(52%_-_3rem)] md:w-[calc(55%_-_1.25rem)] w-full flex flex-col">
                    <div className="flex md:flex-nowrap flex-wrap-reverse xl:gap-8 gap-4 w-full justify-between border-t-2 pt-5 border-[#0F1011]/50">
                        <div className="xl:w-[calc(39%_-_1.33rem)] md:w-[calc(32%_-_0.666rem)] w-full xl:text-7xl md:text-4xl text-3xl font-medium text-[#0F1011]">Madurai Diary</div>
                        <div className="xl:w-[calc(30%_-_1.33rem)] md:w-[calc(39%_-_0.666rem)] w-full text-[#0F1011] flex flex-col xl:gap-4 gap-2">
                            <a href="tel:+91 98765 43210" title="+91 98765 43210" className="md:text-base text-sm">+91 98765 43210</a>
                            <a href="mailto:hello@maduraidiary.com" title="hello@maduraidiary.com" className="md:text-base text-sm">hello@maduraidiary.com</a>
                        </div>
                        <a href="https://www.stobay.ai/" title="Stobay" className='flex gap-2 items-center xl:w-[calc(28%_-_1.33rem)] md:w-[calc(29%_-_0.666rem)] w-full h-fit'>
                            <img
                                alt="Stobay Logo"
                                src="images/logo.png"
                                title='Stobay Logo'
                                className="md:h-[2.5rem] h-[1.8rem] w-auto"
                            />
                        </a>
                    </div>
                    <button type="button" aria-label="Subscribe to newsletter" className="bg-[#316FF6] md:w-16 w-10 md:h-16 h-10 rounded-full flex items-center justify-center -rotate-45 md:mt-12 mt-5 md:ml-5 ml-2.5">
                        <Arrow className="md:w-10 w-5 md:h-10 h-5 text-white"/>
                    </button>
                    <div className="md:mt-7 mt-5 flex justify-between items-center w-full">
                        <a href="#" title="Privacy Policy" className="text-xs">Privacy Policy</a>
                        <a href="#" title="Terms of Service" className="text-xs">Terms of Service</a>
                        <a href="#" title="List Your Business" className="text-xs">List Your Business</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}