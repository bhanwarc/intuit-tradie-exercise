import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

type Props = {
  title: string;
  errors?: string[];
};

const Error = ({ title, errors }: Props) => {
  return (
    <Alert severity="error" sx={{ margin: "24px 0" }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {errors && errors.map((m: string, index: number) => <li key={index}>{m}</li>)}
    </Alert>
  );
};

export default Error;
