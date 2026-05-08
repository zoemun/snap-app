import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MAX_GOALS = 25
const MIN_GOALS = 6

export default function Step1({ goals, setGoals, onNext, onBack }) {
  const [current, setCurrent] = useState(() => {
    const lastFilled = goals.findLastIndex(g => g.trim())
    return lastFilled >= 0 ? lastFilled : 0
  })
  const inputRef = useRef(null)
  const navigatingRef = useRef(false)

  useEffect(() => {
    if (goals.length === 0) {
      setGoals([''])
    }
  }, [])

  useEffect(() => {
    navigatingRef.current = false
    inputRef.current?.focus()
  }, [current])

  const filledCount = goals.filter(g => g.trim()).length
  const canNext = filledCount >= MIN_GOALS
  const currentValue = goals[current] || ''
  const isCurrentFilled = currentValue.trim().length > 0

  function goNext() {
    if (!isCurrentFilled || navigatingRef.current) return
    navigatingRef.current = true
    if (current + 1 >= goals.length) {
      if (goals.length < MAX_GOALS) {
        setGoals(prev => [...prev, ''])
      }
    }
    setCurrent(prev => Math.min(prev + 1, MAX_GOALS - 1))
  }

  function goPrev() {
    if (current > 0) setCurrent(prev => prev - 1)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.repeat && !e.nativeEvent.isComposing) {
      e.preventDefault()
      goNext()
    }
  }

  function updateCurrent(val) {
    setGoals(prev => prev.map((g, i) => i === current ? val : g))
  }

  return (
    <>
      <div className="progress-bar">
        {[1, 2, 3].map(n => (
          <div key={n} className={`progress-segment ${n <= 1 ? 'active' : ''}`} />
        ))}
      </div>

      <div className="page-header">
        <div className="step-label">1단계</div>
        <h1>이루고 싶은 목표가<br />무엇인가요?</h1>
        <p>모두 적어보세요!</p>
      </div>

      <div className="card-input-area">
        <div className="card-step-count-inline">
          <span className="card-step-num">{current + 1}</span>
          <span className="card-step-total">/ {MAX_GOALS}</span>
        </div>
        <input
          ref={inputRef}
          className="card-input"
          type="text"
          value={currentValue}
          placeholder="목표를 입력하세요"
          onChange={e => updateCurrent(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <div className="card-nav">
          <button
            className="card-nav-btn"
            onClick={goPrev}
            disabled={current === 0}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="card-nav-btn"
            onClick={goNext}
            disabled={!isCurrentFilled}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="card-pills">
        {goals.map((g, i) => (
          <button
            key={i}
            className={`card-pill ${i === current ? 'active' : ''} ${g.trim() ? 'filled' : ''}`}
            onClick={() => setCurrent(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="bottom-bar">
        {canNext ? (
          <button className="btn-primary" onClick={onNext}>
            {filledCount}개 작성 완료 — 다음
          </button>
        ) : (
          <p className="card-hint">
            {MIN_GOALS - filledCount}개 더 작성하면 다음으로 넘어갈 수 있어요
          </p>
        )}
        <button className="btn-ghost" onClick={onBack}>
          <ChevronLeft size={16} style={{ display: 'inline', marginRight: 4 }} />
          돌아가기
        </button>
      </div>
    </>
  )
}
