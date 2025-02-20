import { Layout } from "@/_components/shared/ui/layout";
import { Suspense } from "react";
import { BasicData, Conditions } from "@/_components/static/functions";

export const StaticPageContent = ({ slug }) => {
  return (
    <Layout className={`!font-sans mt-5 lg:mt-20`}>
      <Suspense
        fallback={
          <>
            <div className={`h-40 w-full animate-pulse bg-slate-300`} />
            <div className={`mt-10 grid grid-cols-2 gap-10`}>
              <div
                className={`col-span-2 aspect-video animate-pulse bg-slate-300 lg:col-span-1`}
              ></div>
              <div
                className={`col-span-2 aspect-video animate-pulse bg-slate-300 lg:col-span-1`}
              ></div>
            </div>
          </>
        }
      >
        <BasicData slug={slug}>
          <Suspense fallback={<div className={``} />}>
            <Conditions slug={slug} />
          </Suspense>
        </BasicData>
      </Suspense>
    </Layout>
  );
};
