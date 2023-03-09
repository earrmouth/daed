import { useForm, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ImportArgument } from "~/gql/graphql";

import CreateFormDrawer from "./CreateFormDrawer";
import GrowableInputList from "./GrowableInputList";

export type FormValues = {
  nodes: ImportArgument[];
};

export default ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: UseFormReturn<FormValues>) => Promise<void>;
}) => {
  const { t } = useTranslation();

  const form = useForm<FormValues>();
  const { register } = form;

  return (
    <CreateFormDrawer<FormValues> header={t("node")} isOpen={isOpen} onClose={onClose} form={form} onSubmit={onSubmit}>
      <GrowableInputList
        getNameInputProps={(i) => ({ ...register(`nodes.${i}.tag`) })}
        getValueInputProps={(i) => ({ ...register(`nodes.${i}.link`) })}
      />
    </CreateFormDrawer>
  );
};