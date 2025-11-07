import { Car, CarFront, HourGlass, ThumbsUp, User } from "../assets/icons";

export const buttonData = ['drivers', 'tuitions', 'catering', 'restaurants', 'real estate', 'shops', 'others'];

export const featureItems =  [
    {title : "Safe Drive Academy", image_path : "triving_school.webp", type : "drivers"},
    {title : "Excel Tuition Centre", image_path : "tutor.webp", type : "tuitions"},
    {title : "Meenakshi Catering", image_path : "foot.webp", type : "catering"},
    {title : "Temple City Restaurant", image_path : "restarent.webp", type : "restaurants"},
    {title : "Prime Properties", image_path : "temple_image.webp", type : "drivers"},
    {title : "Madurai General Store", image_path : "shop.webp", type : "shops"},
    {title : "Desam Developers", image_path : "construction.webp", type : "real estate"},
    {title : "Cheap And Best Saloon", image_path : "hotel.webp", type : "shops"},
    {title : "Perfect 32 Dental", image_path : "dental_clinic.webp", type : "shops"},
    {title : "Hotel Courtyard", image_path : "five_star_hotel.webp", type : "restaurants"},
];

export const highlightData = [
    {
        icon: <User className="w-7 h-7 text-[#032246]"/> , 
        title:'Experienced certified instructors', 
        description:'Learn safe and confident driving from our certified, experienced instructors.'
    },
    {
        icon: <Car className="w-7 h-7 text-[#032246]"/> , 
        title:'Dual-control training vehicles', 
        description:'Flexible class schedules designed to fit your busy lifestyle.'
    },
    {
        icon: <HourGlass className="w-7 h-7 text-[#032246]"/> , 
        title:'Flexible timing options', 
        description:'Hassle-free learning with convenient pickup and drop service.'
    },
    {
        icon: <ThumbsUp className="w-7 h-7 text-[#032246]"/> , 
        title:'High success rate in driving tests', 
        description:'Practice with confidence in modern dual-control vehicles for added safety.'
    },
    {
        icon: <CarFront className="w-7 h-7 text-[#032246]"/> , 
        title:'Pickup and drop facility', 
        description:'Proven methods and coaching that ensure a high driving test pass rate.'
    },
];

export const FormFieldData = [
    {
        id: "name",
        label: "Name",
        options: [],
        required: true,
        type: "text",
        value: "",
    },
    {
        id: "phone",
        label: "Phone",
        options: [],
        required: true,
        type: "text",
        value: "",
    },
    {
        id: "email",
        label: "Email",
        options: [],
        required: true,
        type: "email",
        value: "",
    }
]