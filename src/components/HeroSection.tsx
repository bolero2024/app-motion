/* import { motion } from "framer-motion";

export default function HeroSection() {
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
 */

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: (i: number) => ({
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut" as const,
      delay: i * 0.3, // effet en cascade
    },
  }),
};

const Hero = () => {
  const cards = [
    { title: "Productivité", text: "Accomplissez-en plus, plus rapidement." },
    { title: "Créativité", text: "Donnez vie à vos idées." },
    { title: "Assistance", text: "Un copilote toujours disponible." },
  ];

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "80px 20px",
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
      }}
    >
      {/* Texte principal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", maxWidth: "700px", marginBottom: "60px" }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
          Copilot dans Edge
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Découvrez une nouvelle façon de travailler, créer et apprendre avec des
          animations fluides et des interactions modernes.
        </p>
      </motion.div>

      {/* Cards animées */}
      <div style={{ display: "flex", gap: "30px" }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            style={{
              width: "250px",
              height: "180px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
          >
            <h3 style={{ marginBottom: "10px", fontSize: "1.4rem" }}>
              {card.title}
            </h3>
            <p style={{ color: "#666", textAlign: "center" }}>{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
