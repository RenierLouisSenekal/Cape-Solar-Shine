
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 100 }) => {
  return (
    <motion.div
      style={{ width: size, height: size }}
      className={`relative overflow-hidden rounded-full flex items-center justify-center bg-white shadow-lg ${className}`}
    >
      <img 
        src="input_file_2.png" 
        alt="Cape Solar Shine Logo" 
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};

export default Logo;
