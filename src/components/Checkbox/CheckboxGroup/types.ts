export type Props = {
  availableApartmentTypes: string[];
  handleChange: (e) => void;
  checkedItems: Map<string, boolean>;
}