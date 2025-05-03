import React, { useState, useEffect } from "react";
import "./Web.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const TuitionClass = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Mathematics Mastery",
      description: "From basic arithmetic to advanced calculus",
      icon: "🧮",
      duration: "12 weeks",
    },
    {
      id: 2,
      title: "Science Explorers",
      description: "Hands-on experiments and theory",
      icon: "🔬",
      duration: "10 weeks",
    },
    {
      id: 3,
      title: "Language Arts",
      description: "Reading, writing, and communication skills",
      icon: "📚",
      duration: "8 weeks",
    },
  ];

  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subject: "Mathematics",
      experience: "15 years",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      subject: "Physics",
      experience: "12 years",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Ms. Emily Wilson",
      subject: "English Literature",
      experience: "8 years",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "David R.",
      text: "My math scores improved by 30% in just 3 months!",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya K.",
      text: "The teachers are patient and explain concepts clearly.",
      rating: 4,
    },
    {
      id: 3,
      name: "James L.",
      text: "Best tuition center in town. Highly recommended!",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <div className="tuition-app">
      {/* Animated Background */}
      <div className="animated-bg"></div>

      {/* Navigation */}
      {/* <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>EduMaster</span>
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>Home</li>
          <li className={activeTab === 'courses' ? 'active' : ''} onClick={() => setActiveTab('courses')}>Courses</li>
          <li className={activeTab === 'teachers' ? 'active' : ''} onClick={() => setActiveTab('teachers')}>Teachers</li>
          <li className={activeTab === 'testimonials' ? 'active' : ''} onClick={() => setActiveTab('testimonials')}>Testimonials</li>
          <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contact</li>
           
          
        </ul>

        <div className={`burger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main>
        {activeTab === "home" && (
          <section className="hero">
            <div className="hero-content">
              <h1 className="text-gradient">
                Unlock Your <span>Potential</span>
              </h1>
              <p>Personalized learning for students of all ages and levels</p>
              <div className="cta-buttons">
                <button
                  className="btn btn-primary pulse"
                  onClick={() => setActiveTab("contact")}
                >
                  Enroll Now
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setActiveTab("courses")}
                >
                  Our Courses
                </button>
              </div>
            </div>
            <br />
            <br />
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350"
                alt="Students learning"
              />
            </div>
          </section>
        )}

        {activeTab === "courses" && (
          <section className="courses">
            <h2>
              Our <span>Courses</span>
            </h2>
            <div className="course-cards">
              {courses.map((course) => (
                <div key={course.id} className="course-card">
                  <div className="course-icon">{course.icon}</div>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="course-duration">{course.duration}</div>
                  <button className="btn btn-outline">Learn More</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "home" && (
          <section className="teachers">
            <h2>
              Meet Our <span>Teachers</span>
            </h2>
            <div className="teacher-profiles">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-image">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <h3>{teacher.name}</h3>
                  <p className="subject">{teacher.subject}</p>
                  <p className="experience">{teacher.experience} experience</p>
                  <button className="btn btn-outline">View Profile</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "home" && (
          <section className="testimonials">
            <h2>
              What Our <span>Students Say</span>
            </h2>
            <div className="testimonial-cards">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <p className="testimonial-author">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="contact">
            <h2>
              Get In <span>Touch</span>
            </h2>
            <div className="contact-container">
              <div className="contact-info">
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>123 Education Street, Learning City</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-phone"></i>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="info-item">
                  <i className="fas fa-envelope"></i>
                  <p>info@edumaster.com</p>
                </div>
              </div>
              <form className="contact-form">
                <div className="form-group">
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select>
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="Your Message" rows="4"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <span>🎓</span>
            <span>EduMaster</span>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#courses">Courses</a>
            <a href="#teachers">Teachers</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="social-links">
            <a href="#">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} EduMaster Tuition Center. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TuitionClass;
