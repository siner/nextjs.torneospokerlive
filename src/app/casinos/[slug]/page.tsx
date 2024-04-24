import { getCasino, getNextTorneosByCasino } from "@/lib/api";
import type { Metadata } from "next";
import CardCasino from "@/components/casino/CardCasino";
import RowTournament from "@/components/tournament/RowTournament";
import { remark } from "remark";
import html from "remark-html";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const casino = await getCasino(params.slug);
  if (!casino) {
    return {
      title: "Not found",
    };
  }
  return {
    title: `${casino.name} - Torneos Poker Live`,
  };
}
export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const casino = await getCasino(params.slug);
  if (!casino) {
    return <div>Not found</div>;
  }
  const torneos = await getNextTorneosByCasino(casino.id);

  const processedContent = await remark().use(html).process(casino.description);
  const contentHtml = processedContent.toString();

  return (
    <div>
      <div className="md:flex gap-4">
        <div className="w-100 md:w-4/12 mt-6">
          <CardCasino casino={casino} />
          <div className="mt-4">
            <div className="p-2 prose">{contentHtml}</div>
          </div>
        </div>
        <div className="md:w-8/12">
          {torneos.length > 0 && (
            <div>
              <h2 className="text-4xl font-bold py-4">
                Próximos Torneos en {casino.name}
              </h2>

              <div className="space-y-0.5">
                {torneos.map((torneo) => (
                  <div key={"torneo-" + torneo.id} className="w-full">
                    <RowTournament
                      torneo={torneo}
                      event={true}
                      casino={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
