interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
    return (
        <div className="service-item bg-border-gradient-onyx p-5 rounded-2xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-2xl before:-z-10 hover:scale-105 transition-transform duration-300">
            <div className="service-icon-box mb-3">
                <img src={icon} alt={title} width="60" className="mx-auto rounded-lg" />
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
