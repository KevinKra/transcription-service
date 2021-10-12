import { TextField, styled, MenuItem, Typography, Button } from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  selectAlert,
  setAlert,
} from "../../../redux/slices/alertSlice/alertSlice";
import VideoPlayerController from "../../_molecules/VideoPlayer/VideoPlayerController/VideoPlayerController";

type IFormInputs = {
  sourceURL: string;
  sourceLanguage: string;
  targetLanguage: string;
};

const SelectMedia = () => {
  const [showVideo, setShowVideo] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({});

  const alertState = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  const createSnackBar = () => {
    dispatch(
      setAlert({
        type: "success",
        message: "great job",
        display: "support-both",
      })
    );
    console.log("video selected");
  };

  const onSearch = () => {
    setShowVideo(true);
  };

  const onSubmit: SubmitHandler<IFormInputs> = () => {
    console.log("submit clicked");
  };

  return (
    <SelectMediaWrapper>
      {alertState && alertState.message + " header"}
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
                data-testid="input-source-url"
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
          <button onClick={createSnackBar}>click me</button>

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
                    label="Source Language"
                    variant="filled"
                    value={value}
                    disabled={showVideo ? false : true}
                    error={!!errors.sourceLanguage}
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
          <Button disabled={true} variant="contained">
            Build Lesson
          </Button>
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
