import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import clsx from "clsx";
import { FormControl } from "@mui/material";
import ReactPlayer from "react-player";
import { FormHelperText, InputLabel } from "@mui/material";

export type FileUploadProps = {
  id: string;
  name?: string;
  label?: string;
  imageButton?: boolean;
  accept: string;
  hoverLabel?: string;
  dropLabel?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  image?: {
    url: string;
    imageStyle?: {
      width?: string;
      height?: string;
    };
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
  error?: boolean;
  helperText?: React.ReactNode;
};

const useStyle = makeStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
    border: "1px solid #c5c7c8",
    borderRadius: "12px",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
});

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  name,
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "100%",
  height = "180px",
  backgroundColor = "#fff",
  image: {
    url = "",
    imageStyle = {
      height: "inherit",
    },
  } = {},
  onChange,
  onDrop,
  label,
  error = false,
  helperText = <></>,
}) => {
  const classes = useStyle();
  const [fileUrl, setFileUrl] = React.useState(url);
  const [fileType, setFileType] = React.useState<string>("");
  const [labelText, setLabelText] = React.useState<string>(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState<boolean>(false);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);
  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e: React.DragEvent) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e: React.DragEvent<HTMLElement>) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setFileUrl(URL.createObjectURL(e.dataTransfer.files[0]));
        setFileType(e.dataTransfer.files[0]?.type?.split("/")[0]);
      }
      onDrop(e);
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imageButton && event.target.files && event.target.files.length) {
      setFileUrl(URL.createObjectURL(event?.target?.files[0]));
      setFileType(event?.target?.files[0]?.type?.split("/")[0]);
    }
    onChange(event);
  };

  React.useEffect(() => {
    setFileUrl(url);
    setFileType(accept);
  }, [url, accept]);

  return (
    <Box>
      {label && (
        <InputLabel style={{ marginTop: "5px" }} error={error}>
          {label}
        </InputLabel>
      )}
      <FormControl margin="normal" fullWidth>
        <input
          onChange={handleChange}
          accept={accept}
          className={classes.hidden}
          id={id}
          name={name}
          type="file"
        />

        <label
          htmlFor={id}
          {...dragEvents}
          className={clsx(classes.root, isDragOver && classes.onDragOver)}
        >
          <Box
            height={height}
            bgcolor={backgroundColor}
            className={classes.noMouseEvent}
            sx={{ width: width }}
            style={error ? { borderColor: "red" } : {}}
          >
            {imageButton && fileUrl ? (
              <Box position="absolute" height={height} sx={{ width: width }}>
                {fileType === "image" && <img src={fileUrl} style={imageStyle} />}
                {fileType === "video" && (
                  <ReactPlayer
                    url={fileUrl}
                    width={width}
                    height={height}
                    muted
                    playing
                  />
                )}
              </Box>
            ) : (
              <Box height={height} className={classes.iconText} sx={{ width: width }}>
                <CloudUploadIcon fontSize="large" />
                <Typography>{labelText}</Typography>
              </Box>
            )}

            {(!imageButton || isDragOver || isMouseOver) && (
              <>
                <Box height={height} className={classes.iconText} sx={{ width: width }}>
                  <CloudUploadIcon fontSize="large" />
                  <Typography>{labelText}</Typography>
                </Box>
              </>
            )}
          </Box>
        </label>
        <FormHelperText error={error}>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default FileUpload;
