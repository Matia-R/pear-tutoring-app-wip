import Layout from "~/components/layout/Layout";
import type { ReactElement } from "react";

export default function Pricing() {
    return (
        <div>
        </div>
    );
}

Pricing.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
