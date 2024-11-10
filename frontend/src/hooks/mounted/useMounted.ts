import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook that determines if the component is currently mounted.
 *
 * @returns A function that returns a boolean value indicating whether the
 *   component is mounted.
 */
export function useMounted(): () => boolean {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback(() => mounted.current, [])
}
