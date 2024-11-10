import { renderHook } from '@testing-library/react'
import React from 'react'
import { useId } from './useId'

describe('useId', () => {
  test('should return the provided id if passed', () => {
    const { result } = renderHook(() => useId('custom-id'))
    expect(result.current).toBe('custom-id')
  })

  test('should return a unique id from React.useId if no id is provided', () => {
    const mockGeneratedId = 'generated-id'
    vi.spyOn(React, 'useId').mockReturnValue(mockGeneratedId)

    const { result } = renderHook(() => useId())
    expect(result.current).toBe(mockGeneratedId)
  })

  test('should prioritize provided id over React.useId', () => {
    const mockGeneratedId = 'generated-id'
    vi.spyOn(React, 'useId').mockReturnValue(mockGeneratedId)

    const { result } = renderHook(() => useId('custom-id'))
    expect(result.current).toBe('custom-id')
  })
})
