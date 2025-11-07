import type { TemplateFormDataType } from "../../services/user";
import { ChatBox } from "../chatbox";

export const Banner = ({ businessDetail }: { businessDetail: TemplateFormDataType | undefined }) => {
    const bannerImage = () => {
        if (businessDetail?.uploadBannerImage) {
            if (typeof businessDetail?.uploadBannerImage === 'string') {
                return businessDetail.uploadBannerImage;
            }
        }
    }
    return(
        <section className="w-full 2xl:h-screen h-auto relative">
            <div className="absolute inset-0 bg-cover bg-center w-full h-full bg-[url('images/glassmorphism.webp')]">
                <img src="images/bg-image.webp" alt="Banner Background" title="Banner Background" className="w-full h-full object-cover object-center" />
            </div>
            <div className="relative z-10 flex flex-wrap items-center justify-center h-full w-[90%] mx-auto xl:gap-24 md:gap-12 gap-8 2xl:py-0 lg:pt-32 md:pt-24 pt-16 pb-10">
                <div className="2xl:w-[calc(41%_-_3rem)] xl:w-[calc(50%_-_3rem)] lg:w-[calc(50%_-_1.5rem)] w-full flex flex-col text-black">
                    {businessDetail?.headerText && <span className="md:text-4xl text-3xl font-semibold">{businessDetail?.headerText}</span>}
                    {businessDetail?.uploadBannerImage && <div className="h-auto w-full relative rounded-xl overflow-hidden 2xl:mt-10 mt-5 md:flex hidden">
                        <div className="bg-[linear-gradient(0deg,#022146_2.16%,rgba(2,33,70,0.00)_20.42%)] h-full w-full absolute inset-0 z-[1]"></div>
                        <img src={bannerImage()} alt="Banner Image" title="Banner Image" height={400} className="w-full lg:h-auto md:h-96 h-52 object-cover lg:object-center object-top" />
                    </div>}
                </div>
                <div className="2xl:w-[calc(59%_-_3rem)] xl:w-[calc(50%_-_3rem)] lg:w-[calc(50%_-_1.5rem)] w-full xl:h-3/5 lg:h-[25rem] md:h-[30rem] h-[35rem]">
                    <ChatBox businessDetail={businessDetail} />
                </div>
            </div>
        </section>
    );
}