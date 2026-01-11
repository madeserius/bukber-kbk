'use client'

import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function StyleReference() {
  const womenStyles = [
    { id: 1, description: 'Bell bottoms & floral top', image: '/custom/women/women-1.jpeg' },
    { id: 2, description: 'Maxi dress with headband', image: '/custom/women/women-2.jpeg' },
    { id: 3, description: 'Platform shoes & wide leg pants', image: '/custom/women/women-3.jpeg' },
    { id: 4, description: 'Vintage blouse & high waist skirt', image: '/custom/women/women-4.jpeg' },
  ]

  const menStyles = [
    { id: 1, description: 'Flared pants & patterned shirt', image: '/custom/men/men-1.jpeg' },
    { id: 2, description: 'Turtleneck & wide collar jacket', image: '/custom/men/men-2.jpeg' },
    { id: 3, description: 'Denim on denim look', image: '/custom/men/men-3.jpeg' },
    { id: 4, description: 'Leisure suit & aviator sunglasses', image: '/custom/men/men-4.jpeg' },
  ]

  return (
    <section className="section-spacing space-y-12">
      {/* Women's Style References */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icon icon="mdi:human-female" className="text-gold text-3xl" />
            <h2 className="text-brown font-serif font-bold text-2xl">
              Women's Style References
            </h2>
          </div>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 gap-4">
          {womenStyles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: index % 2 === 0 ? 3 : -3 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="bg-white p-3 shadow-xl cursor-pointer"
            >
              {/* Polaroid image placeholder */}
              <div className="bg-gradient-to-br from-gold/20 to-brown/20 aspect-square rounded flex items-center justify-center mb-3 relative overflow-hidden">
                {style.image ? (
                  <Image
                    src={style.image}
                    alt={style.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 50vw, 200px"
                  />
                ) : (
                  <>
                    {/* Silhouette decoration - fallback */}
                    <Icon icon="mdi:human-female" className="text-brown/30 text-7xl" />

                    {/* Image overlay text */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <p className="text-white text-xs font-bold text-center px-2 bg-brown/70 py-1 rounded">
                        70's Style #{style.id}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Polaroid caption */}
              {/* <p className="text-brown font-serif text-xs text-center leading-tight">
                {style.description}
              </p> */}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Men's Style References */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Icon icon="mdi:human-male" className="text-gold text-3xl" />
            <h2 className="text-brown font-serif font-bold text-2xl">
              Men's Style References
            </h2>
          </div>
          <div className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        {/* Polaroid grid */}
        <div className="grid grid-cols-2 gap-4">
          {menStyles.map((style, index) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0, rotate: 5 }}
              whileInView={{ opacity: 1, rotate: index % 2 === 0 ? -3 : 3 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className="bg-white p-3 shadow-xl cursor-pointer"
            >
              {/* Polaroid image placeholder */}
              <div className="bg-gradient-to-br from-brown/20 to-gold/20 aspect-square rounded flex items-center justify-center mb-3 relative overflow-hidden">
                {style.image ? (
                  <Image
                    src={style.image}
                    alt={style.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 480px) 50vw, 200px"
                  />
                ) : (
                  <>
                    {/* Silhouette decoration - fallback */}
                    <Icon icon="mdi:human-male" className="text-brown/30 text-7xl" />

                    {/* Image overlay text */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <p className="text-white text-xs font-bold text-center px-2 bg-brown/70 py-1 rounded">
                        70's Style #{style.id}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Polaroid caption */}
              {/* <p className="text-brown font-serif text-xs text-center leading-tight">
                {style.description}
              </p> */}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <p className="text-brown/60 text-xs italic">
          *Referensi gaya - silakan berimprovisasi sesuai kenyamanan
        </p>
      </motion.div>
    </section>
  )
}
