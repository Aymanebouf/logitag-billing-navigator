
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "primeicons/primeicons.css";

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isSubmenuOpen?: boolean;
  subItems?: Array<{
    icon: string;
    label: string;
    path: string;
  }>;
  onToggleSubmenu?: () => void;
}

const NavItem = ({ 
  icon, 
  label, 
  path, 
  isActive, 
  hasSubmenu = false, 
  isSubmenuOpen = false,
  subItems = [],
  onToggleSubmenu 
}: NavItemProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        text
        className={`w-full justify-content-start p-link p-3 ${isActive ? 'bg-primary-100' : ''}`}
        onClick={() => {
          if (hasSubmenu && onToggleSubmenu) {
            onToggleSubmenu();
          } else {
            navigate(path);
          }
        }}
      >
        <i className={`${icon} mr-2`}></i>
        <span>{label}</span>
        {hasSubmenu && (
          <i className={`pi pi-chevron-${isSubmenuOpen ? 'down' : 'right'} ml-auto`}></i>
        )}
      </Button>
      {isSubmenuOpen && subItems.length > 0 && (
        <div className="ml-4 mt-1">
          {subItems.map((item) => (
            <Button
              key={item.path}
              text
              className={`w-full justify-content-start p-3 pl-5 ${location.pathname === item.path ? 'bg-primary-50' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <i className={`${item.icon} mr-2`}></i>
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [openSubmenu, setOpenSubmenu] = useState<string | null>("factures-client");

  const factureClientSubmenu = [
    {
      icon: "pi pi-calendar",
      label: "Génération factures",
      path: "/factures-client/a-facturer",
    },
    {
      icon: "pi pi-file",
      label: "Gestion factures",
      path: "/factures-client/factures",
    },
    {
      icon: "pi pi-refresh",
      label: "Factures permanentes",
      path: "/factures-client/permanentes",
    },
    {
      icon: "pi pi-inbox",
      label: "Documents archivés",
      path: "/factures-client/archive",
    },
    {
      icon: "pi pi-check-square",
      label: "Validation documents",
      path: "/factures-client/validation",
    },
    {
      icon: "pi pi-cog",
      label: "Configuration",
      path: "/factures-client/parametres",
    },
  ];

  return (
    <nav className="p-3">
      <NavItem
        icon="pi pi-home"
        label="Dashboard"
        path="/"
        isActive={currentPath === "/"}
        hasSubmenu={false}
      />
      <NavItem
        icon="pi pi-file"
        label="Factures Client"
        path="/factures-client"
        isActive={currentPath.startsWith("/factures-client")}
        hasSubmenu
        isSubmenuOpen={openSubmenu === "factures-client"}
        subItems={factureClientSubmenu}
        onToggleSubmenu={() => setOpenSubmenu(openSubmenu === "factures-client" ? null : "factures-client")}
      />
      <NavItem
        icon="pi pi-file-o"
        label="Factures Fournisseur"
        path="/factures-fournisseur"
        isActive={currentPath === "/factures-fournisseur"}
        hasSubmenu={false}
      />
      <NavItem
        icon="pi pi-box"
        label="Inventory"
        path="/inventory"
        isActive={currentPath === "/inventory"}
      />
      <NavItem
        icon="pi pi-chart-bar"
        label="Rapports"
        path="/rapports"
        isActive={currentPath === "/rapports"}
      />
      <NavItem
        icon="pi pi-cog"
        label="Paramètres"
        path="/parametres"
        isActive={currentPath === "/parametres"}
        hasSubmenu={false}
      />
    </nav>
  );
}
