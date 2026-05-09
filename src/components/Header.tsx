import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Copilot dans Edge</h1>
      <p>Accomplissez-en plus, plus rapidement...</p>
    </motion.div>
  );
}
