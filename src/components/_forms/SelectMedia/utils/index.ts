import { setAlert } from "../../../../redux/slices/alertSlice/alertSlice";
import { AppDispatch } from "../../../../redux/store";
import { postMediaToS3 } from "../../../../utils/services/aws/s3/postMediaToS3/postMediaToS3";
import { searchForMediaS3 } from "../../../../utils/services/aws/s3/searchForMediaS3/searchForMediaS3";

export const handleS3Upload = async (
  contentId: string,
  dispatch: AppDispatch
) => {
  const s3SearchResponse = await searchForMediaS3(contentId);
  if (s3SearchResponse.type === "success") {
    // * file is found, don't upload new file.
    dispatch(
      setAlert({
        type: s3SearchResponse.type,
        message: s3SearchResponse.message,
        display: "client-only",
      })
    );
  } else {
    const s3PostResponse = await postMediaToS3(contentId);

    dispatch(
      setAlert({
        type: s3PostResponse.type,
        message: s3PostResponse.message,
        display: "support-both",
      })
    );
  }
};

export const optionsMapper = (languageCode?: string) => {
  type languageSelection = { name: string; code: string };

  const supportedLanguages: languageSelection[] = [
    { name: "english", code: "en-US" },
    { name: "french", code: "fr-FR" },
    { name: "spanish", code: "es-ES" },
    { name: "german", code: "de-DE" },
  ];
  if (!languageCode) return supportedLanguages;
  const filteredLanguages = supportedLanguages.filter((language) => {
    return language.code.toLowerCase() !== languageCode.toLowerCase();
  });
  return filteredLanguages;
};
