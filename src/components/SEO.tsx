/**
 * SEO component using React 19's native document metadata support.
 * React 19 automatically hoists <title>, <meta>, and <link> tags
 * rendered anywhere in the component tree to the <head>.
 */

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
        <>
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
        </>
    );
};

export default SEO;