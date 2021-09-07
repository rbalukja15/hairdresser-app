import React, { memo } from "react";
import clsx from "clsx";
import { FormHelperText } from "@material-ui/core";

type Props = {
  error: string | undefined;
  isTouched: boolean | undefined;
  styles: string;
};

const FormikHelperText = memo<Props>(({ error, isTouched, styles }) => {
  return (
    <FormHelperText className={clsx(styles, "mt2")}>
      {error && isTouched ? error : ""}
    </FormHelperText>
  );
});

FormikHelperText.displayName = "FormikHelperText";

export default FormikHelperText;
