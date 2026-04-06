# React Native Expo App (JavaScript)

This project uses Expo Router with a JavaScript-only codebase.

## Tech Stack

- Expo 54
- React Native 0.81
- Expo Router 6

## Scripts

```bash
npm install
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

## Project Structure

- `app/`: Route-based screens and layouts (Expo Router)
- `src/theme/`: Shared design tokens
- `src/components/`: Reusable UI building blocks

## Styling Approach

- Use `StyleSheet.create` for every screen/component.
- Keep colors, spacing, radius, and typography in shared tokens.
- Avoid heavy inline styles; extract to named style objects.
