import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DocumentInput } from "./document-input";
import { MenuBar } from "./menu-bar";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "../../avatars";
import { Inbox } from "../../inbox";
import { Doc } from "../../../../../../convex/_generated/dataModel";

interface NavbarProps {
  data: Doc<"documents">;
}

export const Navbar = ({ data }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href={"/"}>
          <Image src={"/logo.svg"} alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <MenuBar data={data} />
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl={"/"}
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl={"/"}
          afterSelectPersonalUrl={"/"}
        />
        <UserButton />
      </div>
    </nav>
  );
};
