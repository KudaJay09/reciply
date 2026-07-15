import { motion } from "motion/react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default Wrapper;
