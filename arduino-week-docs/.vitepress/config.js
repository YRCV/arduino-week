import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Arduino Week",
  description: "3-day hands-on workshop series for NJIT engineering students",
  // base:
  head: [
    ['link', { rel: 'icon', href: '/images/ieee_logo_icon.png' }]
  ],
  themeConfig: {
    logo: '/images/NJIT_IEEE_color_vertical.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Resources', link: '/resources' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Welcome', link: '/welcome' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Workshop Series',
        items: [
          { text: 'Day 1: Arduino Basics', link: '/day-1' },
          { text: 'Day 2: Ultrasonic Security System', link: '/day-2' },
          { text: 'Day 3: Mini Piano', link: '/day-3' },
          { text: 'Day 4: IEEE x AP-S Arduino Antenna', link: '/day-4' }
        ]
      },
      {
        text: 'Guides & Help',
        items: [
          { text: 'Resources', link: '/resources' },
          { text: 'Troubleshooting', link: '/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/YRCV/arduino-week' }
    ],

    footer: {
      message: 'Presented by IEEE NJIT Student Branch<br>Documentation by Yahil<br><span style="display: inline-block; margin-top: 8px; max-width: 500px; font-size: 0.85em; opacity: 0.8; line-height: 1.5; text-align: center;">Arduino® is a registered trademark of Arduino SA. This event is organized by the IEEE NJIT Student Branch and funded by the NJIT Student Senate. It does not represent, nor is it officially endorsed by, Arduino SA or the global IEEE organization.</span>',
      copyright: 'Copyright © 2026 IEEE NJIT Student Branch'
    }
  }
})
