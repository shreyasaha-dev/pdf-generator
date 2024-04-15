import { jsPDF } from "jspdf";
import "jspdf-autotable";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("B.Tech");

  const handleNameChange = (event) => setName(event.target.value);
  const handleCourseChange = (event) => setCourse(event.target.value);

  const generatePDF = () => {
    if (!name) return alert("Please enter name");

    const pdf = new jsPDF();

    pdf.text("Ref -", 10, 10);
    pdf.text("Fee structure:", 10, 100);

    pdf.text(`Name: ${name}`, 10, 30);
    pdf.text(`Course: ${course}`, 10, 40);

    const refNumber = course === "B.Tech" ? "A101" : "B101";
    pdf.text(refNumber, 30, 10);

    let feeStructure;
    if (course === "B.Tech") {
      feeStructure = [
        ["1", "500", "160"],
        ["2", "-", "160"],
      ];
    } else {
      feeStructure = [
        ["1", "600", "260"],
        ["2", "-", "260"],
      ];
    }

    pdf.autoTable({
      startY: 110,
      head: [["year", "One time fee", "Tuition fee"]],
      body: feeStructure,
      theme: "grid",
      styles: { overflow: "linebreak" },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      didDrawCell: (data) => {},
    });

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    pdf.text(`Date of Offer (current date): ${currentDate}`, 10, 90);

    pdf.save(`${name}-${course}-Offer.pdf`);
  };

  return (
    <div className="form-container">
      <h2>Generate Your Offer Letter</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="input-name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="course">Course:</label>
        <select
          id="course"
          value={course}
          onChange={handleCourseChange}
          className="select-course"
        >
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
        </select>
      </div>
      <button onClick={generatePDF} className="btn-generate">
        Generate PDF
      </button>
    </div>
  );
};

export default App;
