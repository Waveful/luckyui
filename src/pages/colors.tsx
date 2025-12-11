import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { colors, ColorScopes } from "@/theme";

export default function ColorsPage() {
  const scopes: ColorScopes = colors.scopes;

  const hexToRgb = (hex: string) => {
    const normalized = hex.replace("#", "");
    const bigint = parseInt(
      normalized.length === 3
        ? normalized
            .split("")
            .map((c) => c + c)
            .join("")
        : normalized,
      16
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const getLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const srgb = [r, g, b].map((v) => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    const [rl, gl, bl] = srgb;
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
  };

  const getContrastText = (hex: string) => {
    try {
      const lum = getLuminance(hexToRgb(hex));
      return lum > 0.5 ? "#111827" : "#FFFFFF";
    } catch {
      return "#111827";
    }
  };

  return (
    <div className="py-8">
      <Head>
        <title>LuckyUI — Colors</title>
        <meta
          name="description"
          content="Color palette and scales used across LuckyUI."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-2">Colors</h1>
      <p className="text-[hsl(var(--muted-foreground))] mb-8">
        The LuckyUI color palette with semantic color tokens.
      </p>

      <div className="space-y-8">
        {Object.entries(scopes).map(([scopeName, scopeValues]) => {
          const entries = Object.entries(scopeValues);
          const flat = entries.filter(
            ([, v]) => typeof v === "string"
          ) as Array<[string, string]>;
          const groups = entries.filter(
            ([, v]) => typeof v === "object"
          ) as Array<[string, Record<string, string>]>;

          return (
            <section key={scopeName}>
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {scopeName}
              </h2>

              {flat.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {flat.map(([name, value]) => (
                    <Card key={name} className="overflow-hidden">
                      <div
                        className="h-20 flex items-end justify-start p-2"
                        style={{
                          background: value,
                          color: getContrastText(value),
                        }}
                      >
                        <span className="text-xs font-mono">{value}</span>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">{name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {groups.length > 0 && (
                <div className="space-y-4">
                  {groups.map(([groupName, values]) => (
                    <Card key={groupName}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base capitalize">
                          {groupName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-2">
                          {Object.entries(values)
                            .sort(([a], [b]) => {
                              // Sort numerically if both are numbers
                              const numA = Number(a);
                              const numB = Number(b);
                              if (!isNaN(numA) && !isNaN(numB)) {
                                return numA - numB;
                              }
                              return a.localeCompare(b);
                            })
                            .map(([step, hex]) => (
                            <div
                              key={step}
                              className="text-center"
                            >
                              <div
                                className="h-12 rounded-lg mb-1 flex items-center justify-center text-[10px] font-mono"
                                style={{
                                  background: hex,
                                  color: getContrastText(hex),
                                }}
                                title={hex}
                              >
                                {hex}
                              </div>
                              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                                {step}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
