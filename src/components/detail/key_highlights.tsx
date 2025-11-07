import { HighlightCard } from "../card";

export const KeyHighlights = ({services}: {services: {title: string, description: string}[]}) => {
    if(!services || services.length === 0) return null;
    
    return (
        <section className="w-full font-inter">
            <div className="w-[90%] mx-auto flex flex-col items-center md:pt-24 pt-12">
                <div className="text-[#0D2C50] md:text-5xl text-3xl font-semibold">Key Highlights</div>
                <div className="text-center text-[#212121] font-medium md:text-lg mt-4">Experience expert training, flexible schedules, and modern vehicles that make our driving school<br className="xl:block hidden"/> the trusted choice for safe and effective learning.</div>
                <div className="flex items-center justify-center gap-y-5 gap-x-6 mt-6 flex-wrap w-full">
                    {services.map((item, index) => (
                        <HighlightCard key={index} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}