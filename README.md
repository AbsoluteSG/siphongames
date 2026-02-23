# No Dogs Allowed - Official Wiki

The complete official wiki and documentation for **No Dogs Allowed** by **Siphon Games**.

This is a comprehensive reference guide for all game mechanics, lore, characters, locations, combat systems, restaurant management, items, and quests.

## Project Overview

This wiki provides detailed information about:

- **Overview** - Introduction, controls, and core concepts
- **World** - The city, its factions, lore, and deep history
- **Characters** - Protagonists, allies, antagonists, and every NPC
- **Combat** - Action loops, stamina, parry windows, and weapon classes
- **Restaurant** - Menus, recipes, customer management, and upgrades
- **Locations** - Every district, secret area, and landmark
- **Items** - Weapons, consumables, key items, and collectibles
- **Quests** - Main story, side quests, and daily tasks

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) for content rendering
- **Date Handling**: [date-fns](https://date-fns.org)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the wiki.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page
├── wiki/
│   ├── layout.tsx      # Wiki layout
│   ├── page.tsx        # Wiki home
│   └── [slug]/         # Individual wiki pages
└── globals.css         # Global styles
```

## Contributing

This wiki is maintained by Siphon Games. For content updates or corrections, please contact the development team.

## License

© Siphon Games. All rights reserved.
