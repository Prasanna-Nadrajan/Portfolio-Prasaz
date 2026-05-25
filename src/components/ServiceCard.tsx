interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    return (
        <div className="service-item bg-container-bg border border-border-color p-8 rounded-3xl shadow-sm relative z-10 hover:border-neon-blue/50 hover:shadow-lg hover:shadow-neon-blue/20 hover:scale-105 transition-all duration-300">
            <div className="service-icon-box mb-3">
                <img src={icon} alt={title} width="60" className="mx-auto rounded-xl shadow-sm" />
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
