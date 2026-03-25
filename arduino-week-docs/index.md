---
layout: home

hero:
  name: "<span style='font-size: 0.65em; color: var(--vp-c-text-1); display: block; margin-bottom: 0; line-height: 1.1; font-weight: 600; letter-spacing: 1px;'>IEEE NJIT Presents:</span>Arduino Week 2026"
  image:
    src: /images/hh.png
    alt: Arduino Week Banner
  actions:
  - theme: brand
    text: Get Started
    link: /welcome
  - theme: alt
    text: View Schedule
    link: /welcome#workshop-schedule

features:
  - title: Beginner Friendly
    details: Start from scratch. No prior coding or electronics experience required. We provide all the basics.
  - title: Hands-On Projects
    details: Build a real project every day. From simple LEDs to motors, progress your skills practically.
  - title: Expert Guidance
    details: Led by IEEE student branch members. Get help, troubleshoot, and learn best practices.
---

## Welcome to Arduino Week!

Welcome to the **IEEE Student Branch Arduino Week**. This is a comprehensive 4-day workshop series specially tailored for NJIT students looking to get hands-on experience with microcontrollers.

### What You Will Learn
- **Hardware Basics:** Understanding breadboards, components, and wiring.
- **Software Skills:** Writing and uploading C++ code using the Arduino IDE.
- **Interfacing:** Connecting sensors to read environments, and actuators to perform physical actions.
- **Troubleshooting:** Identifying and fixing common hardware and code issues.

### Schedule
* **[Day 1](./day-1.md):** Arduino Basics, programming fundamentals, and digital I/O.
* **[Day 2](./day-2.md):** Ultrasonic Security System, reading sensors, and logic implementation.
* **[Day 3](./day-3.md):** Mini Piano, generating sounds, and multi-input systems.
* **[Day 4](./day-4.md):** IEEE x AP-S Arduino Antenna, RF foundations, and measurements.

Ready to dive in? Head over to the [Getting Started](./getting-started.md) guide to set up your environment!

<style>
:root {
  --vp-home-hero-image-background-image: none; /* Disables default glowing orb */
}
.VPHero .image {
  margin: 0 auto;
  width: 100% !important;
  max-width: 300px !important;
  transform: scale(1.3);
}
.VPHero .image-src {
  width: 100% !important;
  max-width: 100% !important;
  border-radius: 5px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
}
@media (max-width: 768px) {
  .VPHero .image { transform: scale(1); margin-top: 2rem; }
}
</style>
