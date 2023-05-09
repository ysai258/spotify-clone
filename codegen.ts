
import type { CodegenConfig } from '@graphql-codegen/cli';
import {BASE_URL} from './src/constants/constats'

const config: CodegenConfig = {
  overwrite: true,
  schema: BASE_URL,
  documents: "src/**/*.graphql",
  generates: {
    "src/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    }
  }
};

export default config;
