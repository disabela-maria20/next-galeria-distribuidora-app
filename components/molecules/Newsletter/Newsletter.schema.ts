import { z } from 'zod'

export const NewsletterFormSchema = z.object({
  n_name: z
    .string()
    .min(3, { message: 'A qualidade de caracteres minimas é 3' })
    .nonempty({ message: 'O nome é obrigatório' })
    .transform((name) =>
      name
        .trim()
        .split(' ')
        .map((data) => {
          return data[0].toLocaleUpperCase().concat(data.substring(1))
        })
        .join(' ')
    ),
  n_email: z
    .string()
    .email('Formato de e-mail invalido')
    .toLowerCase()
    .nonempty('O e-mail é obrigatório')
    .refine(
      (value: string) => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/.test(value),
      {
        message: 'Endereço de e-mail invalido'
      }
    ),
  n_phone: z
    .string()
    .min(11, { message: 'Número de telefone invalido' })
    .nonempty('Telefone é obrigatorio'),
  n_termos: z.boolean().refine((val) => val === true, {
    message: 'Você deve concordar com os termos e condições.'
  })
})
