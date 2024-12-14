import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'
import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

const config = {
  theme: 'dark',
  start: gsap.utils.random(0, 100, 1),
  end: gsap.utils.random(900, 1000, 1),
  scroll: true,
}

const ctrl = new Pane({
  title: 'Config',
  expanded: true,
})

const update = () => {
  document.documentElement.dataset.theme = config.theme
  document.documentElement.dataset.syncScrollbar = config.scroll
  document.documentElement.style.setProperty('--start', config.start)
  document.documentElement.style.setProperty('--scroller', config.start)
  document.documentElement.style.setProperty('--end', config.end)
}

const sync = (event) => {
  if (
    !document.startViewTransition ||
    event.target.controller.view.labelElement.innerText !== 'Theme'
  )
    return update()
  document.startViewTransition(() => update())
}

ctrl.addBinding(config, 'start', {
  label: 'Hue Start',
  min: 0,
  max: 1000,
  step: 1,
})
ctrl.addBinding(config, 'end', {
  label: 'Hue End',
  min: 0,
  max: 1000,
  step: 1,
})
ctrl.addBinding(config, 'scroll', {
  label: 'Scrollbar',
})

ctrl.addBinding(config, 'theme', {
  label: 'Theme',
  options: {
    System: 'system',
    Light: 'light',
    Dark: 'dark',
  },
})

ctrl.on('change', sync)
update()

// backfill the scroll functionality with GSAP
if (
  !CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')
) {
  gsap.registerPlugin(ScrollTrigger)
  const items = gsap.utils.toArray('ul li')
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    gsap.set(item, { opacity: i !== 0 ? 0.2 : 1 })
    gsap
      .timeline({
        scrollTrigger: {
          scrub: 0.25,
          trigger: item,
          start: 'center center+=4lh',
          end: 'center center-=4lh',
        },
      })
      .to(item, {
        opacity: 1,
        ease: 'none',
        duration: 0.1,
      })
      .to(item, {
        opacity: i !== items.length - 1 ? 0.2 : 1,
        ease: 'none',
        duration: 0.1,
      })
  }
  // register scrollbar changer
  gsap.fromTo(
    document.documentElement,
    {
      '--scroller': config.start,
    },
    {
      '--scroller': config.end,
      ease: 'none',
      scrollTrigger: {
        scrub: 0.1,
        trigger: 'ul',
        start: 'top center-=1lh',
        end: 'bottom center+=1lh',
      },
    }
  )
  gsap.fromTo(
    document.documentElement,
    {
      '--chroma': 0,
    },
    {
      '--chroma': 0.3,
      duration: 0.1,
      ease: 'none',
      scrollTrigger: {
        scrub: 0.2,
        trigger: 'ul',
        start: 'top center-=2lh',
        end: 'top center',
      },
    }
  )
  gsap.fromTo(
    document.documentElement,
    {
      '--chroma': 0.3,
    },
    {
      '--chroma': 0,
      duration: 0.1,
      ease: 'none',
      scrollTrigger: {
        scrub: 0.2,
        trigger: 'ul',
        start: 'bottom center+=2lh',
        end: 'bottom center+=1lh',
      },
    }
  )
}
