namespace Res {
  /**
   * 公共返回参数
   */
  export interface ResponseResult<T = Object> {
    /** @name 响应码 */
    code: string;
    /** @name 返回信息 */
    msg: string;
    /** @name 返回实体 */
    data: T;
  }

  /**
   * 登录相应参数
   */

  export interface LoginData {
    /** @name 权限token */
    token: string;
  }

  /** 菜单 */
  export interface Menu {
    /** @name 创建时间 */
    creTime: string;
    /** @name 创建者id */
    creUserId: number;
    /** @name 菜单图标 */
    icon?: string;
    /** @name 菜单id */
    menuId: number;
    /** @name 菜单名称 */
    name: string;
    /** @name 是否默认打开 */
    open: boolean;
    /** @name 排序序号 */
    orderNum: number;
    /** @name 父级菜单id */
    parentId?: number;
    /** @name 父级菜单名称 */
    parentName?: string;
    /** @name 权限 */
    perms?: string;
    /** @name 菜单类型 */
    type: 0 | 1 | 2;
    /** @name 更新时间 */
    updTime?: string;
    /** @name 更新者id */
    updUserId?: number;
    /** @name 菜单地址 */
    url?: string;
  }

  export interface MenuList {
    /** 菜单列表 */
    menuList: Menu[];
  }

  export interface Role {
    /** @name 创建时间 */
    creTime: string;
    /** @name 用户id */
    creUserId: number;
    /** @name 菜单id列表 */
    menuIdList: number[];
    /**  */
    preInstallSign: 0 | 1;
  }

  export interface RoleList {
    count: number;
    data: T;
  }
}
