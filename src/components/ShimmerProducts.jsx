import "../styles/shimmer.css"; 

export default function ShimmerProducts({ count = 12 }) {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-10">

                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                        <div className="h-6 w-40 shimmer rounded-md"></div>
                        <div className="h-4 w-24 shimmer rounded-md mt-2 sm:mt-0"></div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                        {Array.from({ length: count }).map((_, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
                            >
                                <div className="w-full h-48 shimmer rounded-xl mb-4"></div>
                                <div className="h-4 shimmer rounded-md mb-3 w-3/4"></div>
                                <div className="h-4 shimmer rounded-md w-1/2"></div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <div className="h-10 w-24 shimmer rounded"></div>
                        <div className="h-6 w-6 shimmer rounded"></div>
                        <div className="h-10 w-24 shimmer rounded"></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 h-fit border border-gray-100">
                    <div className="flex justify-between mb-4">
                        <div className="h-5 w-20 shimmer rounded-md"></div>
                        <div className="h-4 w-12 shimmer rounded-md"></div>
                    </div>

                    <div className="h-4 w-24 shimmer rounded-md mb-4"></div>
                    <div className="space-y-2 mb-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 shimmer rounded-md w-32"></div>
                        ))}
                    </div>

                    <div className="h-4 w-28 shimmer rounded-md mb-3"></div>
                    <div className="space-y-3">
                        <div className="h-10 shimmer rounded-md"></div>
                        <div className="h-10 shimmer rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}