import styles from './styles/index.css'

export function createTemplate() {
  const template = document.createElement('template')

  template.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,400,700&display=swap">
    <style>${styles.toString()}</style>
  `

  return template
}
