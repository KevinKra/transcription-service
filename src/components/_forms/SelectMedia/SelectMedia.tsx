import { TextField, styled, MenuItem, Typography, Paper } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { setAlert } from "../../../redux/slices/alertSlice/alertSlice";
import VideoPlayerController from "../../_molecules/VideoPlayer/VideoPlayerController/VideoPlayerController";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { youtubeGetId } from "../../../utils/helpers/youtubeGetId/youtubeGetId";
import searchYoutubeVideo from "../../../utils/services/youtube/searchYoutubeVideo/searchYoutubeVideo";
import { setMedia } from "../../../redux/slices/mediaSlice/mediaSlice";
import { setAuthor } from "../../../redux/slices/authorSlice/authorSlice";

type IFormInputs = {
  sourceURL: string;
  sourceLanguage: string;
  targetLanguage: string;
};

const SelectMedia = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [contentSubmitted, setContentSubmitted] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState<string>();
  const [targetLanguage, setTargetLanguage] = useState<string>();

  const {
    control,
    watch,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({});

  const mountedRef = useRef(false);
  // effect is just for tracking mounted state for react-testing-library
  // todo -- determine if using refs is a good idea
  // todo -- "memory leak" error in react-testing-library
  // source: https://www.benmvp.com/blog/handling-async-react-component-effects-after-unmount/
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const subscription = watch((allFields) => {
      const { sourceLanguage, targetLanguage } = allFields;
      setSourceLanguage(sourceLanguage);
      setTargetLanguage(targetLanguage);
      const fieldValues = Object.values(allFields);
      const allFieldsHaveInputs = fieldValues.every((field) => field !== "");
      allFieldsHaveInputs ? setSubmitDisabled(false) : setSubmitDisabled(true);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSearch = async () => {
    const values = getValues();
    const youtubeId = youtubeGetId(values.sourceURL);

    if (youtubeId.length !== 11) {
      setShowVideo(false);
      dispatch(
        setAlert({
          type: "warning",
          message: "Invalid address provided.",
          display: "support-both",
        })
      );
      return;
    }

    const response = await searchYoutubeVideo(youtubeId);
    if (mountedRef.current) {
      if (response.data === undefined) {
        dispatch(
          setAlert({
            type: response.type,
            message: response.message,
            display: "client-only",
          })
        );
        return setShowVideo(false);
      } else {
        setShowVideo(true);
        dispatch(setMedia(response.data.media));
        dispatch(setAuthor(response.data.author));
        dispatch(
          setAlert({
            type: response.type,
            message: response.message,
            display: "support-both",
          })
        );
      }
    }
  };

  const optionsMapper = (languageCode?: string) => {
    // todo -- write tests for this util
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

  const onSubmit: SubmitHandler<IFormInputs> = () => {
    setContentSubmitted(true);
    dispatch(
      setAlert({
        type: "success",
        message: "Successfully submitted content",
        display: "client-only",
      })
    );
  };

  return (
    <SelectMediaWrapper elevation={5}>
      <section>
        <VideoPlayerController
          playable={showVideo}
          withDetails={false}
          embedURL="https://www.youtube.com/watch?v=0La3aBSjvGY"
          timeStamp={{ startTime: 0, endTime: 10 }}
        />
      </section>
      <button onClick={onSearch}>Search</button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlInputs>
          <Controller
            name="sourceURL"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Youtube Address"
                inputProps={{
                  "data-testid": "input-source-url",
                }}
                variant="filled"
                disabled={contentSubmitted || false}
                placeholder="https://www.youtube.com/watch?v=0La3aBSjvGY"
                error={!!errors.sourceURL}
                helperText={
                  errors.sourceURL
                    ? "A valid youtube address is required"
                    : "Enter the address of a youtube video"
                }
                {...field}
              />
            )}
          />

          <SelectInputsWrapper>
            <Typography variant="overline">Language Mapping</Typography>
            <SelectWrapper>
              <Controller
                name="sourceLanguage"
                rules={{ required: "this field is required" }}
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    fullWidth
                    name="source-language"
                    label="Source Language"
                    variant="outlined"
                    value={value}
                    disabled={contentSubmitted || !showVideo}
                    error={!!errors.sourceLanguage}
                    onChange={onChange}
                    inputProps={{
                      "data-testid": "input-select-source-language",
                    }}
                    helperText={
                      errors.sourceLanguage
                        ? "Please select the language used in the provided media"
                        : "Select the language used in the provided media"
                    }
                  >
                    {optionsMapper(targetLanguage).map(({ code, name }, i) => {
                      return (
                        <MenuItem key={i} value={code}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </SelectWrapper>
            <SelectWrapper>
              <Controller
                name="targetLanguage"
                rules={{ required: "this field is required" }}
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    select
                    fullWidth
                    name="target-language"
                    label="Target Language"
                    variant="outlined"
                    value={value}
                    disabled={contentSubmitted || !showVideo}
                    error={!!errors.targetLanguage}
                    onChange={onChange}
                    inputProps={{
                      "data-testid": "input-select-target-language",
                    }}
                    helperText={
                      errors.targetLanguage
                        ? "Please select a language to translate the media into"
                        : "Select a language to translate the content into"
                    }
                  >
                    {optionsMapper(sourceLanguage).map(({ code, name }, i) => {
                      return (
                        <MenuItem key={i} value={code}>
                          {name}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                )}
              />
            </SelectWrapper>
          </SelectInputsWrapper>
          <LoadingButton
            endIcon={<SendIcon />}
            loading={contentSubmitted}
            disabled={submitDisabled}
            loadingPosition="end"
            variant="contained"
            type="submit"
          >
            {contentSubmitted ? "building lesson" : "build lesson"}
          </LoadingButton>
        </FormControlInputs>
      </form>
    </SelectMediaWrapper>
  );
};

export default SelectMedia;

const SelectMediaWrapper = styled(Paper)`
  width: 450px;
  padding: 1rem;
`;

const SelectWrapper = styled("div")`
  margin-bottom: 1rem;
`;

const FormControlInputs = styled("div")`
  margin-top: 1rem;
`;

const SelectInputsWrapper = styled("div")`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
`;
