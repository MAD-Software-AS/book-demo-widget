import React from 'react'

interface CompanyRegistrationHeaderProps {
  subtitle?: string
}

const CompanyRegistrationHeader: React.FC<CompanyRegistrationHeaderProps> = ({
  subtitle
}) => {
  return <span className="subtitle text-center">{subtitle}</span>
}

export default CompanyRegistrationHeader
