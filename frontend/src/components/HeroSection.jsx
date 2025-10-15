import React, { useState, useEffect } from 'react';

const timetables = [
  {
    id: 1,
    title: "III B.A., B.Sc., B.Com & B.B.A. Degree FIFTH SEMESTER - END (Supplementary) 20-22 Series Examinations OCTOBER 2025",
    subtitle: "10 A.M. to 12.30 P.M.",
    headers: ["Date & Day", "B.A.", "B.Sc.", "B.Com.", "B.B.A."],
    rows: [
      {
        date: "28-10-2025 Tuesday",
        ba: "Economics - VII (Banking and Financial Services)",
        bsc: "Mathematics - VI (Numerical Methods)\nBotany - VI (Plant Tissue Culture)",
        bcom: "Management Accounting & Practice",
        bba: "Global Human Resource Management"
      },
      {
        date: "29-10-2025 Wednesday",
        ba: "History - VII (Tourism Guidance and Operating Skills)",
        bsc: "Mathematics - VII (Mathematical Special Functions)\nBotany - VII (Mushroom Cultivation)",
        bcom: "Cost Control Techniques",
        bba: "e-Payment System"
      },
      {
        date: "30-10-2025 Thursday",
        ba: "",
        bsc: "Physics - VI (Applications of Electricity & Electronics)\nZoology - VI (Sustainable Aquaculture Management)",
        bcom: "Life Insurance with Practice",
        bba: ""
      },
      {
        date: "31-10-2025 Friday",
        ba: "",
        bsc: "Physics - VII (Electronic Instrumentation)",
        bcom: "Digital Marketing",
        bba: ""
      },
      {
        date: "01-11-2025 Saturday",
        ba: "",
        bsc: "Chemistry - VI (Analytical Methods in Chemistry - I)\nStatistics - VI (Operations Research - I)",
        bcom: "",
        bba: ""
      },
      {
        date: "03-11-2025 Monday",
        ba: "",
        bsc: "Chemistry - VII (Analytical Methods in Chemistry - II)\nStatistics - VII (Operations Research - II)",
        bcom: "",
        bba: ""
      },
      {
        date: "04-11-2025 Tuesday",
        ba: "",
        bsc: "Computer Science - VI (Web Interface Designing Technologies)",
        bcom: "",
        bba: ""
      },
      {
        date: "05-11-2025 Wednesday",
        ba: "",
        bsc: "Computer Science - VII (Web Application Develop Using P.H.P & MYSQL)",
        bcom: "",
        bba: ""
      }
    ]
  },
  {
    id: 2,
    title: "II B.A., B.Sc., B.Com & B.B.A. Degree THIRD SEMESTER - END (Regular) 20-22 Series Examinations MARCH 2025",
    subtitle: "10 A.M. to 12.30 P.M.",
    headers: ["Date & Day", "B.A.", "B.Sc.", "B.Com.", "B.B.A."],
    rows: [
      {
        date: "15-03-2025 Saturday",
        ba: "English - III",
        bsc: "Physics - III\nChemistry - III",
        bcom: "Business Economics - III",
        bba: "Principles of Management - III"
      },
      {
        date: "17-03-2025 Monday",
        ba: "History - III",
        bsc: "Mathematics - III\nBotany - III",
        bcom: "Financial Accounting - III",
        bba: "Organizational Behavior - III"
      },
      {
        date: "19-03-2025 Wednesday",
        ba: "Economics - III",
        bsc: "Zoology - III\nStatistics - III",
        bcom: "Business Mathematics - III",
        bba: "Marketing Management - III"
      },
      {
        date: "21-03-2025 Friday",
        ba: "",
        bsc: "Computer Science - III",
        bcom: "",
        bba: "Financial Management - III"
      }
    ]
  },
  {
    id: 3,
    title: "I B.A., B.Sc., B.Com & B.B.A. Degree FIRST SEMESTER - END (Regular) 20-22 Series Examinations NOVEMBER 2024",
    subtitle: "10 A.M. to 12.30 P.M.",
    headers: ["Date & Day", "B.A.", "B.Sc.", "B.Com.", "B.B.A."],
    rows: [
      {
        date: "10-11-2024 Sunday",
        ba: "English - I",
        bsc: "Physics - I\nChemistry - I",
        bcom: "Business Economics - I",
        bba: "Principles of Management - I"
      },
      {
        date: "12-11-2024 Tuesday",
        ba: "Second Language - I",
        bsc: "Mathematics - I\nBotany - I",
        bcom: "Financial Accounting - I",
        bba: "Business Communication - I"
      },
      {
        date: "14-11-2024 Thursday",
        ba: "Foundation Course - I",
        bsc: "Zoology - I\nStatistics - I",
        bcom: "Business Mathematics - I",
        bba: "Business Environment - I"
      },
      {
        date: "16-11-2024 Saturday",
        ba: "",
        bsc: "Computer Science - I",
        bcom: "",
        bba: "Managerial Economics - I"
      }
    ]
  }
];

export default function HeroSection() {
  const [currentTimetableIndex, setCurrentTimetableIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimetableIndex((prev) => (prev + 1) % timetables.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTimetable = timetables[currentTimetableIndex];

  const formatSubjectText = (text) => {
    if (!text) return "-";
    return text.split('\n').map((line, index) => (
      <div key={index} className="subject-line">
        {line}
      </div>
    ));
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="timetable-container">
            {/* Header */}
            <div className="timetable-header">
              <h1 className="timetable-main-title">
                MR COLLEGE EXAM TIME TABLE
              </h1>
              <div className="timetable-subtitle-container">
                <p className="timetable-title">{currentTimetable.title}</p>
                <p className="timetable-subtitle">{currentTimetable.subtitle}</p>
              </div>
              <div className="timetable-indicator">
                {timetables.map((_, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === currentTimetableIndex ? 'active' : ''}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* Timetable */}
            <div className="timetable-wrapper">
              <table className="exam-timetable">
                <thead>
                  <tr>
                    {currentTimetable.headers.map((header, index) => (
                      <th key={index} className={`header-col-${index}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTimetable.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="timetable-row">
                      <td className="date-cell">{row.date}</td>
                      <td className="subject-cell">{formatSubjectText(row.ba)}</td>
                      <td className="subject-cell">{formatSubjectText(row.bsc)}</td>
                      <td className="subject-cell">{formatSubjectText(row.bcom)}</td>
                      <td className="subject-cell">{formatSubjectText(row.bba)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="timetable-footer">
              <div className="timetable-actions">
                <button className="action-btn download">
                  <i className="bi bi-download"></i>
                  Download PDF
                </button>
                <button className="action-btn print">
                  <i className="bi bi-printer"></i>
                  Print Schedule
                </button>
              </div>
              <div className="current-timetable-info">
                Timetable {currentTimetableIndex + 1} of {timetables.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}