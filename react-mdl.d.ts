
declare module "react-mdl" {
  import * as React from 'react';
  type Component = string | Function | React.ReactElement<any>;
  type Children = string | Element;

  //---------- Badge
  export interface BadgeProps extends HTMLAttributes {
    children?: Children;
    text?: string | number;
    overlap?: boolean;
    noBackground?: boolean;
  }
  export class Badge extends React.Component<BadgeProps, {}> { }


  //---------- Button
  export interface ButtonProps extends HTMLAttributes {
    accent?: boolean;
    className?: string;
    colored?: boolean;
    component?: Component;
    href?: string;
    primary?: boolean;
    raised?: boolean;
    ripple?: boolean;
  }
  export class Button extends React.Component<ButtonProps, {}> { }


  //---------- Card
  export interface CardProps extends HTMLAttributes {
    className?: string;
    shadow?: number;
  }
  export class Card extends React.Component<CardProps, {}> { }


  //---------- CardActions
  export interface CardActionsProps extends HTMLAttributes {
    border?: boolean;
    className?: string;
  }
  export class CardActions extends React.Component<CardActionsProps, {}> { }


  //---------- CardMedia
  export interface CardMediaProps extends HTMLAttributes {
    className?: string;
  }
  export class CardMedia extends React.Component<CardMediaProps, {}> { }


  //---------- CardMenu
  export interface CardMenuProps extends HTMLAttributes {
    className?: string;
  }
  export class CardMenu extends React.Component<CardMenuProps, {}> { }


  //---------- CardText
  export interface CardTextProps extends HTMLAttributes {
    className?: string;
  }
  export class CardText extends React.Component<CardTextProps, {}> { }


  //---------- CardTitle
  export interface CardTitleProps extends HTMLAttributes {
    className?: string;
    expand?: boolean;
  }
  export class CardTitle extends React.Component<CardTitleProps, {}> { }


  //---------- Cell
  export interface CellProps extends HTMLAttributes {
    align?: 'top' | 'middle' | 'bottom' | 'stretch';
    className?: string;
    col: number;
    component?: Component;
    phone?: number;
    tablet?: number;
    hideDesktop?: boolean;
    hidePhone?: boolean;
    hideTablet?: boolean;
    shadow?: number;
  }
  export class Cell extends React.Component<CellProps, {}> { }


  //---------- Checkbox
  export interface CheckboxProps extends HTMLAttributes {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    label?: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class Checkbox extends React.Component<CheckboxProps, {}> { }


  //---------- Content
  export interface ContentProps extends HTMLAttributes {
    className?: string;
    component?: Component;
  }
  export class Content extends React.Component<ContentProps, {}> { }


  //---------- Dialog
  export interface DialogProps extends HTMLAttributes {
    className?: string;
    onCancel?: () => void;
    open?: boolean;
  }
  export class Dialog extends React.Component<DialogProps, {}> { }


  //---------- DialogActions
  export interface DialogActionsProps extends HTMLAttributes {
    className?: string;
    fullWidth?: boolean;
  }
  export class DialogActions extends React.Component<DialogActionsProps, {}> { }


  //---------- DialogContent
  export interface DialogContentProps extends HTMLAttributes {
    className?: string;
  }
  export class DialogContent extends React.Component<DialogContentProps, {}> { }


  //---------- DialogTitle
  export interface DialogTitleProps extends HTMLAttributes {
    className?: string;
    component?: Component;
  }
  export class DialogTitle extends React.Component<DialogTitleProps, {}> { }


  //---------- Drawer
  export interface DrawerProps extends HTMLAttributes {
    className?: string;
    title?: React.ReactElement<any>;
  }
  export class Drawer extends React.Component<DrawerProps, {}> { }


  //---------- FABButton
  export interface FABButtonProps extends HTMLAttributes {
    accent?: boolean;
    className?: string;
    colored?: boolean;
    component?: Component;
    href?: string;
    primary?: boolean;
    raised?: boolean;
    ripple?: boolean;
    mini?: boolean;
  }
  export class FABButton extends React.Component<FABButtonProps, {}> { }


  //---------- Footer
  export interface FooterProps extends HTMLAttributes {
    className?: string;
    size?: 'mini' | 'mega';
  }
  export class Footer extends React.Component<FooterProps, {}> { }


  //---------- FooterDropDownSection
  export interface FooterDropDownSectionProps extends HTMLAttributes {
    className?: string;
    size?: 'mini' | 'mega';
    title: React.ReactElement<any>;
  }
  export class FooterDropDownSection extends React.Component<FooterDropDownSectionProps, {}> { }


  //---------- FooterLinkList
  export interface FooterLinkListProps extends HTMLAttributes {
    className?: string;
    size?: 'mini' | 'mega';
  }
  export class FooterLinkList extends React.Component<FooterLinkListProps, {}> { }


  //---------- FooterSection
  export interface FooterSectionProps extends HTMLAttributes {
    className?: string;
    logo?: React.ReactElement<any>;
    size?: 'mini' | 'mega';
    type?: 'top' | 'middle' | 'bottom' | 'left' | 'right';
  }
  export class FooterSection extends React.Component<FooterSectionProps, {}> { }


  //---------- Grid
  export interface GridProps extends HTMLAttributes {
    className?: string;
    component?: Component;
    noSpacing?: boolean;
    shadow?: number;
  }
  export class Grid extends React.Component<GridProps, {}> { }


  //---------- Header
  export interface HeaderProps extends HTMLAttributes {
    className?: string;
    scroll?: boolean;
    seamed?: boolean;
    title?: React.ReactElement<any>;
    transparent?: boolean;
    waterfall?: boolean;
    hideTop?: boolean;
  }
  export class Header extends React.Component<HeaderProps, {}> { }


  //---------- HeaderRow
  export interface HeaderRowProps extends HTMLAttributes {
    className?: string;
    title?: React.ReactElement<any>;
  }
  export class HeaderRow extends React.Component<HeaderRowProps, {}> { }


  //---------- HeaderTabs
  export interface HeaderTabsProps extends HTMLAttributes {
    activeTab?: number;
    className?: string;
    onChange?: (tabId: string) => void;
    ripple?: boolean;
  }
  export class HeaderTabs extends React.Component<HeaderTabsProps, {}> { }


  //---------- Icon
  export interface IconProps extends HTMLAttributes {
    className?: string;
    name: string;
  }
  export class Icon extends React.Component<IconProps, {}> { }


  //---------- IconButton
  export interface IconButtonProps extends HTMLAttributes {
    accent?: boolean;
    className?: string;
    colored?: boolean;
    component?: Component;
    href?: string;
    primary?: boolean;
    raised?: boolean;
    ripple?: boolean;
    mini?: boolean;
    name: string;
  }
  export class IconButton extends React.Component<IconButtonProps, {}> { }


  //---------- IconToggle
  export interface IconToggleProps extends HTMLAttributes {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    name: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class IconToggle extends React.Component<IconToggleProps, {}> { }


  //---------- Layout
  export interface LayoutProps extends HTMLAttributes {
    className?: string;
    fixedDrawer?: boolean;
    fixedHeader?: boolean;
    fixedTabs?: boolean;
  }
  export class Layout extends React.Component<LayoutProps, {}> { }


  //---------- List
  export interface ListProps extends HTMLAttributes {
    className?: string;
  }
  export class List extends React.Component<ListProps, {}> { }


  //---------- ListItem
  export interface ListItemProps extends HTMLAttributes {
    className?: string;
    twoLine?: boolean;
    threeLine?: boolean;
  }
  export class ListItem extends React.Component<ListItemProps, {}> { }


  //---------- ListItemAction
  export interface ListItemActionProps extends HTMLAttributes {
    children?: Children;
    className?: string;
    info?: string;
  }
  export class ListItemAction extends React.Component<ListItemActionProps, {}> { }


  //---------- ListItemContent
  export interface ListItemContentProps extends HTMLAttributes {
    avatar?: string;
    className?: string;
    icon?: string;
    subtitle?: React.ReactElement<any>;
    useBodyClass?: boolean;
  }
  export class ListItemContent extends React.Component<ListItemContentProps, {}> { }


  //---------- Menu
  export interface MenuProps extends HTMLAttributes {
    align?: 'left' | 'right';
    className?: string;
    ripple?: boolean;
    target: string;
    valign?: 'bottom' | 'top';
  }
  export class Menu extends React.Component<MenuProps, {}> { }


  //---------- MenuItem
  export interface MenuItemProps extends HTMLAttributes {
    className?: string;
  }
  export class MenuItem extends React.Component<MenuItemProps, {}> { }


  //---------- Navigation
  export interface NavigationProps extends HTMLAttributes {
    className?: string;
  }
  export class Navigation extends React.Component<NavigationProps, {}> { }


  //---------- ProgressBar
  export interface ProgressBarProps extends HTMLAttributes {
    buffer?: number;
    className?: string;
    indeterminate?: boolean;
    progress?: number;
  }
  export class ProgressBar extends React.Component<ProgressBarProps, {}> { }


  //---------- Radio
  export interface RadioProps extends HTMLAttributes {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    name?: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class Radio extends React.Component<RadioProps, {}> { }


  //---------- RadioGroup
  export interface RadioGroupProps extends HTMLAttributes {
    childContainer?: string;
    children?: Children;
    container?: string;
    name: string;
    onChange?: (ev: Event) => void;
  }
  export class RadioGroup extends React.Component<RadioGroupProps, {}> { }


  //---------- Slider
  export interface SliderProps extends HTMLAttributes {
    className?: string;
    max?: number;
    min?: number;
    onChange?: (ev: Event) => void;
    value?: number;
  }
  export class Slider extends React.Component<SliderProps, {}> { }


  //---------- Snackbar
  export interface SnackbarProps extends HTMLAttributes {
    action?: string;
    active: boolean;
    className?: string;
    onActionClick?: (ev: Event) => void;
    onTimeout: () => void;
    timeout?: number;
  }
  export class Snackbar extends React.Component<SnackbarProps, {}> { }


  //---------- Spacer
  export interface SpacerProps extends HTMLAttributes {
    className?: string;
  }
  export class Spacer extends React.Component<SpacerProps, {}> { }


  //---------- Spinner
  export interface SpinnerProps extends HTMLAttributes {
    className?: string;
    singleColor?: boolean;
  }
  export class Spinner extends React.Component<SpinnerProps, {}> { }


  //---------- Switch
  export interface SwitchProps extends HTMLAttributes {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class Switch extends React.Component<SwitchProps, {}> { }


  //---------- Tab
  export interface TabProps extends HTMLAttributes {
    active?: boolean;
    className?: string;
    component?: Component;
    cssPrefix?: string;
    onTabClick?: (tabId: string) => void;
    style?: {};
    tabId?: number;
  }
  export class Tab extends React.Component<TabProps, {}> { }


  //---------- TabBar
  export interface TabBarProps extends HTMLAttributes {
    activeTab?: number;
    className?: string;
    cssPrefix: string;
    onChange?: (tabId: string) => void;
  }
  export class TabBar extends React.Component<TabBarProps, {}> { }


  //---------- Table
  export interface TableProps extends HTMLAttributes {
    rows: Array<{}>;
    sortable?: boolean;
  }
  export class Table extends React.Component<TableProps, {}> { }


  //---------- TableHeader
  export interface TableHeaderProps extends HTMLAttributes {
    cellFormatter?: (val: string, row: any, rowIndex: number) => string;
    className?: string;
    name: string;
    numeric?: boolean;
    onClick?: React.MouseEventHandler;
    nosort?: boolean;
    sortFn?: (a: string, b: string, isAsc: boolean) => number;
    tooltip?: React.ReactElement<any>;
  }
  export class TableHeader extends React.Component<TableHeaderProps, {}> { }


  //---------- Tabs
  export interface TabsProps extends HTMLAttributes {
    activeTab?: number;
    children?: Children;
    className?: string;
    onChange?: (tabId: string) => void;
    ripple?: boolean;
    tabBarProps?: {};
  }
  export class Tabs extends React.Component<TabsProps, {}> { }


  //---------- Textfield
  export interface TextfieldProps extends HTMLAttributes {
    className?: string;
    disabled?: boolean;
    error?: React.ReactElement<any>;
    expandable?: boolean;
    expandableIcon?: string;
    floatingLabel?: boolean;
    id?: string;
    inputClassName?: string;
    label: string;
    maxRows?: number;
    onChange?: (ev: Event) => void;
    pattern?: string;
    required?: boolean;
    rows?: number;
    style?: {};
    value?: string | number;
  }
  export class Textfield extends React.Component<TextfieldProps, {}> { }


  //---------- Tooltip
  export interface TooltipProps extends HTMLAttributes {
    children: Children;
    label: React.ReactElement<any>;
    large?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
  }
  export class Tooltip extends React.Component<TooltipProps, {}> { }

  //There is a collision in react-mdl x HTMLAttributes,DOMAttributes atributes. So I removed those atributes from React definition: onChange, label, size, title, value, rows.
  interface DOMAttributes {
    children?: React.ReactNode;
    dangerouslySetInnerHTML?: {
      __html: string;
    };

    // Clipboard Events
    onCopy?: React.ClipboardEventHandler;
    onCut?: React.ClipboardEventHandler;
    onPaste?: React.ClipboardEventHandler;

    // Composition Events
    onCompositionEnd?: React.CompositionEventHandler;
    onCompositionStart?: React.CompositionEventHandler;
    onCompositionUpdate?: React.CompositionEventHandler;

    // Focus Events
    onFocus?: React.FocusEventHandler;
    onBlur?: React.FocusEventHandler;

    // Form Events
    //onChange?: React.FormEventHandler;
    onInput?: React.FormEventHandler;
    onSubmit?: React.FormEventHandler;

    // Image Events
    onLoad?: React.ReactEventHandler;
    onError?: React.ReactEventHandler; // also a Media Event

    // Keyboard Events
    onKeyDown?: React.KeyboardEventHandler;
    onKeyPress?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;

    // Media Events
    onAbort?: React.ReactEventHandler;
    onCanPlay?: React.ReactEventHandler;
    onCanPlayThrough?: React.ReactEventHandler;
    onDurationChange?: React.ReactEventHandler;
    onEmptied?: React.ReactEventHandler;
    onEncrypted?: React.ReactEventHandler;
    onEnded?: React.ReactEventHandler;
    onLoadedData?: React.ReactEventHandler;
    onLoadedMetadata?: React.ReactEventHandler;
    onLoadStart?: React.ReactEventHandler;
    onPause?: React.ReactEventHandler;
    onPlay?: React.ReactEventHandler;
    onPlaying?: React.ReactEventHandler;
    onProgress?: React.ReactEventHandler;
    onRateChange?: React.ReactEventHandler;
    onSeeked?: React.ReactEventHandler;
    onSeeking?: React.ReactEventHandler;
    onStalled?: React.ReactEventHandler;
    onSuspend?: React.ReactEventHandler;
    onTimeUpdate?: React.ReactEventHandler;
    onVolumeChange?: React.ReactEventHandler;
    onWaiting?: React.ReactEventHandler;

    // MouseEvents
    onClick?: React.MouseEventHandler;
    onContextMenu?: React.MouseEventHandler;
    onDoubleClick?: React.MouseEventHandler;
    onDrag?: React.DragEventHandler;
    onDragEnd?: React.DragEventHandler;
    onDragEnter?: React.DragEventHandler;
    onDragExit?: React.DragEventHandler;
    onDragLeave?: React.DragEventHandler;
    onDragOver?: React.DragEventHandler;
    onDragStart?: React.DragEventHandler;
    onDrop?: React.DragEventHandler;
    onMouseDown?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseMove?: React.MouseEventHandler;
    onMouseOut?: React.MouseEventHandler;
    onMouseOver?: React.MouseEventHandler;
    onMouseUp?: React.MouseEventHandler;

    // Selection Events
    onSelect?: React.ReactEventHandler;

    // Touch Events
    onTouchCancel?: React.TouchEventHandler;
    onTouchEnd?: React.TouchEventHandler;
    onTouchMove?: React.TouchEventHandler;
    onTouchStart?: React.TouchEventHandler;

    // UI Events
    onScroll?: React.UIEventHandler;

    // Wheel Events
    onWheel?: React.WheelEventHandler;
  }

  interface HTMLAttributes extends DOMAttributes {
    // React-specific Attributes
    defaultChecked?: boolean;
    defaultValue?: string | string[];

    // Standard HTML Attributes
    accept?: string;
    acceptCharset?: string;
    accessKey?: string;
    action?: string;
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    alt?: string;
    async?: boolean;
    autoComplete?: string;
    autoFocus?: boolean;
    autoPlay?: boolean;
    capture?: boolean;
    cellPadding?: number | string;
    cellSpacing?: number | string;
    charSet?: string;
    challenge?: string;
    checked?: boolean;
    classID?: string;
    className?: string;
    cols?: number;
    colSpan?: number;
    content?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    controls?: boolean;
    coords?: string;
    crossOrigin?: string;
    data?: string;
    dateTime?: string;
    default?: boolean;
    defer?: boolean;
    dir?: string;
    disabled?: boolean;
    download?: any;
    draggable?: boolean;
    encType?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    frameBorder?: number | string;
    headers?: string;
    height?: number | string;
    hidden?: boolean;
    high?: number;
    href?: string;
    hrefLang?: string;
    htmlFor?: string;
    httpEquiv?: string;
    icon?: string;
    id?: string;
    inputMode?: string;
    integrity?: string;
    is?: string;
    keyParams?: string;
    keyType?: string;
    kind?: string;
    //label?: string;
    lang?: string;
    list?: string;
    loop?: boolean;
    low?: number;
    manifest?: string;
    marginHeight?: number;
    marginWidth?: number;
    max?: number | string;
    maxLength?: number;
    media?: string;
    mediaGroup?: string;
    method?: string;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    muted?: boolean;
    name?: string;
    nonce?: string;
    noValidate?: boolean;
    open?: boolean;
    optimum?: number;
    pattern?: string;
    placeholder?: string;
    poster?: string;
    preload?: string;
    radioGroup?: string;
    readOnly?: boolean;
    rel?: string;
    required?: boolean;
    reversed?: boolean;
    role?: string;
    //rows?: number;
    rowSpan?: number;
    sandbox?: string;
    scope?: string;
    scoped?: boolean;
    scrolling?: string;
    seamless?: boolean;
    selected?: boolean;
    shape?: string;
    //size?: number;
    sizes?: string;
    span?: number;
    spellCheck?: boolean;
    src?: string;
    srcDoc?: string;
    srcLang?: string;
    srcSet?: string;
    start?: number;
    step?: number | string;
    style?: React.CSSProperties;
    summary?: string;
    tabIndex?: number;
    target?: string;
    //title?: string;
    type?: string;
    useMap?: string;
    //value?: string | string[];
    width?: number | string;
    wmode?: string;
    wrap?: string;

    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: any;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;

    // Non-standard Attributes
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: boolean;

    // Allows aria- and data- Attributes
    [key: string]: any;
  }

}
