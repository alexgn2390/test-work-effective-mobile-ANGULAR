export interface TreeNode {
  title: string;
  name: string;
  children?: TreeNodeChildren[];
  checked?: boolean;
}

export interface TreeNodeChildren {
  name: string;
  checked?: boolean;
}
