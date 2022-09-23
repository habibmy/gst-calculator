import React, { ChangeEventHandler, useState, useEffect } from "react";

const Calculator = () => {
  const [excludingGST, setExcludingGST] = useState(0);
  const [includingGST, setIncludingGST] = useState(0);
  const [gst, setGST] = useState(18);

  const calculateGST: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const excludingGST = parseFloat(value ?? "0");
    setExcludingGST(excludingGST);
    const gstAmount = gst / 100;
    const gstAmountValue = gstAmount * excludingGST;
    let total = gstAmountValue + excludingGST;
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    setIncludingGST(total);
  };

  const calculateExcludingGST: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const includingGST = parseFloat(value ?? "0");
    setIncludingGST(includingGST);
    let total = (includingGST * 100) / (100 + gst);
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    setExcludingGST(total);
  };

  useEffect(() => {
    calculateGST({ target: { value: excludingGST } } as any);
  }, [gst]);

  return (
    <div className="p-8 max-w-md bg-white bg-opacity-50 rounded-md">
      <div className="flex justify-between gap-5">
        <div className="mb-5 p-2 bg-white rounded-md">
          <span className="text-xs">Amount without tax</span>
          <input
            className="text-4xl w-full"
            type="number"
            value={String(excludingGST)}
            onChange={calculateGST}
          />
          {/* e => setExcludingGST(Number(e.target.value))   */}
        </div>
        <div className="mb-5 p-2 bg-white rounded-md">
          <span className="text-xs">Amount with tax</span>
          <input
            className="text-4xl w-full"
            type="number"
            value={String(includingGST)}
            onChange={calculateExcludingGST}
          />
          {/* e => setIncludingGST(Number(e.target.value)) */}
        </div>
      </div>
      <div className="mb-5 p-2 bg-white rounded-md">
        <span className="block">Gst Percentage</span>
        <select
          className="w-full text-3xl text-center"
          value={gst}
          onChange={(e) => setGST(Number(e.target.value))}
        >
          <option value={5}>5%</option>
          <option value={12}>12%</option>
          <option value={18}>18%</option>
          <option value={28}>28%</option>
        </select>
      </div>
    </div>
  );
};

export default Calculator;
