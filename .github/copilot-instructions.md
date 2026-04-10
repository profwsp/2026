# Project Guidelines

This workspace contains multiple React Native Expo projects. The main production project is IndusMonitor, which has established conventions documented below. Simple learning apps (like TDS2-A, TDS2-B) follow basic Expo patterns without specific styling conventions.

## Code Style

- Use functional components with hooks
- For IndusMonitor: Follow screen template pattern (Appbar.Header + ScrollView) as documented in [DEVELOPMENT_GUIDE.md](diversos/IndusMonitor/DEVELOPMENT_GUIDE.md)
- Import and use constants from [constants.js](diversos/IndusMonitor/src/constants/constants.js) instead of hardcoding status strings
- Use the dark industrial theme colors from [darkIndustrialTheme.js](diversos/IndusMonitor/src/theme/darkIndustrialTheme.js)

## Architecture

- Expo React Native apps with standard structure
- For IndusMonitor: See [ARCHITECTURE.md](diversos/IndusMonitor/ARCHITECTURE.md) for navigation hierarchy and component boundaries
- IndusMonitor uses React Navigation with bottom tabs for Dashboard, Scanner, and Sensors screens

## Build and Test

All projects use Expo CLI:
- `npm install` to install dependencies
- `npm start` to run development server
- `npm run android` for Android emulator
- `npm run ios` for iOS simulator
- `npm run web` for web version

Run setup scripts (`setup.bat` on Windows, `setup.sh` on Unix/Mac) to verify Node.js 16+ and Expo CLI installation.

## Conventions

- For IndusMonitor: Use the dark industrial color palette (Cyan #00BCD4, Orange #FF6B00, Green #00E676) and status colors (Green for operating, Orange for alert, Red for stopped)
- Follow mock data patterns from [mockData.js](diversos/IndusMonitor/src/data/mockData.js) for testing
- IndusMonitor components use react-native-paper with custom dark theme
- Avoid hardcoding colors or status values; always reference theme and constants files</content>
<parameter name="filePath">c:\Users\profw\OneDrive - SESISENAISP - Corporativo\Documentos\2026\.github\copilot-instructions.md