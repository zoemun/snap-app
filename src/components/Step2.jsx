import { Check, ChevronLeft } from 'lucide-react'

const TARGET = 5

export default function Step2({ goals, selected, setSelected, onNext, onBack }) {
  const filledGoals = goals.map((g, i) => ({ text: g, idx: i })).filter(g => g.text.trim())

  function toggle(i) {
    if (selected.includes(i)) {
      setSelected(prev => prev.filter(s => s !== i))
    } else {
      if (selected.length >= TARGET) return
      setSelected(prev => [...prev, i])
    }
  }

  const canNext = selected.length === TARGET

  return (
    <>
      <div className="progress-bar">
        {[1, 2, 3].map(n => (
          <div key={n} className={`progress-segment ${n <= 2 ? 'active' : ''}`} />
        ))}
      </div>

      <div className="page-header">
        <div className="step-label">2단계</div>
        <h1>진짜 중요한 5개만 고르세요</h1>
        <p>딱 5개만 골라야 합니다. 정말 중요한 것만요.</p>
      </div>

      <div className="select-header">
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          목록 {filledGoals.length}개
        </span>
        <span className="counter-chip">
          {selected.length}/{TARGET} 선택
        </span>
      </div>

      <div className="scroll-content">
        <div className="goals-select-list">
          {filledGoals.map(({ text, idx }) => {
            const isSelected = selected.includes(idx)
            const isDisabled = !isSelected && selected.length >= TARGET

            return (
              <button
                key={idx}
                className={`goal-select-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => toggle(idx)}
                disabled={isDisabled}
              >
                <div className="checkbox">
                  {isSelected && <Check size={13} color="#0A0A0A" strokeWidth={3} />}
                </div>
                <span className="goal-text">{text}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="bottom-bar">
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canNext}
        >
          {canNext ? '결과 확인하기' : `${TARGET - selected.length}개 더 선택하세요`}
        </button>
        <button className="btn-ghost" onClick={onBack}>
          <ChevronLeft size={16} style={{ display: 'inline', marginRight: 4 }} />
          목표 수정하기
        </button>
      </div>
    </>
  )
}
