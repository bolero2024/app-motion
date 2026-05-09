 
import { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: string;
};

type FAQProps = {
  faqData: FAQItemProps[];
};
 

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] =  useState(false);
  return (
    <div>
      <h3 onClick={() => setOpen(!open)}>{question}</h3>
      {open && <p>{answer}</p>}
    </div>
  );
}

export default function FAQ({ faqData }: FAQProps) {
  return (
    <div>
      {faqData.map((item, index) => (
        <FAQItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
