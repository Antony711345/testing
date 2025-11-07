import { Link } from "react-router-dom";

export const Card = ({ title, image_path, type }: { title: string; image_path: string; type: string; }) => {
    return (
        <div className="flex flex-col xl:w-[calc(20%_-_2rem)] md:w-[calc(25%_-_1.125rem)] w-full gap-4 font-archivo group">
            <div className="md:h-72 h-52 bg-white xl:rounded-3xl rounded-2xl overflow-hidden border border-transparent group-hover:border-primaryLight flex items-center justify-center">
                <img src={image_path}
                    alt={title}
                    title={title}
                    className="object-cover w-full h-auto object-center"/>
            </div>
            <Link to={`/${type}`} className="xl:text-lg md:text-base text-sm font-semibold text-center py-5 xl:rounded-3xl rounded-2xl bg-white border border-transparent group-hover:border-primaryLight !text-[#030014] tracking-tight font-bold">
                {title}
            </Link>
        </div>
    );
}

export const HighlightCard = ({ title, description }: { title: string; description: string; }) => {
    return (
        <div className="flex flex-col xl:w-[calc(33.33%_-_1rem)] md:w-[calc(50%_-_0.75rem)] w-full group border border-[#021D3C1C] md:py-8 py-5 md:px-6 px-4 rounded-xl">
            {/* <div className="flex items-center justify-center md:w-14 w-12 md:h-14 h-12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(2,30,63,0.08)_100%)] rounded-xl">
                {icon}
            </div> */}
            <span className="xl:text-lg md:text-base text-sm font-semibold text-black">
                {title}
            </span>
            <p className="text-[#434343] md:text-sm text-xs mt-3">
                {description}
            </p>
        </div>
    );
}