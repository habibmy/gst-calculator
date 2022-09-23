import React, { ChangeEventHandler, useState } from "react";

const Calculator = () => {
  const [excludingGST, setExcludingGST] = useState(0);
  const [includingGST, setIncludingGST] = useState(0);
  const [gst, setGST] = useState(18);

  const calculateIncludingGST: ChangeEventHandler<HTMLInputElement> = (e) => {
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

  const gstChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setGST(Number(value));
    const gst = Number(value);
    const gstAmount = gst / 100;
    const gstAmountValue = gstAmount * excludingGST;
    let total = gstAmountValue + excludingGST;
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    setIncludingGST(total);
  };

  return (
    <div className="p-8 max-w-md bg-white bg-opacity-50 rounded-md">
      <div className="flex justify-between gap-5">
        <div className="mb-5 p-2 bg-white rounded-md">
          <span className="text-xs">Amount without tax</span>
          <input
            className="text-4xl w-full"
            type="number"
            value={String(excludingGST)}
            onChange={calculateIncludingGST}
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
          onChange={gstChangeHandler}
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
