'use client';

import { useState } from "react";
import { HoveredLink, Menu, MenuItem} from "./ui/navbar-menu";
import { cn } from "@/utils/lib/utils";
import Link from "next/link";

function NavBar() {

  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl")}>
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Our Courses">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/courses">All Courses</HoveredLink>
            <HoveredLink href="/courses">
              Basic Music Theory
            </HoveredLink>
            <HoveredLink href="/courses">
              Advanced Composition
            </HoveredLink>
            <HoveredLink href="/courses">Songwriting</HoveredLink>
            <HoveredLink href="/courses">
              Music Production
            </HoveredLink>
          </div>
        </MenuItem>
         <Link href={"/contact"}>
          <MenuItem setActive={setActive} active={active} item="Contact Us">
          </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}

export default NavBar