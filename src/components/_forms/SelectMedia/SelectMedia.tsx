import { TextField, styled, MenuItem, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { setAlert } from "../../../redux/slices/alertSlice/alertSlice";
import VideoPlayerController from "../../_molecules/VideoPlayer/VideoPlayerController/VideoPlayerController";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { youtubeGetId } from "../../../utils/helpers/youtubeGetId/youtubeGetId";
import searchYoutubeVideo from "../../../utils/services/youtube/searchYoutubeVideo/searchYoutubeVideo";

type IFormInputs = {
  sourceURL: string;
  sourceLanguage: string;
  targetLanguage: string;
};

const SelectMedia = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [contentSubmitted, setContentSubmitted] = useState(false);

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
  // todo -- since it _only_ is being used to resolving a testing
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
      if (response.type === "warning" || response.type === "error") {
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
    <SelectMediaWrapper>
      <div>
        <VideoPlayerController
          playable={showVideo}
          withDetails={false}
          embedURL=""
          timeStamp={{ startTime: 0, endTime: 10 }}
        />
      </div>
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
                disabled={false}
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

          <SelectInputWrapper>
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
                    variant="filled"
                    value={value}
                    disabled={showVideo ? false : true}
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
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="en-US">English</MenuItem>
                    <MenuItem value="fr-FR">French</MenuItem>
                    <MenuItem value="es-ES">Spanish</MenuItem>
                    <MenuItem value="de-DE">German</MenuItem>
                  </TextField>
                )}
              />
            </SelectWrapper>
          </SelectInputWrapper>
          <SelectInputWrapper>
            <Typography variant="overline">Language Mapping</Typography>
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
                    label="Target Language"
                    variant="filled"
                    value={value}
                    disabled={showVideo ? false : true}
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
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </TextField>
                )}
              />
            </SelectWrapper>
          </SelectInputWrapper>
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

const SelectMediaWrapper = styled("section")`
  border: 1px solid blue;
  width: 450px;
`;

const FormControlInputs = styled("div")`
  border: 1px solid red;
`;

const SelectWrapper = styled("div")`
  border: 1px solid red;
`;

const SelectInputWrapper = styled("div")`
  border: 1px solid blue;
`;
