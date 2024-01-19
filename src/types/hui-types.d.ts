export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  interface RoutesChildren {
    index?: boolean;
    element: JSX.Element;
  }

  interface RoutesType {
    name: string;
    layout: string;
    element?: JSX.Element;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean;
    children?: RoutesChildren[];
  }
}
