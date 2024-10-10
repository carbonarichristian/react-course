import { useState } from "react";
import Box from "./Box";

export default function Main({movies, watched}) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <main className="main">
      <Box movies={movies} open={isOpen1} onOpen={setIsOpen1} />
      <Box movies={watched} open={isOpen2} onOpen={setIsOpen2} />
    </main>
  )
}
