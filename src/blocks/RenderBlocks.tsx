import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { EventHeroBlock } from '@/blocks/EventHero/Component'
import { StatsBlockComponent } from '@/blocks/StatsBlock/Component'
import { BentoGridBlock } from '@/blocks/BentoGrid/Component'
import { HighlightsBlockComponent } from '@/blocks/HighlightsBlock/Component'
import { SpeakersBlock } from '@/blocks/SpeakersBlock'
import { SpeakerHighlightBlockComponent } from '@/blocks/SpeakerHighlightBlock/Component'
import { ProgramBlockComponent } from '@/blocks/ProgramBlock/Component'
import { PartnersBlock } from '@/blocks/PartnersBlock'
import { PromoBannerBlockComponent } from '@/blocks/PromoBannerBlock/Component'
import { PressBlock } from '@/blocks/PressBlock'
import { PageBannerBlockComponent } from '@/blocks/PageBannerBlock/Component'
import { GalleryBlockComponent } from '@/blocks/GalleryBlock/Component'
import { FullSpeakersBlock } from '@/blocks/FullSpeakersBlock'
import { TextCardBlockComponent } from '@/blocks/TextCardBlock/Component'
import { EventHighlightsBlockComponent } from '@/blocks/EventHighlightsBlock/Component'
import { AboutBlockComponent } from '@/blocks/AboutBlock/Component'
import { EventAgendaBlockComponent } from '@/blocks/EventAgendaBlock/Component'
import { PartnersGridBlock as PartnersGridBlockComponent } from '@/blocks/PartnersGridBlock'
import { PartnerCtaBlockComponent } from '@/blocks/PartnerCtaBlock/Component'
import { AllPostsBlock as AllPostsBlockComponent } from '@/blocks/AllPostsBlock'
import { VenueHeroBlockComponent } from '@/blocks/VenueHeroBlock/Component'
import { VenueBentoBlockComponent } from '@/blocks/VenueBentoBlock/Component'
import { FullWidthImageBlockComponent } from '@/blocks/FullWidthImageBlock/Component'
import { LocationBlockComponent } from '@/blocks/LocationBlock/Component'
import { PartnerFormBlockComponent } from '@/blocks/PartnerFormBlock/Component'
import { ContactBlockComponent } from '@/blocks/ContactBlock/Component'
import { AllPressBlock as AllPressBlockComponent } from '@/blocks/AllPressBlock'
import { CtaButtonBlockComponent } from '@/blocks/CtaButtonBlock/Component'
import { CtaBannerBlockComponent } from '@/blocks/CtaBannerBlock/Component'
import { FAQBlockComponent } from '@/blocks/FAQBlock/Component'

const blockComponents = {
  archive: ArchiveBlock,
  bentoGrid: BentoGridBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  eventHero: EventHeroBlock,
  formBlock: FormBlock,
  fullSpeakersBlock: FullSpeakersBlock,
  highlightsBlock: HighlightsBlockComponent,
  mediaBlock: MediaBlock,
  partnersBlock: PartnersBlock,
  galleryBlock: GalleryBlockComponent,
  pageBannerBlock: PageBannerBlockComponent,
  pressBlock: PressBlock,
  programBlock: ProgramBlockComponent,
  promoBannerBlock: PromoBannerBlockComponent,
  speakersBlock: SpeakersBlock,
  speakerHighlightBlock: SpeakerHighlightBlockComponent,
  statsBlock: StatsBlockComponent,
  textCardBlock: TextCardBlockComponent,
  eventHighlightsBlock: EventHighlightsBlockComponent,
  aboutBlock: AboutBlockComponent,
  eventAgendaBlock: EventAgendaBlockComponent,
  partnersGridBlock: PartnersGridBlockComponent,
  partnerCtaBlock: PartnerCtaBlockComponent,
  allPostsBlock: AllPostsBlockComponent,
  venueHeroBlock: VenueHeroBlockComponent,
  venueBentoBlock: VenueBentoBlockComponent,
  fullWidthImageBlock: FullWidthImageBlockComponent,
  locationBlock: LocationBlockComponent,
  partnerFormBlock: PartnerFormBlockComponent,
  contactBlock: ContactBlockComponent,
  allPressBlock: AllPressBlockComponent,
  ctaButtonBlock: CtaButtonBlockComponent,
  ctaBannerBlock: CtaBannerBlockComponent,
  faqBlock: FAQBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isFullBleed = blockType === 'eventHero' || blockType === 'pageBannerBlock'
              const isReducedTop = blockType === 'speakersBlock'
              return (
                <div className={isFullBleed ? '' : isReducedTop ? 'mt-6 mb-16' : 'my-16'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
