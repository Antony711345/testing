import { MobilePhone } from "../../assets/icons";
import { OutlineButton } from "../../common/button";

export const About = ({
    aboutText,
    phoneNumber,
}: {
    aboutText: string;
    phoneNumber: string;
}) => {
    if(!aboutText) return null;

    return (
        <section className="w-full md:pt-24 pt-12 font-inter">
            <div className="w-[90%] mx-auto flex flex-col items-center gap-4">
                <div className="text-[#0D2C50] md:text-5xl text-3xl font-semibold">About the Business</div>
                <div className="text-center text-[#212121] font-medium md:text-lg">{aboutText}</div>
                <OutlineButton
                    label={"Book a call"}
                    icon={<MobilePhone className="w-4 h-4" />}
                    paddingX="px-4"
                    paddingY="py-2"
                    borderRadius="rounded-md"
                    hoverBgColor="hover:bg-[#032246]"
                    hoverTextColor="hover:text-[#FC0]"
                    pathName={phoneNumber ? `tel:${phoneNumber}` : '#'}
                    isOpenNewTap={false}
                />
            </div>
        </section>
    );
}