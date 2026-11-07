'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HeartPulse,
  ChevronDown,
  User,
  Stethoscope,
  ShieldCheck,
  ClipboardList,
  Menu,
  X,
  CalendarCheck,
} from 'lucide-react';
import styles from './Navbar.module.css';

/* ─── Portal destinations grouped under one dropdown ─── */
const PORTALS = [
  {
    href: '/patient/dashboard',
    label: 'Patient Portal',
    description: 'Your health dashboard',
    icon: <User size={18} />,
  },
  {
    href: '/doctor/dashboard',
    label: 'Doctor Workbench',
    description: 'Appointments & records',
    icon: <Stethoscope size={18} />,
  },
  {
    href: '/staff/intake',
    label: 'Nurse Intake Desk',
    description: 'Patient intake workflow',
    icon: <ClipboardList size={18} />,
  },
  {
    href: '/admin/dashboard',
    label: 'Admin Portal',
    description: 'System management',
    icon: <ShieldCheck size={18} />,
  },
];

export const Navbar = () => {
  const pathname = usePathname();

  const [portalsOpen, setPortalsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePortalsOpen, setMobilePortalsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* ── Helper: is a portal route currently active? ── */
  const isPortalActive = PORTALS.some((p) => pathname?.startsWith(p.href));

  /* ── Close dropdown on outside click or Escape ── */
  const closePortals = useCallback(() => setPortalsOpen(false), []);

  useEffect(() => {
    if (!portalsOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closePortals();
        triggerRef.current?.focus();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closePortals();
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [portalsOpen, closePortals]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setPortalsOpen(false);
  }, [pathname]);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <>
      <header className={styles.navbar} role="banner">
        <div className={`container ${styles.navbarInner}`}>

          {/* ── Logo ── */}
          <Link href="/" className={styles.logo} aria-label="MedIntel home">
            <div className={styles.iconWrapper}>
              <HeartPulse size={22} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <span className={styles.brandName}>MedIntel</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.navLinks} aria-label="Primary navigation">
            <Link
              href="/"
              className={`${styles.link} ${isActive('/') ? styles.linkActive : ''}`}
            >
              Home
            </Link>

            <Link
              href="/find-doctors"
              className={`${styles.link} ${isActive('/find-doctors') ? styles.linkActive : ''}`}
            >
              Find Doctors
            </Link>

            {/* Portals dropdown */}
            <div className={styles.dropdownWrapper} ref={dropdownRef}>
              <button
                ref={triggerRef}
                className={`${styles.dropdownTrigger} ${isPortalActive ? styles.linkActive : ''}`}
                onClick={() => setPortalsOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={portalsOpen}
                aria-controls="portals-menu"
                type="button"
              >
                Portals
                <ChevronDown
                  size={15}
                  strokeWidth={2.5}
                  className={`${styles.chevron} ${portalsOpen ? styles.chevronOpen : ''}`}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown panel */}
              <div
                id="portals-menu"
                role="menu"
                aria-label="Portals"
                className={`${styles.dropdown} ${portalsOpen ? styles.dropdownOpen : ''}`}
              >
                {PORTALS.map((portal) => (
                  <Link
                    key={portal.href}
                    href={portal.href}
                    role="menuitem"
                    className={`${styles.dropdownItem} ${
                      isActive(portal.href) ? styles.dropdownItemActive : ''
                    }`}
                    onClick={closePortals}
                  >
                    <span className={styles.dropdownIcon} aria-hidden="true">
                      {portal.icon}
                    </span>
                    <span className={styles.dropdownText}>
                      <span className={styles.dropdownLabel}>{portal.label}</span>
                      <span className={styles.dropdownDesc}>{portal.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* ── Desktop Actions ── */}
          <div className={styles.actions}>
            <Link href="/login" className={styles.authLink}>
              Sign In
            </Link>
            <Link href="/patient/dashboard" className={styles.ctaLink}>
              <CalendarCheck size={16} strokeWidth={2.5} aria-hidden="true" />
              Book Appointment
            </Link>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {mobileOpen ? (
              <X size={22} strokeWidth={2.5} aria-hidden="true" />
            ) : (
              <Menu size={22} strokeWidth={2.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ── */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Mobile: primary links */}
        <Link
          href="/"
          className={`${styles.mobileLink} ${isActive('/') ? styles.mobileLinkActive : ''}`}
        >
          Home
        </Link>
        <Link
          href="/find-doctors"
          className={`${styles.mobileLink} ${isActive('/find-doctors') ? styles.mobileLinkActive : ''}`}
        >
          Find Doctors
        </Link>

        {/* Mobile: Portals accordion */}
        <button
          className={`${styles.mobileAccordion} ${isPortalActive ? styles.mobileLinkActive : ''}`}
          onClick={() => setMobilePortalsOpen((o) => !o)}
          aria-expanded={mobilePortalsOpen}
          type="button"
        >
          <span>Portals</span>
          <ChevronDown
            size={16}
            className={`${styles.chevron} ${mobilePortalsOpen ? styles.chevronOpen : ''}`}
            aria-hidden="true"
          />
        </button>
        {mobilePortalsOpen && (
          <div className={styles.mobileSubMenu}>
            {PORTALS.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className={`${styles.mobileSubLink} ${
                  isActive(portal.href) ? styles.mobileLinkActive : ''
                }`}
              >
                <span className={styles.mobileSubIcon} aria-hidden="true">
                  {portal.icon}
                </span>
                {portal.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile: auth row */}
        <div className={styles.mobileDivider} aria-hidden="true" />
        <Link href="/login" className={styles.mobileAuthLink}>
          Sign In
        </Link>
        <Link href="/patient/dashboard" className={styles.mobileCtaLink}>
          <CalendarCheck size={16} strokeWidth={2.5} aria-hidden="true" />
          Book Appointment
        </Link>
      </nav>
    </>
  );
};
