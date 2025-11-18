"use client";

import React, { useState, useEffect } from 'react';
import { Send, Mail, User, MessageSquare, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<"name" | "email" | "description" | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    state: '',
    intoTech: '',
    fieldOfInterest: '',
    gender: '',
    howDidYouHear: '',
    agreeToPrivacy: false
  });

  
  const sliderImages = [
    {
      src: "/images/pic8.jpg",
      alt: "Modern office workspace",
      title: "Creative Solutions"
    },
    {
      src: "/images/pic9.webp", 
      alt: "Team collaboration",
      title: "Expert Team"
    },
    {
      src: "/images/jtf-3.jpg",
      alt: "Digital innovation",
      title: "Innovation First"
    },
    {
      src: "/images/pic11.webp",
      alt: "Success stories",
      title: "Proven Results"
    },
    {
      src: "/images/pic12.jpg",
      alt: "Technology solutions",
      title: "Tech Excellence"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Registration Data:', registrationData);
  
    alert('Registration submitted successfully!');
  };

 
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 pt-20">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-200/30 to-green-200/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
       
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            Contact us
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our services? We&rsquo;re here to help.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          <div className="relative">
            <div className="relative h-96 lg:h-full rounded-3xl overflow-hidden shadow-2xl">
             
              <div className="relative w-full h-full">
                {sliderImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold">{image.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

              
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

             
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

       
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-700 hover:shadow-3xl h-full flex flex-col">
              <div className="space-y-6 flex-1 flex flex-col">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      Name
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                        focusedField === 'name' ? 'text-blue-500 scale-110' : 'text-slate-400'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-slate-400 text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md text-sm"
                      />
                    </div>
                  </div>

                  
                  <div className="relative group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
                        focusedField === 'email' ? 'text-blue-500 scale-110' : 'text-slate-400'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="example@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-slate-400 text-slate-800 shadow-sm hover:border-slate-300 hover:shadow-md text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative group flex-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 transition-colors duration-300 group-focus-within:text-blue-600">
                    Description
                  </label>
                  <div className="relative h-full">
                    <MessageSquare className={`absolute left-3 top-4 w-4 h-4 transition-all duration-300 ${
                      focusedField === 'description' ? 'text-blue-500 scale-110' : 'text-slate-400'
                    }`} />
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField(null)}
                      rows={6}
                      placeholder="Include as much details as you can"
                      className="w-full h-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-slate-400 text-slate-800 resize-none shadow-sm hover:border-slate-300 hover:shadow-md text-sm"
                    />
                  </div>
                </div>

           
                <div className="text-center">
                  <p className="text-xs text-slate-600">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors duration-200">
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors duration-200">
                      Privacy policy
                    </a>
                  </p>
                </div>

         
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <button
                      type="submit"
                      disabled={isSubmitted}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200 ${
                        isSubmitted
                          ? 'bg-green-600 text-white cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {isSubmitted ? (
                          <>
                            <CheckCircle className="w-5 h-5 animate-pulse" />
                            <span>Message Sent!</span>
                          </>
                        ) : (
                          <>
                            <span>Send message</span>
                            <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-70 animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-60 animate-pulse"></div>
          </div>

         
          <div className="col-span-1 lg:col-span-2 mt-8 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link
    href="https://smartinvites.xyz/forms/68e930bf881d91001bd67f19/6903335d256533001abab3b9/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-green-700 hover:bg-emerald-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
  >
    Register Now
  </Link>

  
</div>
          </div>
        </div>

       
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
             
              <div className="bg-gradient-to-r from-slate-100 to-green-50 p-8 rounded-t-3xl text-center relative">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Register for JosTechFest 2024</h2>
                <p className="text-slate-600">Join us at JosTechFest. Complete the form to secure your spot.</p>
                <button
                  onClick={() => setShowRegistrationForm(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>

   
              <div className="p-8 space-y-6">
          
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={registrationData.firstName}
                      onChange={handleRegistrationChange}
                      placeholder="First name"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={registrationData.lastName}
                      onChange={handleRegistrationChange}
                      placeholder="Your surname"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>

              
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={registrationData.email}
                    onChange={handleRegistrationChange}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

           
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={registrationData.phoneNumber}
                    onChange={handleRegistrationChange}
                    placeholder="NGN+234 (900) 000-0000"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={registrationData.state}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                  >
                    <option value="">Enter your State</option>
                    <option value="plateau">Plateau</option>
                    <option value="abuja">Abuja (FCT)</option>
                    <option value="lagos">Lagos</option>
                    <option value="kaduna">Kaduna</option>
                    <option value="kano">Kano</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Are you into Tech? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="intoTech"
                    value={registrationData.intoTech}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="learning">Learning</option>
                  </select>
                </div>

             
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Field of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fieldOfInterest"
                    value={registrationData.fieldOfInterest}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                  >
                    <option value="">Select a Tech field of interest</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="ai-ml">AI/Machine Learning</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="devops">DevOps</option>
                    <option value="blockchain">Blockchain</option>
                  </select>
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={registrationData.gender}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

      
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    How did you hear about JosTechFest? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="howDidYouHear"
                    value={registrationData.howDidYouHear}
                    onChange={handleRegistrationChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="social-media">Social Media</option>
                    <option value="friend">Friend/Word of mouth</option>
                    <option value="website">Website</option>
                    <option value="email">Email</option>
                    <option value="flyer">Flyer/Poster</option>
                    <option value="other">Other</option>
                  </select>
                </div>

           
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeToPrivacy"
                    checked={registrationData.agreeToPrivacy}
                    onChange={handleRegistrationChange}
                    className="mt-1 w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500"
                  />
                  <label className="text-sm text-slate-600">
                    You agree to our friendly{' '}
                    <a href="#" className="text-green-600 hover:text-green-700 underline">
                      privacy policy
                    </a>
                    .
                  </label>
                </div>

             
                <form onSubmit={handleRegistrationSubmit}>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;