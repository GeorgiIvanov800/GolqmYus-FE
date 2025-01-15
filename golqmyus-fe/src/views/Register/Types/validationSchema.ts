import { z } from 'zod'
const userSchema = z
  .object({
    email: z.string().email('Invalid email address.'),
    firstName: z.string().min(1, 'First Name is required.'),
    lastName: z.string().min(1, 'Last Name is required.'),
    username: z.string().min(6, 'Username must be at least 6 characters.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    confirmPassword: z.string().min(6, 'Confirm Password is required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'], // Attach the error to the confirmPassword field
  })
export default userSchema
