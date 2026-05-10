import { motion } from "framer-motion";

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Fonctionnalités</h1>
      <p>Découvrez ce que notre application peut faire pour vous...</p>
    </motion.div>
  );
}
