# Content Manager

### features

- 1. build new feature, lesson transcription page + components. **[mocked]**
  - handle parsed transcript.
  - test behaviors (update test suite).
  - update material-ui integration.
  - build responsive ui/ux.
  - relearn project implementations.
  - explore proto(?) to create a typing layer to join types between cms and api.
- 2. build new feature, lesson translation page + components. **[mocked]**
  - handle confirm transcript and generate (mocked) translations.
  - continue to refine practices derived from previous step.
- 3. build new feature, lesson submission page + components. **[mocked]**
  - handle confirm transcript and translation, submit lesson.
  - continue to refine practices derived from previous step.
- review implementations and record documentation.
  - review what has been built and write resources to help with feature learning + revisits.
- setup Kotlin(?) || NodeJS **RESTful** api layer for cms.
  - build and test the api to provide mocked responses.
  - update responses to be authentic with real data from AWS.
  - configure api to be a layer to handle and funnel potential inputs from both AWS & GCP.
  - make sure there is adequate testing and documentation in place.
- repeat general approach from above to build out client app.
- setup Kotlin(?) || NodeJS **GraphQL** api layer for client.

## Built using:

- **NextJS** (React)
- **Typescript**
- **Redux Toolkit**

### Styling

- Material-UI
- Emotion

### Testing

- Jest
- React-Testing-Library
- MockServiceWorker

### CI/CD

- Eslint
- Prettier
- Husky
