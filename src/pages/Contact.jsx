import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import emailjs from 'emailjs-com';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        setSubmitted(true);
      } catch (error) {
        console.error('EmailJS Error:', error);
        alert('There was an error sending your message. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact – Yakov Yakubov</title>
        <meta name="description" content="Get in touch with Yakov Yakubov to discuss collaborations and projects." />
      </Helmet>
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.h1
            className="text-3xl sm:text-4xl font-serif font-semibold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Let’s Create Together
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-muted-light dark:text-muted-dark text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            I'm always excited to collaborate on meaningful projects that combine visual storytelling with emotional depth. Let's discuss how we can bring your vision to life.
          </motion.p>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-accent-light/10 dark:bg-accent-dark/10 p-6 rounded-lg text-center"
            >
              <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
              <p className="text-muted-light dark:text-muted-dark">Your message has been received. I will get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-background-light dark:bg-background-dark border ${errors.name ? 'border-red-500' : 'border-muted-light dark:border-muted-dark'} focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark`}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-md bg-background-light dark:bg-background-dark border ${errors.email ? 'border-red-500' : 'border-muted-light dark:border-muted-dark'} focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark`}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className={`w-full px-4 py-3 rounded-md bg-background-light dark:bg-background-dark border ${errors.message ? 'border-red-500' : 'border-muted-light dark:border-muted-dark'} focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark`}
                  aria-invalid={!!errors.message}
                  aria-describedby="message-error"
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block bg-accent-light dark:bg-accent-dark text-background-light dark:text-background-dark px-8 py-3 rounded-full font-semibold uppercase tracking-wide shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
          {/* Contact details & working together */}
          <div className="mt-16 space-y-10">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold mb-3">Contact</h3>
                <ul className="space-y-2 text-muted-light dark:text-muted-dark">
                  <li className="flex items-center space-x-3">
                    <FaEnvelope className="w-4 h-4" />
                    <a href="mailto:contact@yyakubov.com" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
                      contact@yyakubov.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaPhoneAlt className="w-4 h-4" />
                    <a href="tel:+48504674967" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
                      +48 504 674 967
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaWhatsapp className="w-4 h-4" />
                    <a href="https://wa.me/+48504674967" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
                      WhatsApp
                    </a>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FaInstagram className="w-4 h-4" />
                    <a href="https://www.instagram.com/yaacovyaacobov/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-3">Working Together</h3>
                <p className="text-muted-light dark:text-muted-dark leading-relaxed">
                  I typically respond within 24 hours and love to start with a conversation about your project's vision and goals. Every collaboration begins with understanding the story we want to tell together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
