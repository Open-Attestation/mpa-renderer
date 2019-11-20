import { TemplateRegistry } from "@govtechsg/decentralized-renderer-react-components";
import { templates } from "./COC";

export const registry: TemplateRegistry<any> = {
  default: templates,
  COC: templates
};
