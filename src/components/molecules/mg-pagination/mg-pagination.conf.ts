export enum PageKind {
  NAVIGATION = 'navigation',
  NUMBER = 'number',
  ELLIPSIS = 'ellipsis',
}

export enum NavigationAction {
  NEXT = 'next',
  PREVIOUS = 'previous',
}

export type Page = number | PageKind.ELLIPSIS;

export type PagerItem = {
  kind: PageKind;
  disabled: boolean;
  number?: number;
  navigationaction?: NavigationAction;
};
