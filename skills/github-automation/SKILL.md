---
name: GitHub Automation
description: Skills for automating workflows on GitHub including version tagging (tags), cache optimization, and Pull Request management.
---

# Skill: GitHub Automation

This skill helps optimize the use of GitHub as a CI/CD and collaboration platform.

## 1. Auto-tagging
- **Custom Counting Rules**:
    - Patch (last number) increments from 0 to 9.
    - When Patch hits 9, the next increment resets Patch to 0 and increments Minor (middle number).
    - Example: `1.0.8` -> `1.0.9` -> `1.1.0`.
- **Execution**: Should be performed automatically via GitHub Actions after code is merged into the main branch.

## 2. Build Cache Optimization
- **Goal**: Reduce CI wait times by caching heavy resources.
- **Flutter Caching**:
    - Cache the `pub-cache` directory.
    - Cache Gradle wrapper and dependencies for Android.
- **Tooling**: Use `actions/cache@v4` with keys based on the hash of `pubspec.lock`.

## 3. Pull Request & Issue Management
- **PR Templates**: Use a `.github/pull_request_template.md` file to require complete information about changes, a checklist, and screenshots if UI changes are made.
- **Labels**: Automatically assign labels based on the type of change (feat, fix, docs).

## 4. GitHub Releases
- **Automated Changelog**: Integrate tools that automatically generate release notes based on commit headers.
- **Draft Releases**: Always create a Draft before publishing officially to re-verify attached binary files.

## Related References
- [CI/CD & DevOps (Android)](file:///c:/Users/PC/Documents/Github/skills/skills/android-su/cicd-devops/SKILL.md)
- [Interaction Protocol (Strict Protocol)](file:///c:/Users/PC/Documents/Github/skills/skills/strict-protocol/SKILL.md)
