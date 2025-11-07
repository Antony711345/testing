import { Fragment } from "react/jsx-runtime";
import { Menu } from "../components/detail/menu";
import { Banner } from "../components/detail/banner";
import { About } from "../components/detail/about";
import { KeyHighlights } from "../components/detail/key_highlights";
// import { Journey } from "../components/detail/journey";
import { LocationSec } from "../components/detail/location_sec";
import { Footer } from "../components/detail/footer";
import { useBusinessDetail, useImageDecode } from "../services/hooks/user.data";
import { useEffect, useState } from "react";
import type { TemplateFormDataType } from "../services/user/user.interfaces";
import { Loader } from "../common/loader";

export default function Detail() {
    const { mutateAsync: getBusinessDetail, isPending } = useBusinessDetail();
    const { mutateAsync: imageDecode, isPending: isImageDecoding } = useImageDecode();
    const [businessDetail, setBusinessDetail] = useState<TemplateFormDataType>();

    const fetchBusinessDetail = async (bot_username: string) => {
        const response = await getBusinessDetail({ bot_username });
        if (response && response.data) {
            const bannerImage = response.data.business_data.photo_urls[0];
            if (bannerImage) {
                const decodedImage = await imageDecode({ key: bannerImage });
                response.data.business_data.banner_image = decodedImage.data.decoded_image;
            }
            setBusinessDetail({
                ...businessDetail,
                headerText: response.data.business_data.header_text || "",
                businessName: response.data.business_data.business_name || "",
                phoneNumber: response.data.business_data.phone_number || "",
                aboutText: response.data.business_data.about_text || "",
                whatsAppUrl: response.data.business_data.whatsapp_url || "",
                googleMapLink: response.data.business_data.google_map_link || "",
                uploadBannerImage: response.data.business_data.photo || "",
                templateName: response.data.business_data.template_name || "",
                uploadLogo: response.data.business_data.logo || "",
                services: response.data.business_data.services || [],
                businessType: response.data.business_data.business_type || ""
            });
            try {
                const logoUrl = response.data.business_data.logo_url;
                const bannerUrl = response.data.business_data.photo_urls?.[0];

                if (logoUrl && logoUrl.includes("https://s3.ap-southeast-1.wasabisys.com/stobay/")) {
                    const logoImageUrl = logoUrl.replace("https://s3.ap-southeast-1.wasabisys.com/stobay/", '');
                    const logoImage = await imageDecode({ key: logoImageUrl });
                    setBusinessDetail(prev => prev ? ({
                        ...prev,
                        uploadLogo: logoImage?.data.url || logoUrl
                    }) : undefined);
                }

                if (bannerUrl && bannerUrl.includes("https://s3.ap-southeast-1.wasabisys.com/stobay/")) {
                    const bannerImageUrl = bannerUrl.replace("https://s3.ap-southeast-1.wasabisys.com/stobay/", '');
                    const bannerImage = await imageDecode({ key: bannerImageUrl });
                    setBusinessDetail(prev => prev ? ({
                        ...prev,
                        uploadBannerImage: bannerImage?.data.url || bannerUrl
                    }) : undefined);
                }
            } catch (imageError) {
                console.error("Error decoding images:", imageError);
            }
        }
    };

    useEffect(() => {
        const bot_username = window.location.pathname.split('/')[1] || '';
        if (bot_username) {
            setBusinessDetail(prev => prev ? ({
                ...prev,
                botName: bot_username
            }) : undefined);
            fetchBusinessDetail(bot_username);
        }
    }, []);
    
    if (isPending || !businessDetail || isImageDecoding) {
        return <Loader />;
    }

    return (
        <Fragment>
            <Menu businessDetail={businessDetail} />
            <Banner businessDetail={businessDetail}/>
            <About aboutText={businessDetail?.aboutText || ""} phoneNumber={businessDetail?.phoneNumber || ""} />
            <KeyHighlights services={businessDetail?.services || []} />
            {/* <Journey /> */}
            <LocationSec location={businessDetail?.googleMapLink || ""} />
            <Footer businessDetail={businessDetail}/>
        </Fragment>
    );
}