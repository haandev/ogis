import React from 'react'

/**
 * A custom hook that generates a unique ID using `React.useId()` if no ID is provided.
 *
 * @param id - If provided, this ID will be returned.
 * @returns A unique or provided ID.
 */
export function useId(id?: string): string {
  const generatedId = React.useId()

  return id || generatedId
}
