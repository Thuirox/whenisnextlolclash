import useDemo from "../hooks/useDemo"

function DemoIndicator() {
  const { unsetDemo } = useDemo()

  return (
    <div style={{
      padding: '10px',
      position: 'absolute',
      top: 0,
      right: '10px',

      zIndex: 11,

      opacity: 0.7,

      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }} onClick={() => {
      unsetDemo()
    }}>
      DEMO
    </div>
  )
}

export default DemoIndicator
