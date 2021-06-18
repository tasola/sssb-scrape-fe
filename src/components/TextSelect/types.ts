export type Props = {
  selectItems: string[] | number[];
  title: string;
  className: string;
  handleChange: (e) => void;
  value: string | number;
  isDisabled: boolean;
}