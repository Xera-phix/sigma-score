// Utility function for conditional classNames
import classNames from "classnames";
export function cn(...classes: Parameters<typeof classNames>): string {
  return classNames(...classes);
}
