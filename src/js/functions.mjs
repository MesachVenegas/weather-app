export const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

export function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
//https://www.freevector.com/uploads/vector/preview/7040/FreeVector-Rain-Background.jpg

export const backgrounds = {
    default: 'https://images.theconversation.com/files/442675/original/file-20220126-17-1i0g402.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
    Clouds: 'https://images.unsplash.com/photo-1599209248411-5124adbb1da2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    Rain: 'https://www.freevector.com/rain-background#',
    Wind: 'https://www.schaeffler.mx/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/windpower_1/47120_header-schaeffler-industry-solutions-wind-wind.jpg',
    Snow: 'https://cdn.britannica.com/62/187062-138-9D11F50A/snowflakes.jpg?w=800&h=450&c=crop'
}