export type Props = {
  handleDialogClose: () => void;
  openDialog: boolean;
  heading: string;
  text: string;
  secondaryButtonLabel: string;
  primaryButtonLabel: string;
  primaryAction: () => void;
}