import React from "react";
import { motion } from "framer-motion";

export default function AmanAgrawalProfile() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col justify-center items-center text-white bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,workspace')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        <div className="z-10 text-center px-4">
          <motion.img
            src="https://avatars.githubusercontent.com/u/103194883?v=4"
            alt="Aman Agrawal"
            className="rounded-full border-4 border-white w-40 h-40 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Aman Agrawal</h1>
          <p className="text-lg md:text-xl mb-2">
            MBA @ IIM Sambalpur | Ex-Infosys | Technical Assistant @ Tata Power DDL
          </p>
          <p className="text-sm md:text-base">
            Data Enthusiast | SAP BI/BO | Six Sigma Certified | Powering Change Through Data
          </p>
          <a
            href="#contact"
            className="mt-6 inline-block px-6 py-2 bg-white text-indigo-700 font-medium rounded-full shadow-md hover:bg-gray-100 transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="p-12 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-center">About Me</h2>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-center">
          <p className="mb-4">
            I come from Hindaun City, Rajasthan and bring a unique blend of analytics, engineering, and leadership. After 26 months at Infosys in SAP BW, I pursued my MBA from IIM Sambalpur. Now, I work at Tata Power-DDL driving digital transformation and analytics.
          </p>
          <p className="mb-4">
            With a strong foundation in numbers and storytelling, I believe in creating impactful solutions powered by data. My journey is defined by persistence, adaptability, and an eagerness to solve real-world problems.
          </p>
        </div>
      </section>

      {/* Experience Cards */}
      <section className="px-6 py-12 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Experience</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{
            title: "Infosys",
            role: "Systems Engineer → Senior Systems Engineer",
            desc: "Worked on SAP BW/BI systems, ETL processes, and collaborated with global clients."
          }, {
            title: "Tata Power-DDL",
            role: "Technical Assistant to CTO",
            desc: "Leading the Customer Feedback Management project, and managing CEO review decks."
          }, {
            title: "Live Projects & Internships",
            role: "IIM Sambalpur + IIT Kanpur",
            desc: "Contributed to real-world data transformation cases, research publications, and tech-enabled solutions."
          }].map((exp, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{exp.title}</h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">{exp.role}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="p-12 bg-gray-900 text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">Quick Access</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 text-center">
          <a
            href="/aman_agrawal_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Download Resume
          </a>
          <a
            href="mailto:agrawalamanhnd@gmail.com"
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Hire Me
          </a>
          <a
            href="#contact"
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
          >
            Talk to Me
          </a>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="p-12 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold mb-6 text-center">My Career in Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[{
            label: "Years of Experience",
            value: "3+",
          }, {
            label: "Projects Completed",
            value: "20+",
          }, {
            label: "Technologies Used",
            value: "12",
          }, {
            label: "Leadership Roles",
            value: "5",
          }].map((item, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{item.value}</p>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog & Learning */}
      <section className="p-12 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reading & Learning</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[{
            title: "Top 10 Business Analytics Books",
            desc: "From Freakonomics to Competing on Analytics — books that shaped my mindset.",
            link: "https://insights.btoes.com/top-10-data-analytics-books"
          }, {
            title: "Weekly AI Digest",
            desc: "A curated list of AI trends and tools I explore in my free time.",
            link: "https://aiweekly.co/"
          }].map((blog, i) => (
            <div key={i} className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">{blog.desc}</p>
              <a href={blog.link} className="text-indigo-500 text-sm hover:underline">Read More</a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 text-center">
        <p className="text-sm">© {new Date().getFullYear()} Aman Agrawal. Crafted with React + Tailwind CSS ✨</p>
        <div className="mt-2 flex justify-center gap-4 flex-wrap">
          <a href="https://linkedin.com/in/am-ag" className="hover:underline">LinkedIn</a>
          <a href="mailto:agrawalamanhnd@gmail.com" className="hover:underline">Email</a>
          <a href="https://github.com/am-ag" className="hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
