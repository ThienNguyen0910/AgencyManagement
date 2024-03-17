import { getAuthUserDetails, verifyAndAcceptInvitaion } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";
import { Plan } from "../../../../prisma/prisma-client";
import { currentUser } from "@clerk/nextjs";
import AgencyDetails from "@/components/forms/agencyDetail";

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  const agencyId = await verifyAndAcceptInvitaion();

  console.log(agencyId);

  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("__")[0];
        const stateAgencyId = searchParams.state.split("__")[1];
        if (!stateAgencyId) {
          return <div>not authorized</div>;
        }

        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>not authorized</div>;
    }
  }

  const authUser = await currentUser();

  return (
    <div className="flex-center mt-4">
      <div className="max-w-[850px] boder-[1px] p-4 rounded-xl">
        <h1 className="text-4xl">Create an agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default Page;
