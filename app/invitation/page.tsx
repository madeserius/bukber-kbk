'use client'

import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import WelcomeMessage from '../components/WelcomeMessage'
import DressCode from '../components/DressCode'
import Budget from '../components/Budget'
import Activities from '../components/Activities'
import StyleReference from '../components/StyleReference'
import RSVPForm from '../components/RSVPForm'
import ClosingMessage from '../components/ClosingMessage'
import BackToTop from '../components/BackToTop'
import MeetingPointMap from '../components/MeetingPointMap'

export default function InvitationPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <Hero />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* Welcome Message */}
      <WelcomeMessage />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* Dress Code */}
      <DressCode />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* Budget & Support */}
      <Budget />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* Activities */}
      <Activities />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* Style References */}
      <StyleReference />

      {/* Divider */}
      <div className="vintage-divider" />

      {/* RSVP Form */}
        <RSVPForm />

        {/* Divider */}
        <div className="vintage-divider" />

        {/* Meeting Point Map */}
        <MeetingPointMap />

        {/* Divider */}
      <div className="vintage-divider" />

      {/* Closing Message */}
      <ClosingMessage />

      {/* Back to Top Button */}
      <BackToTop />
    </motion.div>
  )
}
