import { Fragment } from "react/jsx-runtime";
import { Menu } from "../components/home/menu";
import { Banner } from "../components/home/banner";
import { Service } from "../components/home/service";
import { Feature } from "../components/home/feature";
import { HowItWorks } from "../components/home/how_its_work";
import { Footer } from "../components/home/footer";
import { useEffect, useState } from "react";
import { useListStobayBusiness } from "../services/hooks/user.data";
import type { BusinessProfile } from "../services/user";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const {mutateAsync:listStobayBusiness} = useListStobayBusiness();
    const [hasInitialized, setHasInitialized] = useState(false);
    const [businessList, setBusinessList] = useState<BusinessProfile[]>([]);
    
    useEffect(() => {
        if (hasInitialized) return; 
        
        let isMounted = true;
        
        const fetchData = async () => {
            try {
                const data = await listStobayBusiness();
                if (isMounted) {
                    const businesses: BusinessProfile[] = data?.data.businesses || [];
                    setHasInitialized(true);
                    setBusinessList(businesses);
                }
            } catch (error) {
                if (isMounted) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        
        fetchData();
        
        return () => {
            isMounted = false;
        };
    }, [listStobayBusiness, hasInitialized]);

    return (
        <Fragment>
            <Menu />
            <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Service />
            <Feature searchTerm={searchTerm} setSearchTerm={setSearchTerm} businessList={businessList} />
            <HowItWorks />
            <Footer />
        </Fragment>
    );
}