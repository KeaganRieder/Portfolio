export interface SearchBarProps {
  onSearchChange: (query: string) => void;
  onSearchSubmit?: (query: string) => void;
  placeholder?: string;
  value?: string;
  ref?: React.Ref<HTMLInputElement>;
}