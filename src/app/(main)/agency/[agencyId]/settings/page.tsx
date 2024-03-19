import AgencyDetails from "@/components/forms/agencyDetail";
import UserDetail from "@/components/forms/user-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: { agencyId: string };
};

const SettingPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const userDetail = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!userDetail) return null;
  const agencyDetails = await db.agency.findUnique({
    where: { id: params.agencyId },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return null;

  const subAccounts = agencyDetails.SubAccount;

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <UserDetail
        type="agency"
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetail}
      />
    </div>
  );
};

export default SettingPage;
