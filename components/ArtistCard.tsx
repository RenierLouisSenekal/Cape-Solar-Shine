
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  item: ServiceItem;
  onClick: () => void;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ item, onClick, index }) => {
  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b md:border-r border-white/10 bg-black cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: (index % 3) * 0.1,
        ease: [0.21, 0.45, 0.32, 0.9]
      }}
      whileHover="hover"
      whileTap="hover"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.5, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.8, filter: 'grayscale(0%)' }
          }}
          initial="rest"
          animate="rest"
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-[#0284c7]/20 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full backdrop-blur-md bg-black/50">
             {item.tag}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             initial="rest"
             className="bg-white text-black rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mix-blend-normal will-change-transform leading-tight"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              initial="rest"
              transition={{ duration: 0.4 }}
            >
              {item.title}
            </motion.h3>
          </div>
          <motion.p 
            className="text-sm font-medium uppercase tracking-widest text-[#22d3ee] mt-2 will-change-transform"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            initial="rest"
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {item.subtitle}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
