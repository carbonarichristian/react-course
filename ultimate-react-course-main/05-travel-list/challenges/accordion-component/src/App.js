import { useState } from "react";

const faqs = [
  {
    id: 1,
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    id: 2,
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    id: 3,
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {
  return (
    <div>
      <Accordion />
    </div>
  );
}

function Accordion() {
  return (
    <div className="accordion">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} id={faq.id} title={faq.title} text={faq.text} />
      ))}

    </div>
  );
}

function AccordionItem({id, title, text}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isOpen ? "item open" : "item"}  onClick={() => setIsOpen(!isOpen)}>
      <p className="number">{id}</p>
      <p className={isOpen ? "title" : "text"}>{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
