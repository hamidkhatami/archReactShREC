import { MenuItemType } from "@/types/menuItems";

export const generateRoutes = (items: MenuItemType[]) => {
  const routes: { path: string; component: React.FC }[] = [];

  items.forEach((item) => {
    
      if (item.path && item.component) {
        routes.push({
          path: item.path,
          component: item.component,
        });
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.path && child.component) {
            routes.push({
              path: child.path,
              component: child.component,
            });
          }
        });
      }
    
  });

  return routes;
};
