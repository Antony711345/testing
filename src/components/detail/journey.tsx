import { Arrow } from "../../assets/icons";

export const Journey = () => {
    return(
        <section className="w-full font-inter md:py-24 py-12">
            <div className="w-[90%] mx-auto flex flex-col bg-[url('images/highway.webp')] bg-cover bg-center bg-no-repeat md:py-24 py-8 md:px-28 px-8 rounded-2xl">
                <div className="text-[#fff] md:text-4xl text-2xl font-semibold md:leading-normal">Your Journey to Confident Driving <br className="xl:block hidden"/> Starts Here</div>
                <div className="text-white text-sm font-medium mt-2 md:leading-normal">At <span className="text-[#FC0] font-bold">Safe Drive Academy</span>, we believe safe driving is a skill for life. With expert instructors,<br className="xl:block hidden"/> flexible schedules, and modern vehicles, we’re here to guide you every step of the way<br className="xl:block hidden"/> making learning to drive simple, safe, and stress-free.</div>
                <button type="button" className="md:mt-7 mt-5 bg-white text-[#032246] font-medium py-2.5 px-4 rounded-md flex gap-2 items-center w-fit cursor-pointer md:text-base text-sm">
                    Book Your First Lesson
                    <Arrow className="w-5 h-5"/>
                </button>
            </div>
        </section>
    );
}