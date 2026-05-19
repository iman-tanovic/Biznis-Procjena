import "../App.css";
import "../pages/HomePage.css";
export default function Background() 
{ return(<div className="graph-bg">
    <svg viewBox="0 0 1200 320" xmlns="http://www.w3.org/2000/svg">
      <path
        className="graph-line"
        d="M0 220 C90 210 150 260 250 225 C330 195 390 205 500 155 C610 105 700 195 820 145 C930 95 1030 150 1200 100"
      />
      <path
        className="graph-line"
        d="M0 210 C100 170 180 175 260 225 C360 290 470 90 590 120 C700 150 760 235 860 215 C980 190 1070 80 1200 110"
        />
        <path
        className="graph-line" id = "c"
        d="M0 70 C90 60 160 125 250 120 C350 115 430 175 540 170 C660 165 750 245 860 235 C980 225 1080 300 1200 285"
        />
    </svg>
  </div>)}