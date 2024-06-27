import { z } from 'zod'

export const ContatoFormSchema = z.object({
  c_name: z
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
  c_email: z
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
  c_phone: z
    .string()
    .min(11, { message: 'Número de telefone invalido' })
    .nonempty('Telefone é obrigatorio'),
  c_message: z
    .string({ required_error: 'Mensagem é obrigatoria' })
    .min(15, { message: 'Mensagem é obrigatoria' }),
  c_termos: z.boolean().refine((val) => val === true, {
    message: 'Você deve concordar com os termos e condições.'
  })
})
