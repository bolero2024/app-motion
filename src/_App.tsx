 
// import { useState } from 'react'
import './App.css'
import FAQ from './components/FAQ'
import Features from './components/Features'
import Footer from './components/Footer'
import Header from './components/Header'
import HeroSection from './components/HeroSection'


function App() {

  // const [count, setCount] = useState(0)

  const faqData = [
    {
      question: "Qu'est-ce que Copilot dans Edge ?",
      answer: "Copilot dans Edge est une fonctionnalité d'IA intégrée qui vous aide à accomplir des tâches plus rapidement et plus efficacement en utilisant des suggestions intelligentes basées sur le contexte de votre navigation."
    },
    {
      question: "Comment fonctionne Copilot dans Edge ?",
      answer: "Copilot utilise des modèles d'IA avancés pour analyser votre activité de navigation et fournir des suggestions pertinentes en temps réel. Il peut vous aider à rédiger des e-mails, à trouver des informations, à organiser votre emploi du temps, et bien plus encore."
    },
    {
      question: "Est-ce que Copilot dans Edge est gratuit ?",
      answer: "Oui, Copilot dans Edge est disponible gratuitement pour tous les utilisateurs du navigateur Microsoft Edge."
    }
  ];  

  return (
    <>
      <Header/>

    <HeroSection/>

    <Features/>

    <FAQ  faqData={faqData}/>

    <Footer/>
    </>
  )
}

export default App
