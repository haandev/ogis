import { renderHook } from '@testing-library/react'
import { useMounted } from './useMounted'

describe('useMounted()', () => {
  test('should return true when component is mounted', () => {
    const { result } = renderHook(() => useMounted())

    expect(result.current()).toBe(true)
  })

  test('should return false when component is unmounted', () => {
    const { result, unmount } = renderHook(() => useMounted())

    unmount()

    expect(result.current()).toBe(false)
  })
})
