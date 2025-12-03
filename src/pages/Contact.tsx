import { useState, useRef } from 'react';
import { IoPaperPlaneOutline, IoMailOutline, IoLocationOutline, IoLogoLinkedin, IoLogoInstagram, IoCloudDownloadOutline } from 'react-icons/io5';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    const [errors, setErrors] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { user_name: '', user_email: '', message: '' };

        if (!formData.user_name.trim()) {
            newErrors.user_name = 'Name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.user_email.trim()) {
            newErrors.user_email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.user_email)) {
            newErrors.user_email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        if (!form.current) return;

        setIsSending(true);
        setMessage(null);

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
        const userId = import.meta.env.VITE_EMAILJS_USER_ID || 'user_id';

        if (serviceId === 'service_id') {
            setTimeout(() => {
                setIsSending(false);
                setMessage({ text: "Message sent successfully! (Simulation)", type: 'success' });
                setFormData({ user_name: '', user_email: '', message: '' });
                form.current?.reset();
            }, 1500);
            return;
        }

        emailjs.sendForm(serviceId, templateId, form.current, userId)
            .then((result) => {
                console.log(result.text);
                setIsSending(false);
                setMessage({ text: "Message sent successfully!", type: 'success' });
                setFormData({ user_name: '', user_email: '', message: '' });
                form.current?.reset();
            }, (error) => {
                console.log(error.text);
                setIsSending(false);
                setMessage({ text: "Failed to send message. Please try again.", type: 'error' });
            });
    };

    return (
        <article className="contact active animate-fade-in" data-page="contact">
            <SEO
                title="Contact"
                description="Get in touch with Prasanna Nadrajan for collaborations, data projects, or just to say hi."
            />

            <header className="flex justify-between items-end mb-8 border-b-2 border-neon-blue pb-1">
                <h2 className="h2 article-title text-2xl font-semibold">Contact</h2>

                <a
                    href="/assets/Prasanna_Nadrajan_Resume.pdf"
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

                    <form ref={form} onSubmit={sendEmail} className="form-content" noValidate>
                        <div className="input-wrapper grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex flex-col gap-1">
                                <input
                                    type="text"
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    className={`form-input bg-onyx border rounded-xl p-3 text-main-text text-sm outline-none transition-colors w-full ${errors.user_name ? 'border-red-500' : 'border-jet focus:border-neon-blue'}`}
                                    placeholder="Full name"
                                />
                                {errors.user_name && <span className="text-xs text-red-400 pl-1">{errors.user_name}</span>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <input
                                    type="email"
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleChange}
                                    className={`form-input bg-onyx border rounded-xl p-3 text-main-text text-sm outline-none transition-colors w-full ${errors.user_email ? 'border-red-500' : 'border-jet focus:border-neon-blue'}`}
                                    placeholder="Email address"
                                />
                                {errors.user_email && <span className="text-xs text-red-400 pl-1">{errors.user_email}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 mb-4">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-input bg-onyx border rounded-xl p-3 text-main-text text-sm outline-none transition-colors w-full h-32 resize-none ${errors.message ? 'border-red-500' : 'border-jet focus:border-neon-blue'}`}
                                placeholder="Your Message"
                            ></textarea>
                            {errors.message && <span className="text-xs text-red-400 pl-1">{errors.message}</span>}
                        </div>

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