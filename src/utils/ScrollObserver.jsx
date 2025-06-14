import { useEffect, useState } from 'react'

// Hook for triggering animations when elements come into view
export const useScrollObserver = (options = {}) => {
  const [elements, setElements] = useState([])
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries)
    }, options)

    elements.forEach(el => observer.observe(el))

    return () => {
      elements.forEach(el => observer.unobserve(el))
    }
  }, [elements, options])

  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, [entries])

  return setElements
}

// Component for wrapping elements that should animate on scroll
const ScrollObserver = ({ children, className, threshold = 0.1, delay = 0 }) => {
  const [ref, setRef] = useState(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, delay)
        }
      })
    }, { threshold })
    
    if (ref) observer.observe(ref)
    
    return () => {
      if (ref) observer.unobserve(ref)
    }
  }, [ref, threshold, delay])
  
  return (
    <div 
      ref={setRef} 
      className={className}
    >
      {children}
    </div>
  )
}

export default ScrollObserver