import type { ComponentType } from "react";

export function useMDXComponents(
  components: Record<string, ComponentType<unknown>>
) {
  return components;
}


