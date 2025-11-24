import React, { useState, useEffect } from "react";
import "./HealthTrack.css";

// ICONS/SYMBOLS
const ICONS = {
  bmi: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="var(--pc-turquoise)" strokeWidth="2.8" fill="#f7faf9"/>
      <rect x="17" y="13" width="2" height="10.5" rx="1" fill="var(--pc-green)" />
      <polygon points="18,7 16,13 20,13" fill="var(--pc-green)" />
      <circle cx="18" cy="12.4" r="2" fill="var(--pc-turquoise)" />
    </svg>
  ),
  sleep_ok: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#8B82FF" strokeWidth="2.8" fill="#f6f8fe"/>
      <ellipse cx="15.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <ellipse cx="20.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <path d="M15 22 Q18 24.6 21 22" stroke="#625be9" strokeWidth="1.45" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sleep_bad: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#8B82FF" strokeWidth="2.8" fill="#f6f8fe"/>
      <ellipse cx="15.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <ellipse cx="20.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <path d="M15 23 Q18 20.2 21 23" stroke="#625be9" strokeWidth="1.45" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  water: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#0EC4B3" strokeWidth="2.8" fill="#f3fcfa"/>
      <ellipse cx="18" cy="23" rx="7" ry="3.4" fill="#0EC4B3" opacity="0.20" />
      <path d="M18 10 Q22.7 19 18 27 Q13.3 19 18 10Z" fill="#0EC4B3" opacity="0.18"/>
    </svg>
  ),
  steps: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#fb7171" strokeWidth="2.8" fill="#fef7f5"/>
      <path d="M10 25 Q18 14 26 22" stroke="#fb7171" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  heart: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#ff4666" strokeWidth="2.7" fill="#fef6fa"/>
      <polyline points="9,22 16,17 20,26 24,8 29,27" fill="none" stroke="#ff4666" strokeWidth="2.1" strokeLinecap="round"/>
    </svg>
  ),
};

const MOODS = [
  { key: "happy", icon: <span style={{fontSize:"1.5em", color:"#19c687"}}>😊</span>, label:"Happy"},
  { key: "neutral", icon: <span style={{fontSize:"1.5em", color:"#2597ad"}}>😐</span>, label:"Neutral"},
  { key: "tired", icon: <span style={{fontSize:"1.5em", color:"#ffc488"}}>😑</span>, label:"Tired"},
  { key: "sad", icon: <span style={{fontSize:"1.5em", color:"#fa6b97"}}>😞</span>, label:"Sad"}
];

// Helper functions
const DEFAULT_HEIGHT = 1.66;
function round(v, d=1) { return v && !isNaN(Number(v)) ? (Math.round(v*10**d)/10**d) : "-"; }
function validNum(x) { return x !== null && x !== undefined && x !== "" && !isNaN(Number(x)); }
function fmt(v,unit) { return (validNum(v)) ? `${Number(v)}${unit? " "+unit:""}` : "-"; }

// Mapping for chart fields
const CHARTS = [
  { key: "bmi", label: "BMI", color: "var(--pc-turquoise)", unit: "", icon: ICONS.bmi },
  { key: "sleepHours", label: "Sleep", color: "#8B82FF", unit: "h", icon: ICONS.sleep_ok },
  { key: "water", label: "Water", color: "#0EC4B3", unit: "L", icon: ICONS.water },
  { key: "steps", label: "Steps", color: "#fb7171", unit: "", icon: ICONS.steps },
  { key: "heartRate", label: "Heart", color: "#ff4666", unit: "bpm", icon: ICONS.heart }
];

export default function HealthTrack() {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("health_entries")) || []; } catch { return []; }
  });

  const [form, setForm] = useState({
    weight: "", height: "",
    systolic: "", diastolic: "", heartRate: "",
    sleepHours: "", sleepQuality: 3,
    water: 1.5, steps: 0,
    mood: "neutral", notes: "",
  });

  const [selectedChart, setSelectedChart] = useState(CHARTS[0].key); // e.g. "bmi"

  function addEntry(e) {
    e.preventDefault();
    const entry = { id: Date.now(), date: new Date().toISOString(), ...form };
    setEntries(prev => [entry, ...prev]);
    setForm({ weight: "", height: "", systolic: "", diastolic: "", heartRate: "", sleepHours: "", sleepQuality: 3, water: 1.5, steps: 0, mood: "neutral", notes: "" });
  }

  useEffect(() => {
    localStorage.setItem("health_entries", JSON.stringify(entries));
  }, [entries]);

  const latest = entries[0] || form;
  const height = parseFloat(latest.height) > 0 ? parseFloat(latest.height) : DEFAULT_HEIGHT;
  const weight = parseFloat(latest.weight);
  const bmi = weight && height ? weight / (height * height) : null;
  const bmiFill = bmi && bmi >= 18.5 && bmi <= 24.9 ? 100 : bmi ? Math.max(0, Math.min(100, 85 - Math.abs((bmi - 21.7) * 9))) : 0;
  let bmiLabel = "-";
  if (bmi) bmiLabel = round(bmi,1);

  const sleepVal = parseFloat(latest.sleepHours);
  const sleepHappy = sleepVal && sleepVal >= 8;
  const metrics = [
    {
      key: "bmi", label: "BMI", icon: ICONS.bmi, value: bmiLabel,
      fill: bmiFill, color: "var(--pc-turquoise)"
    },
    {
      key: "sleepHours", label: "Sleep",
      icon: sleepHappy ? ICONS.sleep_ok : ICONS.sleep_bad,
      value: latest.sleepHours ? latest.sleepHours + " h" : "-",
      fill: latest.sleepHours ? Math.min(100, (sleepVal/8)*100) : 0,
      color: "#8B82FF"
    },
    {
      key: "water", label: "Water", icon: ICONS.water,
      value: latest.water ? round(latest.water,2) + " L" : "-",
      fill: latest.water ? Math.min(100, (parseFloat(latest.water)/2)*100) : 0,
      color: "#0EC4B3", fillType: "liquid"
    },
    {
      key: "steps", label: "Steps", icon: ICONS.steps,
      value: latest.steps ? fmt(latest.steps,"") : "0",
      fill: latest.steps ? Math.min(100, parseFloat(latest.steps)/8000*100) : 0,
      color: "#fb7171"
    },
    {
      key: "heartRate", label: "Heart", icon: ICONS.heart,
      value: latest.heartRate ? fmt(latest.heartRate,"bpm") : "-",
      fill: latest.heartRate ? Math.max(0, 100 - Math.abs(parseFloat(latest.heartRate)-70)*2) : 0,
      color: "#ff4666"
    }
  ];

  function selectChart(key) {
    setSelectedChart(key);
  }

  // ----------- CHART DATA -----------
  function getChartData(field) {
    if (field === "bmi") {
      return entries.slice(0, 30).reverse().map(e => {
        const w = Number(e.weight);
        const h = Number(e.height) || DEFAULT_HEIGHT;
        return w > 0 && h > 0 ? +(w / (h * h)).toFixed(1) : null;
      });
    }
    return entries.slice(0, 30).reverse().map(e => (typeof e[field] === "number" ? e[field] : Number(e[field]) || null));
  }

  // ----------- Recent Entries Table ---------
  function rowBMI(e) {
    const w = Number(e.weight)||0, h = Number(e.height)||DEFAULT_HEIGHT;
    return w>0 && h>0 ? round(w/(h*h),1) : "-";
  }
  function tableMood(m) {
    if (m==="happy") return <span className="table-mood table-mood-happy">😊</span>;
    if (m==="neutral") return <span className="table-mood table-mood-neutral">😐</span>;
    if (m==="tired") return <span className="table-mood table-mood-tired">😑</span>;
    if (m==="sad") return <span className="table-mood table-mood-sad">😞</span>;
    return "-";
  }

  function insights(){
    if (!latest.weight && !latest.sleepHours && !latest.water && !latest.steps && !latest.heartRate)
      return [{ text: 'No entries yet — add your first log.', level: 'info', icon: "ℹ️" }];
    const out = [];
    if (bmi && (bmi < 18.5 || bmi > 24.9)) out.push({ text: 'BMI not optimal (18.5–24.9)', level: 'warn', icon: "⚠️" });
    if (latest.water < 2) out.push({ text: 'Water intake below recommended (2L)', level: 'warn', icon: "💧" });
    if (latest.sleepHours && latest.sleepHours < 6) out.push({ text: 'Sleep less than 6 hours', level: 'warn', icon: "😴" });
    if (latest.systolic && latest.systolic >= 140) out.push({ text: 'High blood pressure—consult a specialist', level: 'danger', icon: "⚠️" });
    if (latest.steps && latest.steps >= 8000) out.push({ text: 'Great step count today!', level: 'good', icon: "✅" });
    if (out.length === 0) out.push({ text: 'All indicators are within a general healthy range', level: 'good', icon:"✅" });
    return out;
  }

  return (
    <div className="healthtrack-container" style={{paddingBottom:44, background: "var(--background-color, #eaf8fa)"}}>
      {/* --- HEADER --- */}
      <header className="ht-hero-header" style={{position:"relative", zIndex:10, textAlign:"center", paddingTop:46, paddingBottom:18}}>
        <h2 id="ht-hero-title" style={{
          fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginBottom:9, color:"var(--pc-dark, #18454a)"
        }}>
          Health Track — one continuous canvas
        </h2>
        <div className="small-muted" style={{fontSize:"1.18rem", marginBottom:2}}>
          A hybrid layout with floating metrics and flowing waves.<br/>
          <span style={{fontWeight:400, opacity:.8}}>No cards, just wellness flow.</span>
        </div>
        <GlassyWave />
      </header>

      {/* --- METRICS --- */}
      <section aria-labelledby="ht-overview" style={{display:'flex', alignItems:'end', gap:36, justifyContent:"center", marginTop:-32, marginBottom:40, position:"relative", zIndex:2, flexWrap:"wrap"}}>
        {metrics.map(m =>
          <MetricFillCircle key={m.key} {...m} />
        )}
      </section>

      {/* --- FORM --- */}
      <form onSubmit={addEntry} style={{maxWidth:520, margin:"0 auto", marginTop:12, marginBottom:36, zIndex:3, position:"relative", display: "grid", gap:10}}>
        <div style={{display: "grid", gap:10, gridTemplateColumns:"1fr 1fr"}}>
          <MetricInput label="Weight (kg)" name="weight" value={form.weight} onChange={e=>setForm(f=>({...f,weight:e.target.value}))}/>
          <MetricInput label="Height (m)" name="height" value={form.height} onChange={e=>setForm(f=>({...f,height:e.target.value}))}/>
          <MetricInput label="Sleep (h)" name="sleepHours" value={form.sleepHours} onChange={e=>setForm(f=>({...f,sleepHours:e.target.value}))}/>
          <MetricInput label="Water (L)" name="water" value={form.water} onChange={e=>setForm(f=>({...f,water:e.target.value}))}/>
        </div>
        <div style={{display: "grid", gap:10, gridTemplateColumns:"1fr 1fr"}}>
          <MetricInput label="Steps" name="steps" value={form.steps} onChange={e=>setForm(f=>({...f,steps:e.target.value}))}/>
          <MetricInput label="Heart (bpm)" name="heartRate" value={form.heartRate} onChange={e=>setForm(f=>({...f,heartRate:e.target.value}))}/>
        </div>
        {/* Mood SELECTOR */}
        <div style={{margin:"8px 0 5px"}}>
          <div style={{marginBottom:6, color:"var(--pc-turquoise)", fontWeight: 600, fontSize: "1.06em"}}>Mood</div>
          <div className="ht-mood-track">
            {MOODS.map(m => (
              <button type="button" key={m.key}
                className={"ht-mood-btn" + (form.mood === m.key ? " active" : "")}
                onClick={()=>setForm(f=>({...f, mood: m.key}))}
                tabIndex={0}
                aria-pressed={form.mood===m.key}
                title={m.label}
              >{m.icon}</button>
            ))}
          </div>
        </div>
        <button className="btn-primary" type="submit" style={{marginTop:14,minWidth:100}}>Add Entry</button>
      </form>

      {/* --- INSIGHTS PATH --- */}
      <section style={{maxWidth:530, margin:"0 auto", marginBottom:32}}>
        <h4 className="small-muted" style={{margin:"6px 0 5px"}}>Insights</h4>
        <InsightsPath items={insights()} />
      </section>

      {/* === LARGE CHART AREA === */}
      <section className="main-trend-chart-section">
        <div className="main-trend-chart-metric-tabs">
          {CHARTS.map(c => (
            <button key={c.key}
              className={"main-chart-tab-btn" + (selectedChart === c.key ? " active" : "")}
              onClick={() => selectChart(c.key)}
              title={c.label}
            >
              {c.icon}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
        <ChartArea
          label={CHARTS.find(c=>c.key===selectedChart)?.label}
          data={getChartData(selectedChart)}
          color={CHARTS.find(c=>c.key===selectedChart)?.color}
          unit={CHARTS.find(c=>c.key===selectedChart)?.unit}
          entries={entries}
        />
      </section>

      {/* --- ENHANCED TABLE --- */}
      <section className="recent-entries-section floating-table-wrap" style={{margin: "28px auto 38px", maxWidth: 900}}>
        <h4 className="small-muted recent-table-title">Recent Entries (Last 12 Days)</h4>
        <table className="recent-entries-table-ui">
          <thead>
            <tr>
              <th>Date</th>
              <th>BMI</th>
              <th>Sleep</th>
              <th>Water</th>
              <th>Steps</th>
              <th>Systolic</th>
              <th>Diastolic</th>
              <th>Heart</th>
              <th>Mood</th>
              <th className="recent-notes-head">Notes</th>
            </tr>
          </thead>
          <tbody>
            {entries.slice(0, 12).map((e, i) => (
              <tr key={e.id || i}>
                <td className="recent-date-cell">
                  {new Date(e.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </td>
                <td>{rowBMI(e)}</td>
                <td>{e.sleepHours ?? "-"}</td>
                <td>{e.water ?? "-"}</td>
                <td>{e.steps ?? "-"}</td>
                <td>{e.systolic ?? "-"}</td>
                <td>{e.diastolic ?? "-"}</td>
                <td>{e.heartRate ?? "-"}</td>
                <td>{tableMood(e.mood)}</td>
                <td className="recent-notes-cell">{e.notes?.slice(0, 40) || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <footer style={{marginTop:32, textAlign:"center", color:"var(--pc-turquoise,#1aa5ad)"}}>
        Made with ♥ — Health Track
      </footer>
    </div>
  );
}

// Floating circles for metrics
function MetricFillCircle({ label, icon, value, fill, color, fillType }) {
  const R = 42, C = 2*Math.PI*R;
  fill = Math.max(0, Math.min(100, isNaN(fill) ? 0 : fill));
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", minWidth:120}}>
      <div className="ht-metric-circBG">
        {fillType!=="liquid" ? (
          <svg width={92} height={92} style={{position:"absolute",left:0,top:0}}>
            <circle cx={46} cy={46} r={R} fill="none" stroke="#f2fcfa" strokeWidth="8"/>
            <circle
              cx={46} cy={46} r={R}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={`${C*fill/100} ${C*(1-fill/100)}`}
              strokeLinecap="round"
              transform="rotate(-90 46 46)"
              style={{transition:"stroke-dasharray 0.9s cubic-bezier(0.7,0.3,0.2,1.1)"}}
            />
          </svg>
        ) : (
          <svg width={92} height={92} style={{position:"absolute",left:0,top:0}}>
            <defs>
              <clipPath id="liqC">
                <circle cx={46} cy={46} r={41.5}/>
              </clipPath>
            </defs>
            <circle cx={46} cy={46} r={42.5} fill="#f7fdfd"/>
            <g clipPath="url(#liqC)">
              <rect x={0} y={92-(fill/100)*86-8} width={92} height={92} fill={color} opacity="0.18"/>
              <path d={
                (() => {
                  const y = 92-(fill/100)*86-8;
                  return `M0 ${y+9} Q27 ${y-7} 50 ${y+5} Q78 ${y+11} 92 ${y+9} V92 H0 Z`;
                })()
              } fill={color} opacity="0.32" />
            </g>
          </svg>
        )}
        <div style={{
          position: "absolute", left:"50%", top:"50%", transform: "translate(-50%,-50%)", zIndex:2, fontSize:38, color
        }}>{icon}</div>
      </div>
      <div style={{fontWeight:700, fontSize:"1.09em", letterSpacing:"0.01em"}}>
        {value}
      </div>
      <div className="small-muted" style={{fontSize:"1em"}}>{label}</div>
    </div>
  );
}

// The large/clean area chart (for one metric at a time)
function ChartArea({ label, data, color, unit }) {
  if (!data.length) return null;
  // Count actual points, ignore nulls
  const points = data.map((d,i) => ({x:i, y:typeof d === "number" ? d : null})).filter(d=>d.y!==null);
  const max = points.length ? Math.max(...points.map(d=>d.y)) : 1;
  const min = points.length ? Math.min(...points.map(d=>d.y)) : 0;
  // SVG path string
  const W = 380, H = 98;
  const pad = 25;
  const X = i => pad + i*(W-2*pad)/Math.max(1, data.length-1);
  const Y = y => H-pad - ((y-min)/Math.max(1,max-min))*(H-2*pad);

  // Path
  let path = "";
  data.forEach((y,i) => {
    if (y===null || y===undefined) return;
    path += (path===""?"M":"L")+`${X(i)},${Y(y)}`;
  });

  // Soft area fill
  let area = "";
  data.forEach((y,i) => {
    if (y===null || y===undefined) return;
    area += (area===""?"M":"L")+`${X(i)},${Y(y)}`;
  });
  if (area!=="") {
    area += `L${X(data.length-1)},${H-pad} L${X(0)},${H-pad} Z`;
  }
  return (
    <div className="main-trend-chart-area">
      <div className="main-trend-chart-title">{label} Trend</div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{
        display:'block',background:'none',overflow:"visible"
      }}>
        {/* Grid lines */}
        <g opacity={.13}>
          {[0,1,2,3,4].map(i=>
            <line key={i} x1={pad} x2={W-pad} y1={pad+i*(H-2*pad)/4} y2={pad+i*(H-2*pad)/4} stroke={color} strokeWidth="1"/>
          )}
        </g>
        {/* Area */}
        {area &&
          <path d={area} fill={color} opacity="0.10" />
        }
        {/* Line */}
        {path &&
          <path d={path} fill="none" stroke={color} strokeWidth="4.2" strokeLinejoin="round" strokeLinecap="round"
            style={{filter: `drop-shadow(0 5px 24px ${color}26)`}}
          />
        }
        {/* Dots */}
        {data.map((y,i)=>y==null?null:<circle key={i} cx={X(i)} cy={Y(y)} r={2.8} fill={color} opacity={0.7}/>)}
      </svg>
      <div className="main-trend-chart-axis">
        <span>{unit}</span>
        <span style={{flex:1}}/>
        <span style={{fontWeight:400, color:"#b2cecb"}}>Recent</span>
      </div>
    </div>
  );
}

function GlassyWave() {
  return (
    <svg viewBox="0 0 1560 80" width="100%" height={80} preserveAspectRatio="none" style={{display:'block'}} aria-hidden>
      <defs>
        <linearGradient id="wave-title-1" x1="0" y1="0" x2="1560" y2="80">
          <stop stopColor="#6be3fa" />
          <stop offset=".7" stopColor="#c7f6e8" />
        </linearGradient>
      </defs>
      <path d="M0,52 Q280,95 845,53 Q1260,14 1560,66 L1560,80 L0 80Z" fill="url(#wave-title-1)" opacity="1"/>
    </svg>
  );
}

function MetricInput({label, ...props}) {
  return (
    <label style={{display:"flex", flexDirection:"column", fontWeight:600, color:"var(--pc-turquoise,#0caea0)",fontSize:"1em"}}>
      <span style={{marginBottom:2, fontSize:"0.98em", fontWeight:500}}>{label}</span>
      <input {...props} type="number" className="healthtrack-input" style={{
        fontSize:"1.09em", border:"none", borderBottom:"2.3px solid var(--pc-turquoise,#14bab5)", outline:"none", padding:"8px 4px", marginBottom:2, background:"none"
      }}/>
    </label>
  );
}

function InsightsPath({ items }) {
  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"stretch", gap:9, marginTop:5}}>
      {items.map((it, idx) => (
        <div key={idx} style={{
          background: it.level==='danger' ? "#ffd7dc"
            : it.level==='warn' ? "#fffdeb"
            : it.level==='good' ? "#eafcf7"
            : "#ebf6fa",
          color: "#235366", borderRadius:18, padding:"6px 17px", fontWeight:600,
          display:"flex", alignItems:"center", gap:7, fontSize:"1.03em", boxShadow:"0 1.5px 8px #b4e3ef13"
        }}>
          <span style={{fontSize:"1.13em"}}>{it.icon}</span>
          <span style={{flex:1}}>{it.text}</span>
          {idx < items.length-1 && <span style={{margin:"0 4px", color:"#0caea0a8", fontSize:"1.3em"}}>&rarr;</span>}
        </div>
      ))}
    </div>
  );
}