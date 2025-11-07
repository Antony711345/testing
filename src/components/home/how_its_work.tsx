import { HalfCircle, Mobile, Monitor, Search, WhatsApp } from "../../assets/icons";

export const HowItWorks = () => {
    return (
        <section className="xl:py-20 md:py-10 py-5 bg-white font-archivo">
            <div className="xl:w-3/4 w-[90%] mx-auto text-[#030014] flex flex-col md:gap-24 gap-14">
                <div className="flex flex-col xl:gap-5 gap-3 text-center">
                    <span className="xl:text-[6.8rem] md:text-6xl text-3xl font-medium tracking-tight leading-none">How It Works</span>
                    <p className="xl:text-[2rem] md:text-2xl text-lg tracking-tight text-[#030014]">It’s about you and your family, having a comfortable payment, exceptional service and a lender.</p>
                </div>
                <div className="flex flex-col xl:gap-24 gap-14">
                    <div className="flex md:flex-nowrap flex-wrap xl:gap-52 md:gap-28 gap-5">
                        <div className="xl:w-2/5 md:w-1/2 w-full relative">
                            <HalfCircle className="w-full h-auto text-[#FFE9E9]"/>
                            <span className="absolute md:-top-10 -top-7 md:-left-7 -left-3 font-semibold md:text-8xl text-6xl text-[#D7D7D7] font-poppins">01</span>
                            <div className="bg-white md:px-7 px-5 pt-3 md:pb-7 pb-5 shadow-md absolute md:-top-10 -top-7 md:-right-7 right-0 shadow-custom-deep border border-[#F1F1F1] flex flex-col items-center xl:gap-5 gap-3">
                                <span className="text-[#222831] md:text-2xl text-xl font-bold">Search</span>
                                <div className="bg-[#FAFAFA] py-1.5 flex justify-between shadow-inset-soft md:w-72 w-56">
                                    <input type="text" placeholder="Search services" className="bg-transparent outline-none md:px-4 px-2.5 md:w-full text-xs placeholder:text-[#D7D7D7] text-[#D7D7D7] font-poppins" />
                                    <button type="button" className="md:px-4 px-2.5 py-1 text-[#316FF6] text-sm font-medium border-l-2 border-[#e3e3e3]">
                                        <Search className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:gap-7 gap-3">
                            <span className="text-[#222831] md:text-2xl text-xl">Search</span>
                            <span className="text-base text-[#425466] md:text-base text-sm">Find businesses by category, name, or location in Madurai</span>
                        </div>
                    </div>
                    <div className="flex md:flex-nowrap flex-wrap-reverse xl:gap-52 md:gap-28 gap-5">
                        <div className="flex flex-col md:gap-7 gap-3">
                            <span className="text-[#222831] md:text-2xl text-xl">Click</span>
                            <span className="md:text-base text-sm text-[#425466]">Browse detailed profiles with photos and AI assistance</span>
                        </div>
                        <div className="xl:w-2/5 md:w-1/2 w-full relative">
                            <HalfCircle className="w-full h-auto text-[#F5F7FF]" />
                            <span className="absolute md:-top-10 -top-7 md:-left-7 -left-3 font-semibold md:text-8xl text-6xl text-[#D7D7D7] font-poppins">02</span>
                            <div className="absolute md:-top-10 -top-7 md:-right-7 right-0 bg-white md:p-9 p-5 shadow-custom-deep border border-[#F1F1F1] flex flex-col xl:gap-6 md:gap-4 gap-2.5 items-center">
                                <p className="text-[#222831] md:text-2xl text-xl font-bold w-11/12">Click</p>
                                <div className="flex flex-col md:gap-3 gap-1.5 md:w-64 w-48 items-center">
                                    <span className="w-full h-2.5 rounded-full bg-[#f1f1f1]"></span>
                                    <span className="w-11/12 h-2.5 rounded-full bg-[#f1f1f1]"></span>
                                    <span className="w-11/12 h-2.5 rounded-full bg-[#f1f1f1]"></span>
                                    <span className="w-11/12 h-2.5 rounded-full bg-[#f1f1f1]"></span>
                                </div>
                                <button type="button" className="bg-primary px-6 py-2 text-white text-xs font-medium font-poppins">Browse</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex-nowrap flex-wrap xl:gap-52 md:gap-28 gap-5">
                        <div className="xl:w-2/5 md:w-1/2 w-full relative">
                            <HalfCircle className="w-full h-auto text-[#FFF5DA]"/>
                            <span className="absolute md:-top-10 -top-7 md:-left-7 -left-3 font-semibold md:text-8xl text-6xl text-[#D7D7D7] font-poppins">03</span>
                            <div className="absolute top-2 right-2 flex md:gap-8 gap-5 md:px-9 px-5 md:py-7 py-4 bg-white border border-[#F1F1F1] shadow-custom-deep">
                                <Mobile className="md:w-14 w-10"/>
                                <WhatsApp className="md:w-14 w-10"/>
                                <Monitor className="md:w-14 w-10"/>
                            </div>
                        </div>
                        <div className="flex flex-col md:gap-7 gap-3">
                            <span className="text-[#222831] md:text-2xl text-xl">Connect</span>
                            <span className="md:text-base text-sm text-[#425466]">Contact directly via call, WhatsApp, or book services</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}