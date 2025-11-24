import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    name?: string;
    type?: string;
}

const SEO = ({ 
    title, 
    description = "Data Analyst and Business Intelligence Enthusiast portfolio showcasing projects, skills, and experience.",
    name = "Prasanna Nadrajan",
    type = "website"
}: SEOProps) => {
    const siteTitle = `${title} | ${name}`;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{siteTitle}</title>
            <meta name='description' content={description} />
            
            {/* Open Graph tags for social sharing */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            
            {/* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default SEO;