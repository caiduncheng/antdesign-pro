export interface TableListItem {
  name: string;
  icon?: string;
  parentId?: number;
  children?: TableListItem[];
  url?: string;
  perms?: string;
  parentName?: string;
  orderNum: number;
  label: { name: string; color: string };
  menuId: number;
  type?: number;
}
