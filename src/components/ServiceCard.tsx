interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    return (
        <div className="service-item bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-purple-900/50 shadow-xl relative z-10 hover:scale-105 transition-transform duration-300">
            <div className="service-icon-box mb-3">
                <img src={icon} alt={title} width="60" className="mx-auto rounded-xl shadow-purple-900/40 shadow-sm" />
            </div>
            <div className="service-content-box text-center">
                <h4 className="h4 service-item-title text-main-text text-lg font-medium mb-2">{title}</h4>
                <p className="service-item-text text-secondary-text text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
