const replaceVariablesInTranslations = (
  t: string,
  variables: Record<string, string>
): string => {
  return Object.entries(variables).reduce((text, [key, value]) => {
    return text.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }, t)
}

export default replaceVariablesInTranslations
