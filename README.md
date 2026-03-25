# Arduino Week Documentation

Workshop series documentation for NJIT IEEE Arduino Week 2026.

## Workshop Structure

- **Day 1:** Arduino Basics - LED and button control
- **Day 2:** Ultrasonic Security System - Sensors and EEPROM
- **Day 3:** Mini Piano - Multiple inputs and sound generation
- **Day 4:** Arduino Antenna - RF foundations

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build
```

## Development

Built with [VitePress](https://vitepress.dev/).

### Project Structure

```
arduino-week-docs/
├── .vitepress/
│   └── config.js          # Site configuration
├── public/
│   ├── images/            # Images and diagrams
│   └── code/              # Downloadable .ino files
├── index.md               # Landing page
├── welcome.md             # Welcome page
├── getting-started.md     # Setup guide
├── day-1.md              # Day 1 documentation
├── day-2.md              # Day 2 documentation
├── day-3.md              # Day 3 documentation
├── day-4.md              # Day 4 documentation
├── resources.md           # Additional resources
└── troubleshooting.md     # Common issues
```

## Contributing

Maintained by IEEE NJIT Student Branch.

Documentation by Yahil Corcino [@YRCV](https://github.com/YRCV).

## Disclaimer

Arduino® is a registered trademark of Arduino SA. This event is organized by the IEEE NJIT Student Branch and funded by the NJIT Student Senate. It does not represent, nor is it officially endorsed by, Arduino SA or the global IEEE organization.

# License
Copyright © 2026 IEEE NJIT Student Branch