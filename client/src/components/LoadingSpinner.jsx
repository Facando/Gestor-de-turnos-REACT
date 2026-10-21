function LoadingSpinner({ text = 'Cargando...' }) {
  return (
    <div className="spinner-wrapper">
      <div className="spinner"></div>
      <p>{text}</p>
    </div>
  )
}

export default LoadingSpinner
