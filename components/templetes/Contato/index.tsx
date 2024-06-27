/* eslint-disable no-constant-condition */
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Style from './Contato.module.scss'

import { ContatoFormSchema } from './Contato.schema'

import { Model } from '@/components/molecules'
import { Phone } from '@/utils/hooks/useMask'
import { useGtag } from '@/utils/lib/gtag'
import { postContact } from '@/utils/server/requests'
import { zodResolver as ResolverZod } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { z } from 'zod'

export type IContatoForm = z.infer<typeof ContatoFormSchema>

const Contato = () => {
  const [loaging, setLoaging] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [viewSuccess, setViewSuccess] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, disabled }
  } = useForm<IContatoForm>({
    resolver: ResolverZod(ContatoFormSchema)
  })

  const { dataLayerContato } = useGtag()

  const onSubmit = async (data: IContatoForm) => {
    if (!data.c_termos) return
    setLoaging(true)
    try {
      const res = await postContact(
        data.c_name,
        data.c_email,
        data.c_phone,
        data.c_message
      )
      if (res.data.done) {
        setModal(true)
        setViewSuccess(true)
        dataLayerContato('Contato', 'Contato')
        reset()
      }
    } catch (error) {
      const err = error as AxiosError
      if (err.response?.status != 200) {
        setError(true)
        setViewSuccess(false)
      }
    } finally {
      setError(false)
      setLoaging(false)
    }
  }
  return (
    <>
      <section className={Style.areaContato}>
        <div className="container">
          <div className={Style.gridContato}>
            <div>
              <h1>FALE CONOSCO</h1>
              <p>
                Gostaria de tirar alguma dúvida sobre os nossos filmes, eventos
                ou dar alguma sugestão? <strong> Este é o lugar certo!</strong>
              </p>
              <form
                className={Style.areaFormContato}
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="" className={Style.inputContato1}>
                  <input
                    type="text"
                    placeholder="Nome"
                    id="c_name"
                    {...register('c_name')}
                  />
                  {errors.c_name && (
                    <small className="text-error">
                      {errors.c_name.message}
                    </small>
                  )}
                </label>
                <label htmlFor="" className={Style.inputContato2}>
                  <input
                    type="text"
                    placeholder="Telefone"
                    {...register('c_phone')}
                    onChange={(e) =>
                      ((e.target as HTMLInputElement).value = Phone(
                        (e.target as HTMLInputElement).value
                      ))
                    }
                  />
                  {errors.c_phone && (
                    <small className="text-error">
                      {errors.c_phone.message}
                    </small>
                  )}
                </label>
                <label htmlFor="" className={Style.inputContato3}>
                  <input
                    type="text"
                    placeholder="E-mail"
                    {...register('c_email')}
                  />
                  {errors.c_email && (
                    <small className="text-error">
                      {errors.c_email.message}
                    </small>
                  )}
                </label>
                <label htmlFor="" className={Style.inputContato4}>
                  <textarea
                    id=""
                    rows={30}
                    placeholder="Mensagem"
                    {...register('c_message')}
                  ></textarea>
                  {errors.c_message && (
                    <small className="text-error">
                      {errors.c_message.message}
                    </small>
                  )}
                </label>

                <div className={Style.inputContato5}>
                  <h2>VOCÊ AMA CINEMA?</h2>
                  <p style={{ fontWeight: '600' }}>Aproveite!</p>
                  <p>
                    Marque a caixinha e fique por dentro das nossas novidades,
                    ações promocionais dos filmes e descontos exclusivos!
                  </p>
                  <div className={Style.areaLabel}>
                    <label className={Style.aceite}>
                      <input type="checkbox" {...register('c_termos')} />
                      Aceito receber as novidades da Galeria Distribuidora
                      Brasil
                    </label>
                    {errors.c_termos && (
                      <small className="text-error">
                        {errors.c_termos.message}
                      </small>
                    )}
                  </div>

                  <div className={Style.areaFlexBtnContato}>
                    <button type="submit" disabled={disabled}>
                      {loaging ? 'Carregando' : 'Enviar'}
                    </button>
                    <Link href="/politica-de-privacidade">
                      Política de Privacidade
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <h2>
                LOCALIZAÇÃO <span>Sede Brasil - São Paulo</span>
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.7020640297774!2d-46.698946023877!3d-23.543215960927256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce57c4f708c27f%3A0x6d98d9e081a24dcd!2sR.%20Or%C3%B3s%2C%20311%20-%20Sumarezinho%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005442-020!5e0!3m2!1spt-BR!2sbr!4v1710954455623!5m2!1spt-BR!2sbr"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {modal && (
        <Model.Root>
          <Model.Body setOpen={() => setModal(!modal)}>
            <Model.Title>
              {viewSuccess && 'ENVIADO COM SUCESSO'}
              {error && 'PREENCHA AS INFORMAÇÕES CORRETAMENTE'}
            </Model.Title>
            <Model.Content>
              {viewSuccess && (
                <div className={Style.newsletterPopUpTermos}>
                  <p>Logo entraremos em contato.</p>
                  <div className={Style.newsletterPopUpTermosFlex}>
                    <button onClick={() => setModal(!modal)}>Fechar</button>
                  </div>
                </div>
              )}
              {error && (
                <div className={Style.newsletterPopUpTermos}>
                  <p>Preencha corretamnte as infomações</p>
                  <div className={Style.newsletterPopUpTermosFlex}>
                    <button onClick={() => setModal(!modal)}>Fechar</button>
                  </div>
                </div>
              )}
            </Model.Content>
          </Model.Body>
        </Model.Root>
      )}
    </>
  )
}

export default Contato
