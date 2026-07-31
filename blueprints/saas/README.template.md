# SaaS Blueprint

This is a BuildOS blueprint for creating Software-as-a-Service applications.

## Blueprint Structure

- **backend/** — Server-side application structure
- **frontend/** — Client-side application structure
- **docs/** — Project documentation structure
- **.github/** — GitHub configuration and workflows

## Customization

This blueprint provides the initial project structure. Modify the directories and add assets according to your specific SaaS application requirements.

## Integration with BuildOS

When generated via `buildos new --blueprint saas`:

1. This structure will be populated with project-specific configuration
2. Runtime settings will be applied from `runtime/buildos/`
3. Framework conventions will guide project development
4. Roles and workflows will govern team collaboration

## Assets

This blueprint is currently a structural template. Add the following as needed:

- Application scaffolding templates
- Configuration examples
- Deployment configurations
- CI/CD pipeline templates
- Development environment setup

## Maintenance

Update this blueprint when:

- BuildOS framework changes affect new project generation
- Best practices for SaaS applications evolve
- New tooling or standards are adopted
