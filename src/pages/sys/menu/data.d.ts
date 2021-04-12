export interface TableListItem {
  name: string;
  icon?: string;
  parent?: string;
  children?: TableListItem[];
  url?: string;
  authorizeSign?: string;
  parentName?: string;
  orderNum: number;
  label: { name: string; color: string };
  menuId: number;
  type?: number;
}
