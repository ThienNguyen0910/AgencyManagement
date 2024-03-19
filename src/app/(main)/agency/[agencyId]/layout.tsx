import BlurPage from "@/components/global/blur-page";
import InfoBar from "@/components/global/infobar";
import SideBar from "@/components/sidebar";
import UnAuthorized from "@/components/unauthorized";
import {
  getNotificationAndUser,
  verifyAndAcceptInvitaion,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
};

const Layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitaion();
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  if (!agencyId) {
    return redirect("/agency");
  }

  if (
    user.privateMetadata.role !== "AGENCY_OWVER" &&
    user.privateMetadata.role !== "AGENCY_ADMIN"
  ) {
    <UnAuthorized />;
  }

  let allNoti: any[];
  const notifications = await getNotificationAndUser(agencyId);
  if (notifications) {
    allNoti = notifications;
  }

  return (
    <div className="h-screen overflow-hidden">
      <SideBar id={params.agencyId} type={"agency"}></SideBar>
      <div className="md:pl-[300px]">
        <InfoBar notifications={notifications} />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default Layout;
