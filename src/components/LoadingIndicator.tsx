
function LoadingIndicator() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#333',
      fontSize: '16px'
    }}>
      Loading...
    </div>
  )
}

export default LoadingIndicator
