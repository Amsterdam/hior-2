import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

let reactPlugin = null;
let appInsights = null;

const createTelemetryService = () => {

    const initialize = (instrumentationKey) => {

        if (!instrumentationKey) {
            throw new Error('Instrumentation key not provided')
        }

        reactPlugin = new ReactPlugin();

        appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: instrumentationKey,
                maxBatchInterval: 0,
                disableFetchTracking: false,
                enableAutoRouteTracking: true,
                extensions: [reactPlugin]
            }
        });

        appInsights.loadAppInsights();
    };

    return {reactPlugin, appInsights, initialize};
};

export const ai = createTelemetryService();
export const getAppInsights = () => appInsights;