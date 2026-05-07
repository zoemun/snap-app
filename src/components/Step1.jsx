import { useRef } from 'react'
import { Plus, X, ChevronLeft } from 'lucide-react'

const MAX_GOALS = 25
const MIN_GOALS = 6

export default function Step1({ goals, setGoals, onNext, onBack }) {
  const inputRefs = useRef([])

  function addGoal() {
    if (goals.length >= MAX_GOALS) return
    setGoals(prev => [...prev, ''])
    setTimeout(() => {
      inputRefs.current[goals.length]?.focus()
    }, 50)
  }

  function updateGoal(i, val) {
    setGoals(prev => prev.map((g, idx) => idx === i ? val : g))
  }

  function removeGoal(i) {
    setGoals(prev => prev.filter((_, idx) => idx !== i))
  }

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (i === goals.length - 1 && goals.length < MAX_GOALS) {
        addGoal()
      } else {
        inputRefs.current[i + 1]?.focus()
      }
    }
    if (e.key === 'Backspace' && goals[i] === '' && goals.length > 1) {
      e.preventDefault()
      removeGoal(i)
      setTimeout(() => inputRefs.current[i - 1]?.focus(), 0)
    }
  }

  const filledGoals = goals.filter(g => g.trim()).length
  const canNext = filledGoals >= MIN_GOALS

  return (
    <>
      <div className="progress-bar">
        {[1, 2, 3].map(n => (
          <div key={n} className={`progress-segment ${n <= 1 ? 'active' : ''}`} />
        ))}
      </div>

      <div className="page-header">
        <div className="step-label">1단계</div>
        <h1>하고 싶은 게 많은 당신!</h1>
        <p>여기에 모두 적어보세요.</p>
      </div>

      <div className="scroll-content">
        {goals.length > 0 && (
          <div className="goals-list">
            {goals.map((goal, i) => (
              <div key={i} className="goal-input-wrap">
                <span className="goal-num">{i + 1}</span>
                <input
                  ref={el => inputRefs.current[i] = el}
                  className="goal-input"
                  type="text"
                  value={goal}
                  placeholder="목표를 입력하세요"
                  onChange={e => updateGoal(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(e, i)}
                  autoFocus={i === goals.length - 1 && goals.length === 1}
                />
                {goals.length > 1 && (
                  <button className="goal-delete-btn" onClick={() => removeGoal(i)}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {goals.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 14, paddingTop: 20, textAlign: 'center' }}>
            아래 버튼을 눌러 목표를 추가해보세요
          </p>
        )}

        <button
          className="add-goal-btn"
          onClick={addGoal}
          disabled={goals.length >= MAX_GOALS}
        >
          <Plus size={16} />
          목표 추가 {goals.length}/{MAX_GOALS}
        </button>

        {goals.length > 0 && (
          <p className="goal-count-hint">
            {filledGoals < MIN_GOALS
              ? <><span>{MIN_GOALS - filledGoals}개</span> 더 추가하면 다음으로 넘어갈 수 있어요</>
              : <><span>{filledGoals}개</span> 작성 완료 ✓</>
            }
          </p>
        )}
      </div>

      <div className="bottom-bar">
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canNext}
        >
          다음
        </button>
        <button className="btn-ghost" onClick={onBack}>
          <ChevronLeft size={16} style={{ display: 'inline', marginRight: 4 }} />
          돌아가기
        </button>
      </div>
    </>
  )
}
