import { Arrow } from "../../assets/icons"

export const Service = () => {
    return (
        <section className="w-full xl:py-24 md:py-14 py-7">
            <div className="w-[90%] mx-auto flex flex-wrap gap-6">
                <div className="md:w-[calc(50%_-_0.75rem)] w-full">
                    <img
                        src="images/temple.webp"
                        alt="Temple image"
                        title="Temple image"
                        className="w-full md:h-auto h-52 md:rounded-3xl rounded-2xl object-cover object-top"
                    />
                </div>
                <div className="md:w-[calc(50%_-_0.75rem)] w-full flex flex-col justify-between md:gap-8 gap-4">
                    <div className="w-full relative">
                        <img
                            src="images/market-image.png"
                            alt="market-image"
                            title="market-image"
                            className="w-full h-auto rounded-3xl bg-white"
                        />
                        <div className="absolute bottom-0 right-0 xl:w-36 md:w-24 w-14 xl:h-36 md:h-24 h-14 bg-white rounded-tl-3xl flex items-center justify-center">
                            <button type="button" className="rounded-full xl:w-24 md:w-16 w-11 xl:h-24 md:h-16 h-11 bg-[#316FF6] text-white flex items-center justify-center">
                                <Arrow className="xl:w-12 md:w-10 w-5 xl:h-12 md:h-10 h-5"/>
                            </button>
                        </div>
                    </div>
                    <div className="xl:text-7xl md:text-5xl text-3xl font-medium font-archivo text-[#8F9096]">
                        <span className="text-[#3B3B3D]">Find Any Service in</span> Madurai.
                    </div>
                </div>
            </div>
        </section>
    )
}