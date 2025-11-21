import { useState, useRef } from 'react';
import { IoPaperPlaneOutline, IoMailOutline, IoLocationOutline, IoLogoLinkedin, IoLogoInstagram, IoCloudDownloadOutline } from 'react-icons/io5';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current) return;

        setIsSending(true);
        setMessage(null);

        // Replace these with your actual EmailJS service, template, and user IDs
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
        const userId = import.meta.env.VITE_EMAILJS_USER_ID || 'user_id';

        if (serviceId === 'service_id') {
            // Simulation mode
            setTimeout(() => {
                setIsSending(false);
                setMessage({ text: "Message sent successfully! (Simulation)", type: 'success' });
                form.current?.reset();
            }, 1500);
            return;
        }

        emailjs.sendForm(serviceId, templateId, form.current, userId)
            .then((result) => {
                console.log(result.text);
                setIsSending(false);
                setMessage({ text: "Message sent successfully!", type: 'success' });
                form.current?.reset();
            }, (error) => {
                console.log(error.text);
                setIsSending(false);
                setMessage({ text: "Failed to send message. Please try again.", type: 'error' });
            });
    };

    return (
        <article className="contact active animate-fade-in" data-page="contact">
            <header className="flex justify-between items-end mb-8 border-b-2 border-neon-blue pb-1">
                <h2 className="h2 article-title text-2xl font-semibold">Contact</h2>
                
                {/* Resume Download Button */}
                <a 
                    href="/assets/Prasanna_Nadrajan_Resume.pdf" // Ensure this file exists in public/assets/
                    download="Prasanna_Nadrajan_Resume.pdf"
                    className="flex items-center gap-2 text-sm font-medium text-neon-blue hover:text-main-text transition-colors bg-border-gradient-onyx px-4 py-2 rounded-xl shadow-neon mb-1"
                >
                    <IoCloudDownloadOutline size={18} />
                    <span>Download CV</span>
                </a>
            </header>

            <section className="mapbox mb-8" data-mapbox>
                <figure className="h-[250px] w-full rounded-2xl overflow-hidden border border-jet shadow-neon grayscale dark:invert-[1] dark:contrast-[1.2] opacity-50 hover:opacity-100 transition-opacity duration-500">
                    <iframe
                        // Updated map source for Ellis Road, Chennai
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.684466492225!2d80.26704637599662!3d13.063268912994097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526610e6775555%3A0x22434a90200e0485!2sEllis%20Rd%2C%20Triplicane%2C%20Chennai%2C%20Tamil%20Nadu%20600002!5e0!3m2!1sen!2sin!4v1709217800000!5m2!1sen!2sin"
                        width="600"
                        height="450"
                        allowFullScreen={true}
                        loading="lazy"
                        className="w-full h-full border-0"
                    ></iframe>
                </figure>
            </section>

            <section className="contact-form mb-8">
                <h3 className="h3 form-title text-xl font-semibold mb-5">Reach me out</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <ul className="contacts-list flex flex-col gap-4">
                        <li className="contact-item flex items-center gap-4 bg-border-gradient-onyx p-4 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10">
                            <div className="icon-box w-12 h-12 flex items-center justify-center bg-onyx text-neon-blue rounded-xl text-2xl shadow-neon shrink-0">
                                <IoMailOutline />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-xs text-light-gray-70 uppercase mb-1">Email</p>
                                <a href="mailto:prasannanadrajan.r@gmail.com" className="contact-link text-main-text hover:text-neon-blue transition-colors break-all">prasannanadrajan.r@gmail.com</a>
                            </div>
                        </li>

                        <li className="contact-item flex items-center gap-4 bg-border-gradient-onyx p-4 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10">
                            <div className="icon-box w-12 h-12 flex items-center justify-center bg-onyx text-neon-blue rounded-xl text-2xl shadow-neon shrink-0">
                                <IoLocationOutline />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-xs text-light-gray-70 uppercase mb-1">Location</p>
                                <address className="text-main-text not-italic">Chennai, India</address>
                            </div>
                        </li>

                        <li className="contact-item flex items-center gap-4 bg-border-gradient-onyx p-4 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10">
                            <div className="icon-box w-12 h-12 flex items-center justify-center bg-onyx text-neon-blue rounded-xl text-2xl shadow-neon shrink-0">
                                <IoLogoLinkedin />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-xs text-light-gray-70 uppercase mb-1">LinkedIn</p>
                                <a href="https://www.linkedin.com/in/prasannanadrajan/" target="_blank" rel="noopener noreferrer" className="contact-link text-main-text hover:text-neon-blue transition-colors break-all">linkedin.com/in/prasannanadrajan</a>
                            </div>
                        </li>

                        <li className="contact-item flex items-center gap-4 bg-border-gradient-onyx p-4 rounded-xl shadow-neon relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10">
                            <div className="icon-box w-12 h-12 flex items-center justify-center bg-onyx text-neon-blue rounded-xl text-2xl shadow-neon shrink-0">
                                <IoLogoInstagram />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-xs text-light-gray-70 uppercase mb-1">Instagram</p>
                                <a href="https://www.instagram.com/prasanna_nadrajan/" target="_blank" rel="noopener noreferrer" className="contact-link text-main-text hover:text-neon-blue transition-colors break-all">@prasanna_nadrajan</a>
                            </div>
                        </li>
                    </ul>

                    {/* Form */}
                    <form ref={form} onSubmit={sendEmail} className="form-content">
                        <div className="input-wrapper grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input
                                type="text"
                                name="user_name"
                                className="form-input bg-onyx border border-jet rounded-xl p-3 text-main-text text-sm outline-none focus:border-neon-blue transition-colors w-full"
                                placeholder="Full name"
                                required
                            />
                            <input
                                type="email"
                                name="user_email"
                                className="form-input bg-onyx border border-jet rounded-xl p-3 text-main-text text-sm outline-none focus:border-neon-blue transition-colors w-full"
                                placeholder="Email address"
                                required
                            />
                        </div>

                        <textarea
                            name="message"
                            className="form-input bg-onyx border border-jet rounded-xl p-3 text-main-text text-sm outline-none focus:border-neon-blue transition-colors w-full mb-4 h-32 resize-none"
                            placeholder="Your Message"
                            required
                        ></textarea>

                        <div className="flex justify-end">
                            <button
                                className="form-btn bg-border-gradient-onyx text-neon-blue px-5 py-3 rounded-xl shadow-neon flex items-center gap-2 hover:bg-jet transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative z-10 before:absolute before:inset-[1px] before:bg-bg-gradient-jet before:rounded-xl before:-z-10"
                                type="submit"
                                disabled={isSending}
                            >
                                <IoPaperPlaneOutline />
                                <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </div>

                        {message && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-4 text-sm text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                            >
                                {message.text}
                            </motion.p>
                        )}
                    </form>
                </div>
            </section>
        </article>
    );
};

export default Contact;