import React from 'react'

interface FormLayoutProps {
  children: React.ReactNode
  head: React.ReactNode
  actions: React.ReactNode
  t: {
    formImage: string
  }
}

const FormLayout: React.FC<FormLayoutProps> = ({
  children,
  head,
  actions,
  t: { formImage }
}) => {
  return (
    <div className="form-layout">
      <div className="form-wrapper">
        {head}
        <div>{children}</div>
        {actions}
      </div>
      <div className="form-image-wrapper">
        <img
          style={{ aspectRatio: '1 / 1', width: '100%' }}
          alt="MAD Registration Illustration"
          src={formImage}
        />
      </div>
    </div>
  )
}

export default FormLayout
