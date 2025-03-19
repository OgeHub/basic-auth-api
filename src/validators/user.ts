import { z } from 'zod'

// Validates user update data
export const validateUpdateUserData = (data: object) => {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    age: z.number().optional(),
  })

  return schema.parse(data)
}
