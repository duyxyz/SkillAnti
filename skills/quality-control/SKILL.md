---
name: Code Quality & Debugging Excellence
description: Standards for source code control, error logging, and checklists for rapid bug identification and resolution.
---

# Code Quality & Debugging Standard

## 1. Traceability
- **Conventional Commits**: Always use prefixes (feat, fix, refactor, chore) in commit messages to easily track change history.
- **Self-Documenting Code**: Prioritize extremely clear function/variable naming over explanatory comments. If a block of code needs a comment, consider refactoring it first.
- **Git Blame Friendly**: Do not bundle too many unrelated changes into a single commit. Break down changes into smaller parts to make them easier to "blame" and revert if errors occur.

## 2. Structured Logging & Monitoring
- **Log Levels**: Use the correct log levels (DEBUG, INFO, WARN, ERROR). Do not use pure `console.log` in production environments.
- **Contextual Data**: When logging errors, ALWAYS include contextual data (e.g., `userId`, `action`, `payload`) while ensuring sensitive information is secured.
- **Trace IDs**: Ensure logs are associated with session IDs or request IDs to track the entire flow of a single error.
- **Error Monitoring**: Integrate Sentry (Web/App) from the start. Wrap critical code blocks in `Error Boundaries` (React) or `Catch All` handlers to prevent full application crashes.

## 3. Defensive Programming
- **Input Validation**: Always check the validity of input data (Zod, Joi, or manual logic) before processing.
- **Fail Fast**: Design systems so that errors occur immediately at the point of failure.
- **Default States**: Always define safe default states for the UI and data.

## 4. Debugging Checklist
Whenever encountering a bug or writing new code, ask yourself:
1. "If this code fails on a client's machine, do I have enough log information to know why?"
2. "Have I checked for null or undefined data cases?"
3. "Does this function adhere to the Single Responsibility Principle?"
4. "Is there a Unit Test for this error case (Edge Case)?"

## 5. Code Review Checklist
Before submitting code, the Agent must self-check:
- [ ] Is the code violating the Single Responsibility Principle?
- [ ] Are there any unhandled `null`/`undefined` values?
- [ ] Are there magic numbers or hard-coded strings that should be moved to constants?
- [ ] Do function/variable names accurately describe their functionality?
- [ ] Are there repeated code segments (DRY violation) that need refactoring?
- [ ] Have any dependencies been added that were not requested?

## 6. Performance Profiling
- **When to worry**: When an operation takes > 300ms (Web) or causes frame drops (App), when more than 100 items are rendered in a list/table, or when there are nested loops on large data sets.
- **Web**: Use Chrome DevTools (Performance tab, Lighthouse) for measurement. Prioritize `useMemo`/`useCallback` when re-rendering is truly an issue.
- **Mobile (Flutter)**: Use Flutter DevTools (Widget Rebuild tracker). Avoid `setState` in parent widgets when only a child widget needs to be rebuilt.
- **Golden Rule**: Don't optimize early — measure first, optimize after having clear evidence.
