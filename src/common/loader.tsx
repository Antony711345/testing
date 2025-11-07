export const Loader = () => {
    return (<div className="w-full h-screen flex flex-col items-center justify-center">
        <span className="text-2xl">Fetch business data...</span>
        <div className="p-3 w-fit rounded-full mx-auto">
            <div className="flex items-center justify-center p-6 rounded-full bg- w-fit">
                <div className="spinner w-20 h-20 border-8"></div>
            </div>
        </div>
    </div>);
}