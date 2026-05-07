import { useState, useEffect } from 'react'
import './index.css'
import Home from './components/Home'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'

const STORAGE_KEY = 'snap-priorities'

function App() {
  const [screen, setScreen] = useState('home')
  const [goals, setGoals] = useState([])
  const [selected, setSelected] = useState([])
  const [saved, setSaved] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setSaved(JSON.parse(stored))
  }, [])

  function handleSave() {
    const topFive = selected.map(i => goals[i])
    const avoidList = goals.filter((_, i) => !selected.includes(i))
    const data = { goals, topFive, avoidList, savedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setSaved(data)
    setScreen('home')
    setGoals([])
    setSelected([])
  }

  function handleReset() {
    setGoals([])
    setSelected([])
    setScreen('step1')
  }

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <Home saved={saved} onStart={() => setScreen('step1')} onReset={handleReset} />
      )}
      {screen === 'step1' && (
        <Step1
          goals={goals}
          setGoals={setGoals}
          onNext={() => setScreen('step2')}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'step2' && (
        <Step2
          goals={goals}
          selected={selected}
          setSelected={setSelected}
          onNext={() => setScreen('step3')}
          onBack={() => setScreen('step1')}
        />
      )}
      {screen === 'step3' && (
        <Step3
          goals={goals}
          selected={selected}
          onSave={handleSave}
          onBack={() => setScreen('step2')}
        />
      )}
    </div>
  )
}

export default App
