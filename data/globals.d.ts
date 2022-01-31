type User = {
  id: string;
  email: string;
  model: {
    superuser: boolean;
  };
};
declare var __user: User;

type EnabledExperiment = {
  name: string;
};

type Configuration = {
  user: User | null;
  experiments: EnabledExperiment[];
};

declare var configuration: Configuration;

declare module 'js-cookie';
declare module 'md5.js';
