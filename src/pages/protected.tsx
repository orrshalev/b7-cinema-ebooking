import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Protected: NextPage = (): JSX.Element => {
    const { status, data } = useSession();

    if (status == "unauthenticated") {
        return (
            <div className="text-center text-3xl font-semibold text-dark-red">
                Please log in to see this page.
            </div>
        );
    }

    if (status == "authenticated")
    return (
        <div className="text-center text-3xl font-semibold text-dark-red">
            This page is protected for special people like{"\n"}
            {JSON.stringify(data.user, null, 2)}
        </div>
    );

    return<div>Loading</div>
};

export default Protected;