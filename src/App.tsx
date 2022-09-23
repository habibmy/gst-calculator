import React from "react";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="bg-pink-200 h-screen w-screen flex flex-col">
      <header>
        <h1 className="h-16 text-4xl p-4 text-pink-800 font-semibold">
          GST Calculator
        </h1>
      </header>
      <main className="flex justify-center items-center flex-1 -mt-16">
        <Calculator />
      </main>
    </div>
  );
}

export default App;
