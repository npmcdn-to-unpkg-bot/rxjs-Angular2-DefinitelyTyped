
declare module "react-mdl" {
  import * as React from 'react';


  //---------- Badge
  export interface BadgeProps extends React.Props<Badge> {
    text?: string | number;
    overlap?: boolean;
    noBackground?: boolean;
  }
  export class Badge extends React.Component<BadgeProps, {}> { }


  //---------- Button
  export interface ButtonProps extends React.Props<Button> {
    accent?: boolean;
    className?: string;
    colored?: boolean;
    href?: string;
    primary?: boolean;
    raised?: boolean;
    ripple?: boolean;
  }
  export class Button extends React.Component<ButtonProps, {}> { }


  //---------- Card
  export interface CardProps extends React.Props<Card> {
    className?: string;
    shadow?: number;
  }
  export class Card extends React.Component<CardProps, {}> { }


  //---------- CardActions
  export interface CardActionsProps extends React.Props<CardActions> {
    border?: boolean;
    className?: string;
  }
  export class CardActions extends React.Component<CardActionsProps, {}> { }


  //---------- CardMedia
  export interface CardMediaProps extends React.Props<CardMedia> {
    className?: string;
  }
  export class CardMedia extends React.Component<CardMediaProps, {}> { }


  //---------- CardMenu
  export interface CardMenuProps extends React.Props<CardMenu> {
    className?: string;
  }
  export class CardMenu extends React.Component<CardMenuProps, {}> { }


  //---------- CardText
  export interface CardTextProps extends React.Props<CardText> {
    className?: string;
  }
  export class CardText extends React.Component<CardTextProps, {}> { }


  //---------- CardTitle
  export interface CardTitleProps extends React.Props<CardTitle> {
    className?: string;
    expand?: boolean;
  }
  export class CardTitle extends React.Component<CardTitleProps, {}> { }


  //---------- Cell
  export interface CellProps extends React.Props<Cell> {
    align?: 'top' | 'middle' | 'bottom' | 'stretch';
    className?: string;
    col: number;
    phone?: number;
    tablet?: number;
    hideDesktop?: boolean;
    hidePhone?: boolean;
    hideTablet?: boolean;
    shadow?: number;
  }
  export class Cell extends React.Component<CellProps, {}> { }


  //---------- Checkbox
  export interface CheckboxProps extends React.Props<Checkbox> {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    label?: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class Checkbox extends React.Component<CheckboxProps, {}> { }


  //---------- Content
  export interface ContentProps extends React.Props<Content> {
    className?: string;
  }
  export class Content extends React.Component<ContentProps, {}> { }


  //---------- Dialog
  export interface DialogProps extends React.Props<Dialog> {
    className?: string;
    onCancel?: () => void;
    open?: boolean;
  }
  export class Dialog extends React.Component<DialogProps, {}> { }


  //---------- DialogActions
  export interface DialogActionsProps extends React.Props<DialogActions> {
    className?: string;
    fullWidth?: boolean;
  }
  export class DialogActions extends React.Component<DialogActionsProps, {}> { }


  //---------- DialogContent
  export interface DialogContentProps extends React.Props<DialogContent> {
    className?: string;
  }
  export class DialogContent extends React.Component<DialogContentProps, {}> { }


  //---------- DialogTitle
  export interface DialogTitleProps extends React.Props<DialogTitle> {
    className?: string;
  }
  export class DialogTitle extends React.Component<DialogTitleProps, {}> { }


  //---------- Drawer
  export interface DrawerProps extends React.Props<Drawer> {
    className?: string;
    title?: React.ReactElement<any>;
  }
  export class Drawer extends React.Component<DrawerProps, {}> { }


  //---------- FABButton
  export interface FABButtonProps extends React.Props<FABButton> {
    className?: string;
    mini?: boolean;
  }
  export class FABButton extends React.Component<FABButtonProps, {}> { }


  //---------- Footer
  export interface FooterProps extends React.Props<Footer> {
    className?: string;
    size?: 'mini' | 'mega';
  }
  export class Footer extends React.Component<FooterProps, {}> { }


  //---------- FooterDropDownSection
  export interface FooterDropDownSectionProps extends React.Props<FooterDropDownSection> {
    className?: string;
    size?: 'mini' | 'mega';
    title: React.ReactElement<any>;
  }
  export class FooterDropDownSection extends React.Component<FooterDropDownSectionProps, {}> { }


  //---------- FooterLinkList
  export interface FooterLinkListProps extends React.Props<FooterLinkList> {
    className?: string;
    size?: 'mini' | 'mega';
  }
  export class FooterLinkList extends React.Component<FooterLinkListProps, {}> { }


  //---------- FooterSection
  export interface FooterSectionProps extends React.Props<FooterSection> {
    className?: string;
    logo?: React.ReactElement<any>;
    size?: 'mini' | 'mega';
    type?: 'top' | 'middle' | 'bottom' | 'left' | 'right';
  }
  export class FooterSection extends React.Component<FooterSectionProps, {}> { }


  //---------- Grid
  export interface GridProps extends React.Props<Grid> {
    className?: string;
    noSpacing?: boolean;
    shadow?: number;
  }
  export class Grid extends React.Component<GridProps, {}> { }


  //---------- Header
  export interface HeaderProps extends React.Props<Header> {
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
  export interface HeaderRowProps extends React.Props<HeaderRow> {
    className?: string;
    title?: React.ReactElement<any>;
  }
  export class HeaderRow extends React.Component<HeaderRowProps, {}> { }


  //---------- HeaderTabs
  export interface HeaderTabsProps extends React.Props<HeaderTabs> {
    activeTab?: number;
    className?: string;
    onChange?: (tabId: string) => void;
    ripple?: boolean;
  }
  export class HeaderTabs extends React.Component<HeaderTabsProps, {}> { }


  //---------- Icon
  export interface IconProps extends React.Props<Icon> {
    className?: string;
    name: string;
  }
  export class Icon extends React.Component<IconProps, {}> { }


  //---------- IconButton
  export interface IconButtonProps extends React.Props<IconButton> {
    className?: string;
    name: string;
  }
  export class IconButton extends React.Component<IconButtonProps, {}> { }


  //---------- IconToggle
  export interface IconToggleProps extends React.Props<IconToggle> {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    name: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class IconToggle extends React.Component<IconToggleProps, {}> { }


  //---------- Layout
  export interface LayoutProps extends React.Props<Layout> {
    className?: string;
    fixedDrawer?: boolean;
    fixedHeader?: boolean;
    fixedTabs?: boolean;
  }
  export class Layout extends React.Component<LayoutProps, {}> { }


  //---------- List
  export interface ListProps extends React.Props<List> {
    className?: string;
  }
  export class List extends React.Component<ListProps, {}> { }


  //---------- ListItem
  export interface ListItemProps extends React.Props<ListItem> {
    className?: string;
    twoLine?: boolean;
    threeLine?: boolean;
  }
  export class ListItem extends React.Component<ListItemProps, {}> { }


  //---------- ListItemAction
  export interface ListItemActionProps extends React.Props<ListItemAction> {
    className?: string;
    info?: string;
  }
  export class ListItemAction extends React.Component<ListItemActionProps, {}> { }


  //---------- ListItemContent
  export interface ListItemContentProps extends React.Props<ListItemContent> {
    avatar?: string;
    className?: string;
    icon?: string;
    subtitle?: React.ReactElement<any>;
    useBodyClass?: boolean;
  }
  export class ListItemContent extends React.Component<ListItemContentProps, {}> { }


  //---------- Menu
  export interface MenuProps extends React.Props<Menu> {
    align?: 'left' | 'right';
    className?: string;
    ripple?: boolean;
    target: string;
    valign?: 'bottom' | 'top';
  }
  export class Menu extends React.Component<MenuProps, {}> { }


  //---------- MenuItem
  export interface MenuItemProps extends React.Props<MenuItem> {
    className?: string;
  }
  export class MenuItem extends React.Component<MenuItemProps, {}> { }


  //---------- Navigation
  export interface NavigationProps extends React.Props<Navigation> {
    className?: string;
  }
  export class Navigation extends React.Component<NavigationProps, {}> { }


  //---------- ProgressBar
  export interface ProgressBarProps extends React.Props<ProgressBar> {
    buffer?: number;
    className?: string;
    indeterminate?: boolean;
    progress?: number;
  }
  export class ProgressBar extends React.Component<ProgressBarProps, {}> { }


  //---------- Radio
  export interface RadioProps extends React.Props<Radio> {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    name?: string;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
    value: string | number;
  }
  export class Radio extends React.Component<RadioProps, {}> { }


  //---------- RadioGroup
  export interface RadioGroupProps extends React.Props<RadioGroup> {
    childContainer?: string;
    container?: string;
    name: string;
    onChange?: (ev: Event) => void;
    value: string | number;
  }
  export class RadioGroup extends React.Component<RadioGroupProps, {}> { }


  //---------- Slider
  export interface SliderProps extends React.Props<Slider> {
    className?: string;
    max?: number;
    min?: number;
    onChange?: (ev: Event) => void;
    value?: number;
  }
  export class Slider extends React.Component<SliderProps, {}> { }


  //---------- Snackbar
  export interface SnackbarProps extends React.Props<Snackbar> {
    action?: string;
    active: boolean;
    className?: string;
    onActionClick?: (ev: Event) => void;
    onTimeout: () => void;
    timeout?: number;
  }
  export class Snackbar extends React.Component<SnackbarProps, {}> { }


  //---------- Spacer
  export interface SpacerProps extends React.Props<Spacer> {
    className?: string;
  }
  export class Spacer extends React.Component<SpacerProps, {}> { }


  //---------- Spinner
  export interface SpinnerProps extends React.Props<Spinner> {
    className?: string;
    singleColor?: boolean;
  }
  export class Spinner extends React.Component<SpinnerProps, {}> { }


  //---------- Switch
  export interface SwitchProps extends React.Props<Switch> {
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    onChange?: (ev: Event) => void;
    ripple?: boolean;
  }
  export class Switch extends React.Component<SwitchProps, {}> { }


  //---------- Tab
  export interface TabProps extends React.Props<Tab> {
    active?: boolean;
    className?: string;
    cssPrefix?: string;
    onTabClick?: (tabId: string) => void;
    style?: {};
    tabId?: number;
  }
  export class Tab extends React.Component<TabProps, {}> { }


  //---------- TabBar
  export interface TabBarProps extends React.Props<TabBar> {
    activeTab?: number;
    className?: string;
    cssPrefix: string;
    onChange?: (tabId: string) => void;
  }
  export class TabBar extends React.Component<TabBarProps, {}> { }


  //---------- Table
  export interface TableProps extends React.Props<Table> {
    rows: Array<{}>;
    sortable?: boolean;
  }
  export class Table extends React.Component<TableProps, {}> { }


  //---------- TableHeader
  export interface TableHeaderProps extends React.Props<TableHeader> {
    cellFormatter?: (val:string, row: any, rowIndex:number) => string;
    className?: string;
    name: string;
    numeric?: boolean;
    onClick?: (ev: Event, tabId: string) => void;
    nosort?: boolean;
    sortFn?: (a: string, b: string, isAsc: boolean) => number;
    tooltip?: React.ReactElement<any>;
  }
  export class TableHeader extends React.Component<TableHeaderProps, {}> { }


  //---------- Tabs
  export interface TabsProps extends React.Props<Tabs> {
    activeTab?: number;
    className?: string;
    onChange?: (tabId: string) => void;
    ripple?: boolean;
    tabBarProps?: {};
  }
  export class Tabs extends React.Component<TabsProps, {}> { }


  //---------- Textfield
  export interface TextfieldProps extends React.Props<Textfield> {
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
  export interface TooltipProps extends React.Props<Tooltip> {
    label: React.ReactElement<any>;
    large?: boolean;
    position?: 'left' | 'right' | 'top' | 'bottom';
  }
  export class Tooltip extends React.Component<TooltipProps, {}> { }

}
