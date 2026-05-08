import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, Flame, Heart, Leaf, Moon, Shield, Sun, Wind } from "lucide-react";

const growthQuotes = [
  "A calm person was once full of storms.",
  "A kind person was once learning how not to hurt.",
  "A humble person was once fighting their ego.",
  "A hard-working person was once learning discipline.",
  "Your mistakes did not erase you. They helped shape you.",
  "You are not stuck as who you used to be."
];

const paths = [
  { name: "Peace", icon: Leaf, mission: "Pause before reacting once today." },
  { name: "Self-Love", icon: Heart, mission: "Say one thing to yourself that you would say to a friend." },
  { name: "Discipline", icon: Flame, mission: "Do one hard thing for 10 minutes." },
  { name: "Humility", icon: Shield, mission: "Admit one truth without making excuses." }
];

const moods = ["Amazing", "Calm", "Okay", "Stressed", "Heavy"];

function Button({ children, className = "", onClick }) {
  return <button onClick={onClick} className={`btn ${className}`}>{children}</button>;
}

function Card({ children, className = "" }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export default function App() {
  const [mood, setMood] = useState("Calm");
  const [completed, setCompleted] = useState([]);
  const [situation, setSituation] = useState("");
  const [journal, setJournal] = useState("");

  const quote = useMemo(() => growthQuotes[new Date().getDate() % growthQuotes.length], []);
  const xp = completed.length * 125 + (journal.length > 10 ? 100 : 0) + (situation.length > 10 ? 75 : 0);

  const toggle = (name) => {
    setCompleted((prev) => prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]);
  };

  const responseCoach = situation.trim().length > 0
    ? "Pause. Breathe. Ask: what response would make me proud tomorrow? Try answering with honesty, calmness, and no insult."
    : "Write what happened, then let the app guide you toward a calmer response.";

  return (
    <div className="app">
      <div className="sunset-bg" />
      <div className="green-overlay" />
      <div className="grass" />

      <main className="content">
        <nav className="nav">
          <div className="brand">
            <div className="brand-icon"><Leaf /></div>
            <div>
              <h1>PeaceBloom</h1>
              <p>Become peaceful. Become loving. Become disciplined.</p>
            </div>
          </div>
          <div className="streak">
            <Flame />
            <span>12 Day Streak</span>
            <b>{xp} XP</b>
          </div>
        </nav>

        <section className="hero">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="hero-text">
            <div className="pill"><Sun size={18} /> Today’s sunrise lesson</div>
            <h2>Choose peace today. Choose yourself, always.</h2>
            <p>{quote}</p>
            <div className="actions">
              <Button className="primary">Start Your Day</Button>
              <Button className="secondary">Emergency Calm</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="companion">
            <div className="companion-glow" />
            <div className="companion-grass" />
            <div className="dog">🐕‍🦺</div>
            <div className="rose">🌹</div>
            <div className="companion-text">
              <h3>Your companion waits in the field.</h3>
              <p>Every peaceful choice makes your world greener.</p>
            </div>
          </motion.div>
        </section>

        <section className="moods">
          {moods.map((m) => (
            <button key={m} onClick={() => setMood(m)} className={mood === m ? "mood selected" : "mood"}>
              <span>{m === "Amazing" ? "😄" : m === "Calm" ? "😌" : m === "Okay" ? "🙂" : m === "Stressed" ? "😟" : "🌧️"}</span>
              <b>{m}</b>
            </button>
          ))}
        </section>

        <section className="paths">
          {paths.map(({ name, icon: Icon, mission }) => (
            <Card key={name}>
              <Icon className="path-icon" />
              <h3>{name}</h3>
              <p>{mission}</p>
              <Button onClick={() => toggle(name)} className={completed.includes(name) ? "done" : "secondary full"}>
                {completed.includes(name) ? <CheckCircle2 size={18} /> : null}
                {completed.includes(name) ? "Completed" : "Mark Done"}
              </Button>
            </Card>
          ))}
        </section>

        <section className="bottom-grid">
          <Card>
            <div className="card-title"><Wind /><h3>Respond, Don’t React</h3></div>
            <p className="muted">What happened?</p>
            <textarea value={situation} onChange={(e) => setSituation(e.target.value)} placeholder="Example: Someone said something that made me angry..." />
            <div className="coach">{responseCoach}</div>
          </Card>

          <Card>
            <div className="card-title"><BookOpen /><h3>Evening Reflection</h3></div>
            <p className="muted">What did you learn about yourself today?</p>
            <textarea value={journal} onChange={(e) => setJournal(e.target.value)} placeholder="Today I learned..." />
            <div className="moon"><Moon /> End your day with peace, not perfection.</div>
          </Card>
        </section>
      </main>
    </div>
  );
}
