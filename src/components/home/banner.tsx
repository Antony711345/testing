import { useCallback } from "react";
import { Button } from "../../common/button";
import { buttonData } from "../data.tsx";

export const Banner = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) => {
    
    const handleClickButton = useCallback((label: string) => {
        setSearchTerm(label);
        const featuresElement = document.getElementById('features');
        if (featuresElement) {
            featuresElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [setSearchTerm]);

    return (
        <section className="w-full lg:h-[80vh] md:h-[35vh] h-auto bg-cover bg-center relative font-archivo">
            <div className="absolute inset-0 w-full h-full">
                <img
                    src="images/Pattern.png"
                    alt="Banner"
                    title="Banner image"
                    className="w-full h-auto"
                />
            </div>
            <div className="md:w-[90%] w-11/12 mx-auto h-full flex md:flex-row flex-col md:justify-start justify-end xl:pb-20 md:pb-10 pb-5 md:pt-0 pt-24 relative z-10 xl:gap-20 md:gap-12 gap-7">
                <div className="flex flex-col md:gap-4 gap-2.5 xl:w-[calc(64%_-_2.5rem)] md:w-[calc(62%_-_1.5rem)] w-full md:mt-auto">
                    <span className="xl:text-[2rem] md:text-2xl text-lg font-medium text-[#3B3B3D] leading-[1.5]">Search, click, and connect with trusted local businesses.</span>
                    <p className="xl:text-[6.8rem] md:text-6xl text-4xl font-medium text-[#8F9096] leading-[1] tracking-tight"><span className="text-[#0F1011]">Search in</span> <span className="text-[#316FF6]">Stobay,</span> Get your answers</p>
                </div>
                <div className="flex flex-wrap gap-3 xl:w-[calc(36%_-_2.5rem)] md:w-[calc(38%_-_1.5rem)] w-full md:justify-end xl:pb-20 md:mt-auto">
                    {buttonData.map((label) => (
                        <Button
                            key={label}
                            label={label}
                            bgColor={searchTerm !== label ? "bg-[#f5f5f5]" : "bg-[#316FF6]"}
                            textColor={searchTerm !== label ? "text-[#0F1011]" : "text-white"}
                            paddingX="xl:px-10 md:px-7 px-4"
                            paddingY="xl:py-6 md:py-4 py-2.5"
                            borderRadius="rounded-lg"
                            hoverBgColor="hover:bg-[#316FF6]"
                            hoverTextColor="hover:text-white" 
                            handleClick={() => handleClickButton(label)}                        
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}