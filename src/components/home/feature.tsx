import { useEffect, useState } from "react";
import { Button } from "../../common/button";
import { Card } from "../card";
import { buttonData } from "../data.tsx";
import type { BusinessProfile } from "../../services/user/index.ts";

export const Feature = ({ searchTerm, setSearchTerm, businessList }: { searchTerm: string; setSearchTerm: (term: string) => void; businessList: BusinessProfile[] }) => {
    const [filterdata, setFilterdata] = useState(businessList);

    useEffect(() => {
        if (searchTerm) {
            const filtered = businessList.filter(item => item.business_type === searchTerm);
            setFilterdata(filtered);
        } else {
            setFilterdata(businessList);
        }
    }, [searchTerm, businessList]);

    return (
        <section id="features" className="w-full xl:py-24 md:py-14 py-7 font-archivo">
            <div className="w-[90%] mx-auto flex flex-col items-center xl:gap-24 md:gap-14 gap-5 xl:p-24 md:p-14 p-6 xl:rounded-3xl md:rounded-2xl rounded-xl bg-gray-200">
                <div className="flex flex-col xl:gap-5 gap-3 text-[#0F1011] w-full text-center">
                    <span className="xl:text-[6.8rem] md:text-6xl text-3xl tracking-tight leading-none">Featured Businesses</span>
                    <span className="xl:text-[2rem] md:text-2xl text-lg tracking-tight">Discover trusted local services handpicked for quality and reliability</span>
                </div>

                <div className="flex flex-wrap md:gap-4 gap-2.5 justify-center w-full">
                    {
                        buttonData.map((button) => (
                            <Button
                                key={button}
                                label={button}
                                bgColor={searchTerm !== button ? "bg-white" : "bg-[#316FF6]"}
                                textColor={searchTerm !== button ? "text-[#0F1011]" : "text-white"}
                                paddingX="xl:px-10 px-5"
                                paddingY="xl:py-6 py-4"
                                borderRadius="xl:rounded-2xl rounded-xl"
                                hoverBgColor="hover:bg-[#316FF6]"
                                hoverTextColor="hover:text-white"
                                handleClick={() => setSearchTerm(button)}                            
                            />
                        ))
                    }
                </div>

                <div className="flex flex-wrap xl:gap-10 gap-6 justify-center w-full">
                    {filterdata.map((item) => (
                        <Card
                            key={item._id}
                            title={item.business_name || ''}
                            image_path={item.logo_url || ''}
                            type={item._id || ''}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}