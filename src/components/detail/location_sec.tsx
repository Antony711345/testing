export const LocationSec = ({ location }: { location: string }) => {
    const convertToEmbedUrl = (googleMapsUrl: string) => {
        try {
            // If it's already an embed URL, return as is
            if (googleMapsUrl.includes('google.com/maps/embed')) {
                return googleMapsUrl;
            }

            // Handle Google Maps short URLs (maps.app.goo.gl)
            if (googleMapsUrl.includes('maps.app.goo.gl') || googleMapsUrl.includes('goo.gl/maps')) {
                // Convert short URL to a standard embed URL format
                return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d80.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin&q=${encodeURIComponent(googleMapsUrl)}`;
            }

            // Handle different Google Maps URL formats
            let lat: string | null = null;
            let lng: string | null = null;
            let placeId: string | null = null;
            let query: string | null = null;

            // Extract coordinates from various URL formats
            const coordsMatch = googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
            if (coordsMatch) {
                lat = coordsMatch[1];
                lng = coordsMatch[2];
            }

            // Extract place ID
            const placeIdMatch = googleMapsUrl.match(/place\/([^\/]+)/);
            if (placeIdMatch) {
                query = encodeURIComponent(placeIdMatch[1].replace(/\+/g, ' '));
            }

            // Extract data from /maps/place/ URLs
            const dataMatch = googleMapsUrl.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/);
            if (dataMatch) {
                placeId = dataMatch[1];
            }

            // Handle maps.google.com URLs
            if (googleMapsUrl.includes('maps.google.com')) {
                // Extract query parameter
                const urlParams = new URLSearchParams(googleMapsUrl.split('?')[1] || '');
                const q = urlParams.get('q');
                if (q) {
                    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d80.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${encodeURIComponent(q)}!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
                }
            }

            // Build embed URL based on available data
            if (lat && lng) {
                if (query) {
                    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${query}!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
                } else {
                    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
                }
            } else if (query) {
                return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d80.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z${query}!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`;
            }

            // Last resort: try to use the URL as a query parameter
            if (googleMapsUrl.includes('google') && googleMapsUrl.includes('maps')) {
                return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d80.0!3d13.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2z!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin&q=${encodeURIComponent(googleMapsUrl)}`;
            }

            // Fallback: return default Chennai location
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248755.79476706157!2d80.04386385016383!3d13.047807806714815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1757074247602!5m2!1sen!2sin";
            
        } catch (error) {
            console.error('Error converting maps URL:', error);
            // Return default fallback
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248755.79476706157!2d80.04386385016383!3d13.047807806714815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1757074247602!5m2!1sen!2sin";
        }
    };

    const embedUrl = convertToEmbedUrl(location);

    if (!location) {
        return null;
    }

    return (
        <section className="w-full font-inter md:pt-24 pt-12">
            <div className="w-[90%] mx-auto flex flex-col gap-4">
                <span className="md:text-3xl text-xl font-semibold text-black">Location</span>
                <div className="flex gap-4 flex-wrap">
                    <div className="rounded-md md:w-[calc(100%_-_21rem)] w-full overflow-hidden md:h-auto h-52">
                        <iframe
                            src={embedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248755.79476706157!2d80.04386385016383!3d13.047807806714815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1757074247602!5m2!1sen!2sin"}
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Business Location Map"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                            allowFullScreen={true}
                            className="w-full h-full grayscale"
                        ></iframe>
                    </div>
                    <div className="w-80 bg-[#032246] md:p-12 p-8 rounded-md h-auto flex flex-col gap-4 text-white items-center">
                        <span className="md:text-lg font-semibold">Operating Hours</span>
                        <div className="flex flex-col items-center md:text-sm text-xs leading-normal">
                            <span>Monday – Friday</span>
                            <span className="text-[#FC0]">9:00 AM – 7:00 PM</span>
                        </div>
                        <div className="flex flex-col items-center md:text-sm text-xs leading-normal">
                            <span>Saturday – Sunday</span>
                            <span className="text-[#FC0]">9:00 AM – 5:00 PM</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}