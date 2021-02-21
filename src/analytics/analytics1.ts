export interface Log {
  logLevel: 'error' | 'success' | 'info';
  category: string;
  prefix: string;
  log: string; // data
}

export const sendEvent = (eventName: string, eventProperties?: Log) => {
  console.log(`analytics 1`, { eventName, eventProperties });
};
