import { motion, type Variants } from "framer-motion";
 
const blockVariant: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

function ServicesComponent() {
  return (
    <div className=" absolute top-210 left-0 w-full h-max bg-gray-50/10 overflow-hidden">
      <div className="w-full max-w-5xl  mx-auto py-16 flex place-items-start  gap-8 bg-gray-50/10">
        <motion.div
          className="flex-col px-4 py-12 text-center"
          variants={blockVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
            <img src="../icons/clock.svg" alt=" " width={24} height={24} className="mx-auto opacity-50 mb-4" />
          <h2 className=" text-xl font-bold">
            Accomplissez-en plus, plus rapidement
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Vous planifiez un voyage ou recherchez un achat important ? Copilot
            compare, résume et s’occupe des tâches que vous ne souhaitez pas
            faire — tout cela au même endroit.
          </p>
        </motion.div>

        <motion.div
          className="flex-col px-4 py-12 text-center"
          variants={blockVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
        >
            <img src="../icons/brain.svg" alt=" " width={24} height={24} className="mx-auto opacity-50 mb-4 " />
          <h2 className=" text-xl font-bold">IA qui travaille à vos côtés</h2>
          <p className="mt-4 text-sm text-gray-600">
            Copilot fonctionne dans votre navigateur, en utilisant vos onglets
            pour comparer les options, mettre en avant les détails importants et
            fournir des réponses claires — sans avoir à passer d’un outil à
            l’autre.
          </p>
        </motion.div>

        <motion.div
          className="flex-col px-4 py-12 text-center"
          variants={blockVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={2}
        >
            <img src="../icons/chart-spline.svg" alt=" " width={24} height={24} className="mx-auto opacity-50 mb-4" />
          <h2 className=" text-xl font-bold">
            S'améliore à mesure que vous l'utilisez
          </h2>
          <p className="mt-4 text-sm text-gray-600">
            Copilot se souvient de ce sur quoi vous avez travaillé, afin que
            vous ne repartiez pas de zéro. Plus vous l’utilisez, plus il devient
            utile et personnalisé.
          </p>
        </motion.div>

        {/*  <div className="flex space-x-6">
            <div className="flex flex-col items-center bg-white/5 rounded-lg shadow-md p-6 w-64"> 
                <h3 className="text-xl font-medium text-gray-800 mb-2">Consultation Stratégique</h3>    
                <p className="text-gray-600 text-center">
                    Nos experts travaillent avec vous pour élaborer une stratégie personnalisée qui maximise votre potentiel de croissance et d'innovation.
                </p>
            </div>
            <div className="flex flex-col items-center bg-white/5 rounded-lg shadow-md p-6 w-64">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Développement de Solutions</h3>
                <p className="text-gray-600 text-center">
                    Nous créons des solutions sur mesure qui répondent à vos défis spécifiques, en utilisant les dernières technologies pour garantir des résultats exceptionnels.
                </p>
            </div>
            <div className="flex flex-col items-center bg-white/5 rounded-lg shadow-md p-6 w-64">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Support Continu</h3>
                <p className="text-gray-600 text-center">
                    Notre équipe de support est disponible 24/7 pour assurer le bon fonctionnement de vos solutions et vous aider à surmonter tout obstacle.
                </p>
            </div>
        </div>
 */}
      </div>
    </div>
  );
}

export default ServicesComponent;
