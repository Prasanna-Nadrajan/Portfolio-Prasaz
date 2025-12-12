export default function AvailabilityStatus({ available = true }: { available?: boolean }) {
    return (
        <div className="flex items-center gap-2 bg-onyx/50 px-3 py-1.5 rounded-full border border-jet">
            <div className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${available ? 'bg-green-400' : 'bg-red-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${available ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <span className="text-xs font-medium text-light-gray-70">
                {available ? 'Available for work' : 'Busy'}
            </span>
        </div>
    );
}
