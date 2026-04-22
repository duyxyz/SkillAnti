---
name: Clean Architecture & Testing
description: Strict regulations on logic separation, clean architecture, and mandatory testing for every feature.
---

# Clean Architecture & Testing Standard (Main)

> [!NOTE]
> This is a foundational architecture document. When working with specific platforms (like Flutter), combine it with the corresponding skill (e.g., [Android Setup](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/flutter-setup/SKILL.md)).

## 1. Logic Separation
- **Presentation Layer**: 
    - **Web**: Components (React/Vue/HTML).
    - **App**: Mobile Screens/Widgets (React Native, Flutter, Swift/Kotlin).
    - Contains only display logic. Do not include business logic or direct API calls.
- **Domain Layer**: Contains Business Logic, Entities, and Use Cases independent of the platform.
- **Data Layer**: Manages APIs, Caching (LocalStorage/SQLite), and Repositories.

## 2. State Management
- **Web**: Use **Zustand** for simple/medium state. Use **Redux Toolkit** when state is complex, requires time-travel debugging, or has many linked slices.
- **Mobile (Flutter)**: Use **Provider** for small scopes. Use **BLoC** when clear Event/State separation and testability are required.
- **General Rule**: Global state should only store data that truly needs to be shared. Local state (UI state) must remain within the component/widget and not be pushed to the global store.

## 3. Naming Conventions
- **Web/App Files**: Use `kebab-case` or follow platform-specific standards (e.g., PascalCase for Components).
- **Suffixes**:
    - `*.component.*`, `*.screen.*`, `*.widget.*`: For UI components.
    - `*.service.*`, `*.usecase.*`: For business logic.
    - `*.test.*`: For Unit Tests.
- **Platform Agnostic**: Prioritize naming files based on function rather than technology (e.g., `auth.service.ts` instead of `auth.axios.ts`).

## 4. Folder Structure
```
# Web (React/Next.js)
src/
  components/      # Pure, reusable UI
  features/        # Each feature has its own components, services, and hooks
  services/        # Business logic, API calls
  store/           # State management
  types/           # TypeScript types/interfaces

# Mobile (Flutter)
lib/
  features/        # Each feature has presentation, domain, and data
    auth/
      presentation/ # Screens, Widgets
      domain/       # UseCases, Entities
      data/         # Repositories, Models
  shared/          # Shared widgets
  core/            # Config, constants, themes
```

## 5. Testing Requirements
- **Unit Testing (Universal)**: Use **Jest** or the platform's default framework (e.g., `flutter_test`). Mandatory for the Domain Layer.
- **UI/Integration Testing**:
    - **Web**: React Testing Library, Playwright.
    - **App**: Interaction tests, Widget tests.
- **End-to-End (E2E) Testing**:
    - **Web**: Cypress, Playwright.
    - **App**: Maestro, Appium, or equivalent native tools.
- **CI/CD Integration**: Every testing process must be integrated into the automation flow. See details in the [CI/CD & DevOps Skill](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/cicd-devops/SKILL.md).

## 6. Platform Optimization
- **Responsive (Web)**: Always follow a Mobile-first design.
- **Performance (App)**: Check for memory leaks, optimize bundle/binary size.
- **Offline-first**: Design the Data layer to support caching and offline functionality where necessary.

## 7. Error Handling
- Do not use `console.log` to log errors in actual products.
- Use purposeful `try/catch` structures, accompanied by user-friendly messages for the user and detailed logs for the system (e.g., Sentry).
- Always define custom Error Classes for specific business errors.

## 8. Workflow
- Before completing a request, the Agent must check if a corresponding test file exists. If it does not exist, **only propose** creating a test at the end of the response — do not create it unless requested.
- Never delete existing test files unless the corresponding logic is removed.
