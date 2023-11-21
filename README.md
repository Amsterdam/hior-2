# Handboek Inrichting Openbare Ruimte

Het Handboek Inrichting Openbare Ruimte (HIOR) is een integrale verzameling van het vigerend beleid voor de inrichting van de openbare ruimte in Amsterdam. Het HIOR helpt opdrachtgevers, projectleiders, ontwerpers, adviseurs en beheerders om invulling te geven aan het Amsterdamse beleid.

In deze applicatie kan beleid worden gezocht:

- Per thema, bijvoorbeeld 'fiets', 'voetganger', 'groen', 'water & oevers' en 'straatmeubilair'
- Per beleidsproduct, bijvoorbeeld alle hoofdlijnen van de 'visie openbare ruimte' of de 'nota parkeernormen'

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

De productie- (PROD) en acceptatieomgevingen (ACC) zijn te vinden op:

- Productie: [https://hior.amsterdam.nl](https://hior.amsterdam.nl)
- Acceptatie: [https://acc.hior.amsterdam.nl](https://acc.hior.amsterdam.nl)

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Other commands:

`npm run lint`

`npm run test`

`npm run test:watch`

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Ejecting the app

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However, we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Application Insights

The React-app connects to Azure's Application Insights, if the connection string is available as an environment variable variable in the OTAP environments. To get the connection string available at the client side in the browser, the script `env.sh` is run while spinning up the nginx-container. The script reads the connection string from the env vars, and writes it to a `.js` file that is served by nginx. This `.js` file is loaded in a `<script>`-tag inside the `<head>`-section.

For local development, the `.env.local`-file is loaded which contains the env var `REACT_APP_DISABLE_APPLICATION_INSIGHTS=true`, because the `.js`-file containing a connection string is not generated when using `npm start`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
