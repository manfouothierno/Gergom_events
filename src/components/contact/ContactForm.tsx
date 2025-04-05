// src/components/contact/ContactForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        eventType: 'corporate',
        eventDate: '',
        agreement: false
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })

        // Réinitialiser l'erreur pour ce champ lors de la modification
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            })
        }
    }

    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) newErrors.name = 'Veuillez indiquer votre nom'
        if (!formData.email.trim()) newErrors.email = 'Veuillez indiquer votre email'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide'
        if (!formData.message.trim()) newErrors.message = 'Veuillez écrire votre message'
        if (!formData.agreement) newErrors.agreement = 'Vous devez accepter la politique de confidentialité'

        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validate()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        setIsSubmitting(true)

        try {
            // Simulation d'envoi du formulaire
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitSuccess(true)

            // Réinitialiser le formulaire après 3 secondes
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    eventType: 'corporate',
                    eventDate: '',
                    agreement: false
                })
                setSubmitSuccess(false)
            }, 3000)
        } catch (error) {
            console.error('Error submitting form:', error)
            setErrors({ submit: 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.' })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Nom et email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nom complet *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="votre@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
            </div>

            {/* Téléphone et sujet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Votre numéro de téléphone"
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Sujet</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Sujet de votre message"
                    />
                </div>
            </div>

            {/* Type d'événement et date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="eventType" className="block text-gray-700 font-medium mb-1">Type d'événement</label>
                    <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="corporate">Événement d'entreprise</option>
                        <option value="wedding">Mariage</option>
                        <option value="private">Fête privée</option>
                        <option value="concert">Concert</option>
                        <option value="sport">Événement sportif</option>
                        <option value="other">Autre</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="eventDate" className="block text-gray-700 font-medium mb-1">Date de l'événement</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
            </div>

            {/* Message */}
            <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message *</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Décrivez votre projet ou votre demande..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Accord RGPD */}
            <div className="mb-6">
                <label className={`flex items-start ${errors.agreement ? 'text-red-500' : 'text-gray-600'}`}>
                    <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                        className="mt-1 mr-2"
                    />
                    <span className="text-sm">
            J'accepte que mes données soient traitées conformément à la
            <a href="/politique-confidentialite" className="text-red-600 hover:text-red-700 ml-1">
              politique de confidentialité
            </a> *
          </span>
                </label>
                {errors.agreement && <p className="text-red-500 text-sm mt-1">{errors.agreement}</p>}
            </div>

            {/* Message d'erreur général */}
            {errors.submit && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {errors.submit}
                </div>
            )}

            {/* Message de succès */}
            {submitSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les meilleurs délais.
                </div>
            )}

            {/* Bouton d'envoi */}
            <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-red-600 text-white font-medium rounded-md shadow-sm ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                } transition-colors`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer votre message'}
            </motion.button>

            <p className="text-gray-500 text-xs mt-3 text-center">* Champs obligatoires</p>
        </motion.form>
    )
}