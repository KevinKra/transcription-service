// import statusLogger from '../helpers/statusLogger/statusLogger';

// const setAPIAddress = (): string => {
//   if (process.env.NEXT_PUBLIC_CURRENT_ENV === 'PRODUCTION') {
//     return process.env.NEXT_PUBLIC_PROD_API;
//   }
//   if (process.env.NEXT_PUBLIC_CURRENT_ENV === 'STAGING') {
//     return process.env.NEXT_PUBLIC_STAGING_API;
//   }
//   if (process.env.NEXT_PUBLIC_CURRENT_ENV === 'REVIEW') {
//     return process.env.NEXT_PUBLIC_STAGING_API;
//   }
//   return process.env.NEXT_PUBLIC_DEV_API;
// };

export const apiAddress = "http://localhost:5000";

// eslint-disable-next-line no-shadow
export enum testApiEndpointsEnum {
  test = "/test",
  testId = "/test/:id",
  testIdTestId = "/test/:id/test/:id",
}

// eslint-disable-next-line no-shadow
export enum ApiEndpointsEnum {
  youtube = "/services/youtube",
  youtubeId = "/services/youtube/:id",
  transcribe = "/services/aws/transcribe",
  transcribeId = "/services/aws/transcribe/:id",
  translate = "/services/aws/translate",
  s3 = "/services/aws/s3",
  s3BucketsIdFilesId = "/services/aws/s3/buckets/:id/files/:id",
}

export type ApiTargets =
  | testApiEndpointsEnum.test
  | testApiEndpointsEnum.testId
  | testApiEndpointsEnum.testIdTestId
  // * ^ the THREE enums above this comment are for testing.
  | ApiEndpointsEnum.youtube
  | ApiEndpointsEnum.youtubeId
  | ApiEndpointsEnum.transcribe
  | ApiEndpointsEnum.transcribeId
  | ApiEndpointsEnum.translate
  | ApiEndpointsEnum.s3
  | ApiEndpointsEnum.s3BucketsIdFilesId;

export const injectPathVariables = (
  target: ApiTargets[1],
  ids: string[]
): string => {
  let newStr = target;
  ids.forEach((i) => {
    newStr = newStr.replace(":id", i);
  });
  return newStr;
};

export const getApiAddress = (target: ApiTargets, ids?: string[]): string => {
  // * no ids provided + confirmation target doesn't need ids.
  if (ids === undefined && target.includes(":id") === false) {
    return `${apiAddress}${target}`;
  }

  // * no ids provided, but target does need ids.
  if (
    (ids === undefined || ids.length === 0) &&
    target.includes(":id") === true
  ) {
    return `${apiAddress}`;
  }

  // * ids have been provided.
  const injectedOutput = injectPathVariables(target, ids as string[]);
  if (injectedOutput.includes(":id")) {
    // * but not enough ids were provided for complete injection.
    return apiAddress;
  }
  // * sufficient ids have been provided
  return `${apiAddress}${injectedOutput}`;
};
