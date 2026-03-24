import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Arduino Week",
  description: "3-day hands-on workshop series for NJIT engineering students",
  // base:
  themeConfig: {
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
          { text: 'Day 1: Intro to Arduino & Basics', link: '/day-1' },
          { text: 'Day 2: Sensors & Inputs', link: '/day-2' },
          { text: 'Day 3: Motors & Actuators', link: '/day-3' }
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
    ]
  }
})
