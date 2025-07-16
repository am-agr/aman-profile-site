import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Utility Components ---

/**
 * Reusable Card component with subtle entrance animation and enhanced styling.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered inside the card.
 */
const Card = ({ children }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
    initial={{ opacity: 0, y: 30, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/**
 * Content wrapper for cards, providing consistent padding.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Content to be rendered.
 */
const CardContent = ({ children }) => <div>{children}</div>;

/**
 * Reusable Button component with interactive animations and proper link/button handling.
 * It intelligently renders an <a> tag if href is provided, otherwise a <button>.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Button label.
 * @param {string} props.href - URL for the button (optional).
 * @param {string} [props.target='_self'] - Target for the link (e.g., '_blank').
 * @param {function} props.onClick - Click handler (optional).
 * @param {string} [props.className=''] - Additional Tailwind CSS classes.
 */
const Button = ({ children, href, target = "_self", onClick, className = '' }) => {
  const commonClasses = "px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg " +
                        "hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 " +
                        "focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800";

  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={`inline-block ${className}`}>
        <motion.button
          className={commonClasses}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          {children}
        </motion.button>
      </a>
    );
  }
  return (
    <motion.button
      onClick={onClick}
      className={`${commonClasses} ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

/**
 * Generic Modal component for displaying overlay content with animations.
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {function} props.onClose - Function to call when modal is closed.
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal.
 * @param {string} props.title - Title of the modal.
 */
const Modal = ({ isOpen, onClose, children, title }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2, ease: "easeIn" } }
  };

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal content
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 border-b pb-2 border-gray-200 dark:border-gray-700">
              {title}
            </h3>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {children}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-3xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Dark/Light Mode Toggle button with SVG icons.
 * @param {object} props - Component props.
 * @param {boolean} props.darkMode - Current dark mode state.
 * @param {function} props.toggleDarkMode - Function to toggle dark mode.
 */
const ThemeToggle = ({ darkMode, toggleDarkMode }) => (
  <motion.button
    onClick={toggleDarkMode}
    className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg z-40
               text-gray-800 dark:text-gray-100 text-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
    whileHover={{ scale: 1.1, rotate: 15 }}
    whileTap={{ scale: 0.9 }}
    aria-label="Toggle dark mode"
  >
    {darkMode ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.275l-.707-.707M6.382 17.618l-.707.707M18.364 18.364l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
      </svg>
    )}
  </motion.button>
);

// --- Main Profile Component ---

export default function AmanAgrawalProfile() {
  // State for dark mode, initialized from localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // States for modal visibility and selected content
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', desc: '' });

  // Effect to apply dark mode class to HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  /** Toggles the dark mode state. */
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  /** Opens the About Me modal. */
  const openAboutModal = useCallback(() => {
    setModalContent({
      title: "My Full Journey: Passion, Purpose, and Progress",
      desc: "My professional journey is driven by a deep-seated passion for data and its transformative power. As an MBA graduate from IIM Sambalpur, I've cultivated a robust foundation in leveraging analytical insights to solve complex business challenges. My career has been a continuous exploration of how data can optimize operations, enhance decision-making, and drive digital innovation. From my early days at Infosys, where I honed my skills in SAP BW/HANA support and Azure Data Factory, to my current pivotal role as Technical Assistant at Tata Power DDL, I've consistently sought opportunities to apply my expertise to create tangible, impactful results. I am a Six Sigma certified professional, committed to continuous improvement and delivering excellence in every endeavor. My approach combines rigorous analytical methods with a strategic business mindset, enabling me to translate complex data into actionable insights that drive growth and efficiency. I thrive in dynamic environments where I can continuously learn and contribute to meaningful projects."
    });
    setIsAboutModalOpen(true);
  }, []);

  /** Closes the About Me modal. */
  const closeAboutModal = useCallback(() => setIsAboutModalOpen(false), []);

  /**
   * Opens a generic detail modal with provided title and description.
   * @param {string} title - Title for the modal.
   * @param {string} desc - Detailed description for the modal.
   */
  const openDetailModal = useCallback((title, desc) => {
    setModalContent({ title, desc });
    setIsDetailModalOpen(true);
  }, []);

  /** Closes the generic detail modal. */
  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setModalContent({ title: '', desc: '' }); // Clear content on close
  }, []);

  // Profile data
  const profileImage = "https://media.licdn.com/dms/image/v2/D5603AQEZ1ZxlfhSHzQ/profile-displayphoto-shrink_800_800/B56ZOMbB4IGgAc-/0/1733227717110?e=1758153600&v=beta&t=AMILKILzLPvd7DLWEvFUMdL48v8gnBhplOMx5TRAxUU";

  const experienceTimeline = [
    {
      title: "Technical Assistant, Tata Power DDL",
      date: "May 2025 – Present",
      desc: "Currently driving digital transformation initiatives by spearheading the implementation of the Customer Facing Module (CFM) project, significantly enhancing customer interaction and service delivery. Additionally, I am optimizing the CEO review system, streamlining reporting and decision-making processes for enhanced operational efficiency and strategic oversight.",
      details: "Worked directly under CTO office to digitize customer feedback workflows, implemented comprehensive dashboards in Power BI for real-time performance monitoring, handled monthly cross-functional stakeholder reporting, and coordinated automation efforts with IT teams to improve operational efficiency by 25%. My role involves advanced data analysis for performance monitoring and strategic planning, utilizing tools like Power BI and Excel for comprehensive dashboards."
    },
    {
      title: "Senior Systems Engineer, Infosys",
      date: "Jan 2023 – Jun 2023",
      desc: "Led a critical offshore SAP BW support team, ensuring the seamless operation and maintenance of complex data warehousing solutions for a global client. My role involved optimizing various reporting tools, which significantly improved data accessibility and enabled more informed business insights for key stakeholders.",
      details: "Spearheaded client communication, led a team of 4, optimized 15+ existing SAP queries reducing load time by 30%. I was responsible for incident management, problem resolution, and implementing enhancements to ensure data integrity and system performance. My efforts directly contributed to a 15% improvement in client reporting efficiency."
    },
    {
      title: "Systems Engineer, Infosys",
      date: "Sep 2021 – Dec 2022",
      desc: "Contributed extensively to SAP BW/HANA support, resolving intricate data issues and ensuring system stability. I was also responsible for developing and maintaining robust Azure Data Factory pipelines, facilitating efficient data ingestion, transformation, and integration across various enterprise systems.",
      details: "Delivered full lifecycle BI implementation, from requirements gathering to deployment. Built complex ETL pipelines using Azure Data Factory, handling large volumes of data from diverse sources. Collaborated closely with German clients to gather and refine specifications, ensuring solutions met precise business needs. Played a key role in data migration projects, ensuring data quality and consistency."
    },
    {
      title: "Operations Intern, GA Infra",
      date: "Apr 2024 – Jun 2024",
      desc: "Achieved a significant 15% reduction in non-revenue water (NRW) by applying advanced predictive modeling techniques to identify and address water loss points. This initiative demonstrated a direct, measurable impact on resource management and operational costs.",
      details: "Worked on 5-site performance dashboards, providing real-time insights into operational metrics. Conducted in-depth anomaly detection on consumption patterns using Python/R, identifying critical areas for intervention. Developed and validated predictive models that accurately forecasted potential water losses, leading to proactive maintenance and resource optimization strategies."
    },
    {
      title: "Live Projects (HDFC Life, Leap India)",
      date: "2023 – 2024",
      desc: "Engaged in real-world consulting projects, conducting in-depth user research to understand customer needs and pain points. I performed comprehensive performance analytics to identify areas for improvement and contributed to strategic workforce planning, aligning talent with organizational goals for enhanced productivity.",
      details: "For HDFC Life, I created detailed wireframes and user flows for a new term insurance portal UX, based on extensive user research and A/B testing, aiming to improve customer conversion rates. For Leap India, I performed data mining and statistical analysis on HR datasets to identify talent trends and suggest optimal hiring strategies, contributing to a more agile and efficient workforce planning process. These projects honed my ability to translate data into actionable business recommendations."
    }
  ];

  const skills = [
    { name: "SAP BI/BO", level: "Expert", icon: "📊" },
    { name: "Excel", level: "Advanced", icon: "📈" },
    { name: "Power BI", level: "Intermediate", icon: "📈" },
    { name: "R Programming", level: "Advanced", icon: "💻" },
    { name: "Minitab", level: "Beginner", icon: "🔬" },
    { name: "SPSS", level: "Intermediate", icon: "🧠" },
    { name: "Azure Data Factory", level: "Intermediate", icon: "☁️" },
    { name: "Tableau", level: "Beginner", icon: "📈" },
    { name: "Data Warehousing", level: "Intermediate", icon: "🗄️" },
    { name: "Business Intelligence", level: "Expert", icon: "💡" },
    { name: "Predictive Analytics", level: "Advanced", icon: "🔮" },
    { name: "Data Modeling", level: "Intermediate", icon: "📐" },
    { name: "SQL", level: "Advanced", icon: "🗃️" },
    { name: "Python (Basic)", level: "Beginner", icon: "🐍" },
    { name: "Six Sigma", level: "Certified", icon: "✅" },
    { name: "Project Management", level: "Intermediate", icon: "🗓️" },
    { name: "Stakeholder Management", level: "Advanced", icon: "🤝" },
    { name: "Problem Solving", level: "Expert", icon: "🧩" }
  ];

  const projects = [
    {
      title: "Predictive Telecom Analysis",
      desc: "Developed models in R to identify at-risk customers with 80% accuracy.",
      details: "This project involved a comprehensive analysis of customer call data records, billing information, and service usage patterns. I employed various machine learning techniques including logistic regression, decision trees, and random forests to build a robust churn prediction model. Feature engineering played a crucial role in identifying key indicators of churn. The model's insights led to a targeted marketing campaign that improved customer retention rates by 12% within six months, demonstrating the direct business impact of data-driven strategies."
    },
    {
      title: "Inventory Classification – Hindalco",
      desc: "Implemented ABC/XYZ classification for procurement efficiency.",
      details: "Working with Hindalco, I analyzed their extensive inventory data to categorize items based on their value (ABC analysis) and demand variability (XYZ analysis). This granular classification allowed for differentiated inventory management strategies, leading to a 15% reduction in excess inventory and a 10% improvement in stock availability for critical components. I developed automated reports and dashboards to monitor inventory performance, providing real-time visibility and supporting agile decision-making for procurement and logistics teams."
    },
    {
      title: "3D Printing Research",
      desc: "Published a paper in Springer on mechanical behavior of polymeric 3D prints.",
      details: "My research focused on understanding how different printing parameters and material compositions affect the tensile strength, flexural modulus, and impact resistance of 3D printed polymers. I designed and executed a series of experiments, utilizing advanced mechanical testing equipment. The data collected was rigorously analyzed using statistical software (Minitab, SPSS) to identify correlations and optimize printing processes for enhanced material properties. The publication of this research in a prestigious Springer journal validated the scientific rigor and practical relevance of my findings."
    }
  ];

  const extras = [
    "2nd in Racquet Rivals – ETHOS Fest",
    "Organized Yoga Seminar & Blood Donation Camps",
    "Volunteered for SMVDU Fest & NSS activities"
  ];

  const testimonials = [
    {
      name: "Mentor @ Infosys",
      quote: "Aman is an outstanding performer with a strong grasp of analytics and the ability to drive measurable impact. His dedication to optimizing processes and delivering actionable insights is truly commendable. He consistently exceeds expectations and is a valuable asset to any team."
    },
    {
      name: "Manager @ Tata Power DDL",
      quote: "He adds clarity to chaos, communicates efficiently, and takes ownership of every responsibility. Aman's ability to simplify complex data and present it clearly is exceptional, making him a go-to person for critical projects. His proactive approach ensures successful project delivery."
    }
  ];

  const certifications = [
    { name: "Lean Six Sigma Green Belt", image: "https://placehold.co/80x80/6366F1/ffffff?text=LSS" },
    { name: "Power BI Data Analyst Associate", image: "https://placehold.co/80x80/3B82F6/ffffff?text=PBI" },
    { name: "AWS Cloud Practitioner", image: "https://placehold.co/80x80/F59E0B/ffffff?text=AWS" },
    { name: "Salesforce CRM Admin", image: "https://placehold.co/80x80/EF4444/ffffff?text=SF" }
  ];

  const careerNumbers = [
    { label: "Years of Experience", value: "3+" },
    { label: "Projects Completed", value: "20+" },
    { label: "Technologies Used", value: "15+" },
    { label: "Leadership Roles", value: "5+" }
  ];

  const readingLearning = [
    {
      title: "Top 10 Business Analytics Books",
      desc: "From 'Freakonomics' to 'Competing on Analytics' — a curated list of books that have profoundly shaped my analytical mindset and strategic thinking.",
      link: "#" // Placeholder link
    },
    {
      title: "Weekly AI & Data Science Digest",
      desc: "A personal, curated digest of the latest trends, research papers, and open-source tools in Artificial Intelligence and Data Science that I explore in my free time.",
      link: "#" // Placeholder link
    }
  ];

  // Animation variants for staggered appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // --- Inline Components for Modularity ---

  /**
   * Hero Section Component.
   * @param {object} props - Component props.
   * @param {string} props.profileImage - URL of the profile image.
   */
  const HeroSection = ({ profileImage }) => {
    return (
      <section className="relative text-center p-12 bg-gradient-to-r from-blue-900 to-indigo-700 text-white dark:from-gray-800 dark:to-gray-700 overflow-hidden">
        {/* Parallax background effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundAttachment: 'fixed' }}
          initial={{ opacity: 0.5, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="relative z-10">
          <motion.img
            src={profileImage}
            alt="Aman Agrawal"
            className="w-36 h-36 rounded-full mx-auto mb-5 border-4 border-white shadow-xl object-cover"
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/144x144/cccccc/ffffff?text=Profile"; }} // Fallback image
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl font-extrabold mb-4 drop-shadow-md"
          >
            Aman Agrawal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-2xl font-light mb-2"
          >
            MBA @ IIM Sambalpur | Ex-Infosys | Technical Assistant @ Tata Power DDL
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-3 text-lg italic"
          >
            Data Enthusiast | SAP BI/BO | Six Sigma Certified | Powering Change Through Data
          </motion.p>
          <Button href="mailto:agrawalamanhnd@gmail.com" className="mt-8">
            Connect with Aman
          </Button>
        </div>
      </section>
    );
  };

  /**
   * About Section Component.
   * @param {function} openModal - Function to open the about modal.
   */
  const AboutSection = ({ openModal }) => (
    <motion.section
      className="p-12 bg-gray-50 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        My Story: Passion, Purpose, and Progress
      </motion.h2>
      <motion.p
        className="max-w-3xl mx-auto text-lg text-center leading-relaxed text-gray-700 dark:text-gray-300 mb-6"
        variants={itemVariants}
      >
        My professional journey is driven by a deep-seated passion for data and its transformative power. As an MBA graduate from IIM Sambalpur, I've cultivated a robust foundation in leveraging analytical insights to solve complex business challenges. My career has been a continuous exploration of how data can optimize operations, enhance decision-making, and drive digital innovation. From my early days at Infosys, where I honed my skills in SAP BI/BO and Azure Data Factory, to my current pivotal role at Tata Power DDL, I've consistently sought opportunities to apply my expertise to create tangible, impactful results. I am a Six Sigma certified professional, committed to continuous improvement and delivering excellence in every endeavor.
      </motion.p>
      <div className="text-center">
        <Button onClick={openModal}>Read More About My Journey</Button>
      </div>
    </motion.section>
  );

  /**
   * Experience Section Component.
   * @param {Array} timeline - Array of experience objects.
   * @param {function} openDetailModal - Function to open detail modal.
   */
  const ExperienceSection = ({ timeline, openDetailModal }) => (
    <motion.section
      className="p-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        A Chronicle of Professional Growth
      </motion.h2>
      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {timeline.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.date}</p>
              <p className="text-gray-700 dark:text-gray-300 text-base">{item.desc}</p>
              {item.details && (
                <div className="mt-4 text-right">
                  <Button
                    onClick={() => openDetailModal(item.title, item.details)}
                    className="!px-4 !py-2 !text-sm !rounded-md !bg-indigo-100 !text-indigo-700 dark:!bg-gray-700 dark:!text-indigo-300"
                  >
                    Full Details
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Skills Section Component.
   * @param {Array} skillsList - Array of skill objects.
   */
  const SkillsSection = ({ skillsList }) => (
    <motion.section
      className="p-12 bg-gray-100 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        My Toolkit: Skills Driving Innovation
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center max-w-5xl mx-auto"
        variants={containerVariants}
      >
        {skillsList.map((skill, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md font-medium text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <span className="text-3xl mb-2">{skill.icon}</span>
            <p className="font-semibold">{skill.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300">{skill.level}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Projects Section Component.
   * @param {Array} projectsList - Array of project objects.
   * @param {function} openDetailModal - Function to open project details modal.
   */
  const ProjectsSection = ({ projectsList, openDetailModal }) => (
    <motion.section
      className="p-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        Impactful Endeavors: Projects & Achievements
      </motion.h2>
      <motion.div
        className="space-y-8 max-w-4xl mx-auto"
        variants={containerVariants}
      >
        {projectsList.map((p, i) => (
          <Card key={i}>
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">{p.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-base">{p.desc}</p>
              <div className="mt-4 text-right">
                <Button onClick={() => openDetailModal(p.title, p.details)} className="!px-4 !py-2 !text-base">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Extras Section Component.
   * @param {Array} extrasList - Array of extra activities.
   */
  const ExtrasSection = ({ extrasList }) => (
    <motion.section
      className="p-12 bg-gray-50 dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        Beyond the Professional: My Passions & Contributions
      </motion.h2>
      <motion.ul
        className="list-disc list-inside space-y-3 text-lg text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        variants={containerVariants}
      >
        {extrasList.map((item, index) => (
          <motion.li key={index} variants={itemVariants} className="flex items-center justify-center">
            <span className="mr-2 text-indigo-500 dark:text-blue-300 text-xl">•</span> {item}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );

  /**
   * Testimonials Section Component.
   * @param {Array} testimonialsList - Array of testimonial objects.
   */
  const TestimonialsSection = ({ testimonialsList }) => (
    <motion.section
      className="p-12 bg-white dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        What Others Say About Me
      </motion.h2>
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        variants={containerVariants}
      >
        {testimonialsList.map((test, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.01, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            variants={itemVariants}
          >
            <p className="italic text-lg text-center text-gray-800 dark:text-gray-200">“{test.quote}”</p>
            <p className="text-right mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-300">— {test.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Certifications Section Component.
   * @param {Array} certsList - Array of certification objects.
   */
  const CertificationsSection = ({ certsList }) => (
    <motion.section
      className="p-12 bg-gray-100 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        Certifications & Badges
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        variants={containerVariants}
      >
        {certsList.map((cert, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <img src={cert.image} alt={cert.name} className="mx-auto mb-3 w-20 h-20 object-contain rounded-full border-2 border-indigo-200 dark:border-indigo-600" />
            <p className="text-base font-medium text-gray-800 dark:text-gray-200">{cert.name}</p>
            <Button onClick={() => openDetailModal(cert.name, `Details for ${cert.name} certification. This certifies proficiency in relevant skills and knowledge area.`)} className="!px-3 !py-1 !text-xs !rounded-md mt-2 !bg-indigo-100 !text-indigo-700 dark:!bg-gray-600 dark:!text-indigo-200">
              View Details
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Quote Panel Component.
   */
  const QuotePanel = () => (
    <motion.section
      className="p-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        What Drives Me
      </motion.h2>
      <motion.div
        className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-700 dark:to-gray-900 p-10 rounded-xl shadow-xl text-center max-w-3xl mx-auto border border-indigo-200 dark:border-gray-700"
        variants={itemVariants}
      >
        <p className="text-xl italic mb-4 text-indigo-800 dark:text-indigo-200">
          “Solving problems with purpose, data, and heart. Every challenge is an opportunity to learn, innovate, and create meaningful impact.”
        </p>
        <p className="text-base text-gray-600 dark:text-gray-300">
          I believe in using data to tell compelling stories, solve complex business challenges, and inspire positive change. My commitment extends beyond technical solutions to fostering collaboration and driving collective success.
        </p>
      </motion.div>
    </motion.section>
  );

  /**
   * Quick Access Buttons Section.
   */
  const QuickAccessSection = ({ toggleDarkMode }) => (
    <motion.section
      className="p-12 text-center bg-gray-50 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        Quick Access
      </motion.h2>
      <motion.div
        className="flex justify-center gap-6 flex-wrap"
        variants={containerVariants}
      >
        <Button href="/aman_agrawal_resume.pdf" target="_blank" className="!bg-indigo-700 !text-white hover:!bg-indigo-600">
          Download Resume
        </Button>
        <Button href="mailto:agrawalamanhnd@gmail.com" className="!bg-white !border !border-indigo-600 !text-indigo-700 hover:!bg-indigo-50 dark:!bg-gray-200 dark:!text-indigo-800">
          Hire Me
        </Button>
        <Button onClick={toggleDarkMode} className="!bg-gray-200 dark:!bg-gray-600 !text-gray-900 dark:!text-white hover:!bg-gray-300 dark:hover:!bg-gray-700">
          Toggle Theme
        </Button>
      </motion.div>
    </motion.section>
  );

  /**
   * Career Numbers/Analytics Section.
   * @param {Array} numbersList - Array of career number objects.
   */
  const CareerNumbersSection = ({ numbersList }) => (
    <motion.section
      className="p-12 bg-white dark:bg-gray-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        My Career in Numbers
      </motion.h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto"
        variants={containerVariants}
      >
        {numbersList.map((item, i) => (
          <motion.div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105"
            variants={itemVariants}
          >
            <p className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">{item.value}</p>
            <p className="text-base text-gray-700 dark:text-gray-300">{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Reading & Learning Section (Blog Preview).
   * @param {Array} articlesList - Array of article objects.
   */
  const ReadingLearningSection = ({ articlesList }) => (
    <motion.section
      className="p-12 bg-gray-100 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100"
        variants={itemVariants}
      >
        Reading & Continuous Learning
      </motion.h2>
      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={containerVariants}
      >
        {articlesList.map((blog, i) => (
          <Card key={i}>
            <CardContent>
              <h3 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">{blog.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-4">{blog.desc}</p>
              <div className="text-right">
                <Button href={blog.link} target="_blank" className="!px-4 !py-2 !text-sm !rounded-md !bg-indigo-100 !text-indigo-700 dark:!bg-gray-700 dark:!text-indigo-300">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.section>
  );

  /**
   * Footer Section.
   */
  const FooterSection = () => (
    <footer className="bg-indigo-900 text-white py-8 text-center dark:bg-gray-950">
      <p className="text-sm mb-4">© {new Date().getFullYear()} Aman Agrawal. Crafted with React + Tailwind CSS ✨</p>
      <div className="mt-2 flex justify-center gap-6">
        <a href="https://linkedin.com/in/am-ag" target="_blank" rel="noopener noreferrer" className="hover:underline text-lg transition-colors duration-200">
          LinkedIn
        </a>
        <a href="mailto:agrawalamanhnd@gmail.com" className="hover:underline text-lg transition-colors duration-200">
          Email
        </a>
        <a href="https://github.com/am-ag" target="_blank" rel="noopener noreferrer" className="hover:underline text-lg transition-colors duration-200">
          GitHub
        </a>
      </div>
    </footer>
  );

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen font-sans transition-colors duration-300">
      {/* Dark/Light Mode Toggle */}
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Sections */}
      <HeroSection profileImage={profileImage} />
      <AboutSection openModal={openAboutModal} />
      <ExperienceSection timeline={experienceTimeline} openDetailModal={openDetailModal} />
      <SkillsSection skillsList={skills} />
      <ProjectsSection projectsList={projects} openDetailModal={openDetailModal} />
      <ExtrasSection extrasList={extras} />
      <TestimonialsSection testimonialsList={testimonials} />
      <CertificationsSection certsList={certifications} />
      <QuotePanel />
      <QuickAccessSection toggleDarkMode={toggleDarkMode} />
      <CareerNumbersSection numbersList={careerNumbers} />
      <ReadingLearningSection articlesList={readingLearning} />
      <FooterSection />

      {/* Modals for hidden details */}
      <Modal isOpen={isAboutModalOpen} onClose={closeAboutModal} title={modalContent.title}>
        {modalContent.desc}
      </Modal>
      <Modal isOpen={isDetailModalOpen} onClose={closeDetailModal} title={modalContent.title}>
        {modalContent.desc}
      </Modal>
    </div>
  );
}
