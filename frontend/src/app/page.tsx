import React from 'react';
import Image from 'next/image';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DoctorCard } from '../components/ui/DoctorCard';
import { Search, MapPin, Calendar, Heart, Activity, SearchIcon, CheckCircle } from 'lucide-react';
import { mockDoctors } from '../data/mockDoctors';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="main-content">

        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Your Journey to{' '}
                <span className={styles.heroAccent}>Wellness</span>,
                Simplified.
              </h1>
              <p className={styles.heroSubtitle}>
                AI-powered appointment booking and clinical intelligence for smarter, faster healthcare.
              </p>

              <div className={styles.searchBox}>
                <div className={styles.searchFields}>
                  <Input
                    icon={<Search size={18} />}
                    placeholder="Find a Doctor, Speciality or Clinic"
                    fullWidth
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                  />
                  <div className={styles.divider}></div>
                  <Input
                    icon={<MapPin size={18} />}
                    placeholder="Location (City/Zip Code)"
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                  />
                  <div className={styles.divider}></div>
                  <Input
                    icon={<Calendar size={18} />}
                    type="date"
                    style={{ background: 'transparent', border: 'none', boxShadow: 'none' }}
                  />
                </div>
                <Button size="lg" className={styles.searchButton}>Find &amp; Book</Button>
              </div>
            </div>

            <div className={styles.heroImageContainer}>
              <div className={styles.heroIllustration}>
                {/* Decorative background glow */}
                <div className={styles.illustrationGlow} />
                <div className={styles.illustrationCircle} />
                <Image
                  className={styles.heroPhoto}
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85"
                  alt="Doctor speaking with a patient in a bright clinic"
                  fill
                  sizes="(max-width: 1023px) 70vw, 34vw"
                />
                <div className={styles.floatingCard1}>
                  <Heart size={18} color="#E76F51" fill="rgba(231,111,81,0.15)" />
                  <span>Vitals Stable</span>
                </div>
                <div className={styles.floatingCard2}>
                  <CheckCircle size={18} color="var(--color-success)" />
                  <span>Appointment Confirmed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className={styles.howItWorksSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>How MedIntel Works</h2>
            <p className={styles.sectionSubtitle}>
              Three simple steps to get the care you need, when you need it.
            </p>
            <div className={styles.stepsGrid}>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>1</span>
                <div className={styles.stepIconWrapper}>
                  <SearchIcon size={30} color="#E76F51" />
                </div>
                <h3 className={styles.stepTitle}>Search</h3>
                <p className={styles.stepDesc}>Find a doctor by name, speciality, or clinic near you.</p>
              </div>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>2</span>
                <div className={styles.stepIconWrapper}>
                  <Calendar size={30} color="#E76F51" />
                </div>
                <h3 className={styles.stepTitle}>Choose a Slot</h3>
                <p className={styles.stepDesc}>Browse real-time availability and pick a time that suits you.</p>
              </div>
              <div className={styles.stepCard}>
                <span className={styles.stepNumber}>3</span>
                <div className={styles.stepIconWrapper}>
                  <CheckCircle size={30} color="#E76F51" />
                </div>
                <h3 className={styles.stepTitle}>Confirm Appointment</h3>
                <p className={styles.stepDesc}>Receive instant confirmation and reminders. Receive care easily.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED DOCTORS SECTION */}
        <section className={styles.doctorsSection}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Featured Healthcare Providers</h2>
            <p className={styles.sectionSubtitle}>Book an appointment with top-rated specialists today.</p>

            <div className={styles.doctorsGrid}>
              {mockDoctors.map(doctor => (
                <DoctorCard
                  key={doctor.id}
                  name={doctor.name}
                  speciality={doctor.speciality}
                  rating={doctor.rating}
                  location={doctor.location}
                  availability={doctor.availability}
                  imageUrl={doctor.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>

        {/* AI PREVIEW / AI SYMPTOM SECTION */}
        <section className={styles.aiSection}>
          <div className={`container ${styles.aiContainer}`}>
            <div className={styles.aiContent}>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>
                Not sure which doctor you need?
              </h2>
              <p className={styles.aiSubtitle}>
                Describe your symptoms and let MedIntel&apos;s AI help identify the right department and care option.
              </p>
              <div className={styles.aiForm}>
                <textarea
                  className={styles.aiTextarea}
                  rows={4}
                  placeholder="e.g. I have a fever, cough, and fatigue for three days..."
                ></textarea>
                <Button size="lg" className={styles.aiButton}>Analyze Symptoms</Button>
              </div>
            </div>
            <div className={styles.aiGraphic}>
              <div className={styles.aiGraphicCard}>
                <div className={styles.aiAnalysisHeader}>
                  <Activity size={22} color="#E76F51" />
                  <h4>AI Analysis Example</h4>
                </div>
                <div className={styles.aiAnalysisBody}>
                  <div className={styles.aiRow}>
                    <span>Suggested Dept:</span>
                    <strong>General Medicine</strong>
                  </div>
                  <div className={styles.aiRow}>
                    <span>Care Priority:</span>
                    <strong style={{ color: 'var(--color-success)' }}>Normal</strong>
                  </div>
                  <p className={styles.aiNote}>* AI-assisted recommendation. This information does not replace professional medical advice.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
