import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

import portrait from '../assets/portrait.jpeg';

/**
 * About page shares Yakov’s biography, skills and creative process.  A
 * split layout juxtaposes an abstract portrait with descriptive text.
 */
export default function About() {
  const skills = [
    'Black & White Graphics',
    'Children’s Illustration',
    'Character Design',
    'Traditional Drawing',
    'Digital Illustration',
    'Pencil & Ink',
    'Visual Development',
    'Concept Art',
    'Editorial Illustration',
    'Narrative Art',
  ];
  const steps = [
    {
      number: '01',
      title: 'Story & Concept',
      description: 'Understanding the narrative heart and emotional core that will guide every visual decision.',
    },
    {
      number: '02',
      title: 'Character Development',
      description: 'Creating characters with distinct personalities and emotional depth that resonate with the audience.',
    },
    {
      number: '03',
      title: 'Visual Exploration',
      description: 'Sketching, experimenting with composition, and finding the perfect balance of detail and simplicity.',
    },
    {
      number: '04',
      title: 'Final Illustration',
      description: 'Bringing everything together with careful attention to technique, emotion, and storytelling impact.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About – Yakov Yakubov</title>
        <meta name="description" content="Learn more about Yakov Yakubov, his journey as an illustrator, his skills and his creative process." />
      </Helmet>
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-3xl sm:text-4xl font-serif font-semibold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            About Me
          </motion.h1>
          {/* Split layout */}
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Image */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src={portrait}
                alt="Artist portrait"
                className="rounded-lg shadow-xl w-full h-auto object-cover"
              />
            </motion.div>
            {/* Text */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <p className="text-lg leading-relaxed mb-6 text-muted-light dark:text-muted-dark">
                Hello, I’m Yakubov — illustrator, visual storyteller, and artist with over 40 years of experience turning ideas into powerful, unforgettable images.
                <br />
                <br />
                I specialize in creating illustrations that spark imagination and emotion, combining traditional techniques with modern digital tools. Whether it’s charming children’s book art, elegant editorial pieces, or detailed visual development, my work is designed to connect deeply with audiences of all ages.
                <br />
                <br />
                Throughout my career, I’ve collaborated with writers, publishers, and creative teams, and my art has been showcased in numerous exhibitions. Each project I take on is approached with passion, precision, and a commitment to storytelling through visuals.
                <br />
                <br />
                If you’re looking for illustrations that bring your story to life and leave a lasting impression — let’s create something extraordinary together.
              </p>
            </motion.div>
          </div>
          {/* Skills & Specialties */}
          <div className="mt-16">
            <motion.h2
              className="text-2xl sm:text-3xl font-serif font-semibold mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Skills & Specialties
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-muted-light dark:text-muted-dark text-center max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              My artistic practice spans traditional and digital mediums, always with a focus on storytelling, emotional connection, and visual clarity that serves the narrative.
            </motion.p>
            <motion.ul
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              {skills.map((skill, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircleIcon className="w-5 h-5 text-accent-light dark:text-accent-dark flex-shrink-0" />
                  <span className="text-muted-light dark:text-muted-dark">{skill}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          {/* Creative Process */}
          <div className="mt-20">
            <motion.h2
              className="text-2xl sm:text-3xl font-serif font-semibold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              My Creative Process
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
                >
                  <div className="mr-4">
                    <span className="text-3xl font-bold text-accent-light dark:text-accent-dark font-serif">{step.number}</span>
                  </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                      <p className="text-muted-light dark:text-muted-dark text-base leading-relaxed">{step.description}</p>
                    </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}