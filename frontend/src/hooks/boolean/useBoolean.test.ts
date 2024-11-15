import { act, renderHook } from '@testing-library/react'

import { useBoolean } from './useBoolean'

describe('useBoolean()', () => {
  it('should use boolean', () => {
    const { result } = renderHook(() => useBoolean())

    expect(result.current.value).toBe(false)
    expect(typeof result.current.setTrue).toBe('function')
    expect(typeof result.current.setFalse).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.setValue).toBe('function')
  })

  it('should default value works (1)', () => {
    const { result } = renderHook(() => useBoolean(true))

    expect(result.current.value).toBe(true)
  })

  it('should default value works (2)', () => {
    const { result } = renderHook(() => useBoolean(false))

    expect(result.current.value).toBe(false)
  })

  it('should set to true (1)', () => {
    const { result } = renderHook(() => useBoolean(false))

    act(() => {
      result.current.setTrue()
    })

    expect(result.current.value).toBe(true)
  })

  it('should set to true (2)', () => {
    const { result } = renderHook(() => useBoolean(false))

    act(() => {
      result.current.setTrue()
      result.current.setTrue()
    })

    expect(result.current.value).toBe(true)
  })

  it('should set to false (1)', () => {
    const { result } = renderHook(() => useBoolean(true))

    act(() => {
      result.current.setFalse()
    })

    expect(result.current.value).toBe(false)
  })

  it('should set to false (2)', () => {
    const { result } = renderHook(() => useBoolean(true))

    act(() => {
      result.current.setFalse()
      result.current.setFalse()
    })

    expect(result.current.value).toBe(false)
  })

  it('should toggle value', () => {
    const { result } = renderHook(() => useBoolean(true))

    act(() => {
      result.current.toggle()
    })

    expect(result.current.value).toBe(false)
  })

  it('should toggle value from prev using setValue', () => {
    const { result } = renderHook(() => useBoolean(true))

    act(() => {
      result.current.setValue((x) => !x)
    })

    expect(result.current.value).toBe(false)
  })

  it('should throw an error', () => {
    const nonBoolean = '' as never
    vi.spyOn(console, 'error').mockImplementation(() => vi.fn())
    expect(() => {
      renderHook(() => useBoolean(nonBoolean))
    }).toThrowError(/defaultValue must be `true` or `false`/)
    vi.resetAllMocks()
  })
})
