import { DemoVideoModalTranslations } from './features/DemoVideoWidget/components/DemoVideoModal/DemoVideoModal'
import { mergeNestedObjects } from './utils/nestedObjects'

export interface WidgetTranslations {
  triggerButton: string
  modal: DemoVideoModalTranslations
}

const DEFAULT_TRANSLATIONS: WidgetTranslations = {
  // emailForm: {
  //   gateTitle: 'Se resten av demoen',
  //   gateDescription:
  //     'Se hvordan salonger får full kontroll, sparer tid og skaper ny motivasjon i teamet.',
  //   formErrors: {
  //     emailRequired: 'E-post er påkrevet',
  //     emailInvalid: 'E-posten er ugyldig',
  //     nameRequired: 'Navn er påkrevd',
  //     roleRequired: 'Rolle er påkrevd'
  //   },
  //   roles: [
  //     ['owner', 'Eier'],
  //     ['manager', 'Manager'],
  //     ['employee', 'Ansatt']
  //   ],
  //   emailLabel: 'E-post',
  //   emailPlaceholder: 'Din e-post',
  //   nameLabel: 'Salong',
  //   namePlaceholder: 'Navn på salong',
  //   roleLabel: 'Rolle',
  //   rolePlaceholder: 'Hva beskriver deg best?',
  //   submitButton: 'Se hele demoen',
  //   submitLoading: 'Laster...',
  //   closeButton: 'Ikke nå',
  //   successMessage: 'Demovideo sendt!',
  //   errorMessage: 'Kunne ikke sende demovideo. Vennligst prøv igjen.'
  // }
  triggerButton: 'Se demo',
  modal: {
    dividerLabel: 'ELLER',
    madStart: {
      title: 'Jeg er klar for MAD',
      subtitle: 'Kom i gang på få minutter.',
      features: ['Gratis første måned', 'Ingen bindingstid'],
      buttonText: 'Start med MAD',
      signupUrl: 'https://www.madsoftware.no/prov-gratis'
    },
    calendar: {
      title: 'Ønsker du mer informasjon?',
      description: 'Book en uforpliktende\n gjennomgang av MAD.',
      buttonText: 'Book gjennomgang'
    }
  }
}

const initializeT = (t: Partial<WidgetTranslations> = {}) => {
  return mergeNestedObjects<WidgetTranslations>(DEFAULT_TRANSLATIONS, t)
}

export default initializeT
