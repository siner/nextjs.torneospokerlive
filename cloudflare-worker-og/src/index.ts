import satori from "satori";
import { Resvg } from "@resvg/resvg-wasm";
import initWasm from "@resvg/resvg-wasm/index_bg.wasm";

// Caché para las fuentes y WASM
let fontCache: ArrayBuffer | null = null;
let wasmInitialized = false;

// Funciones para calcular contraste y color de texto
function getRGB(c: string): number {
  return parseInt(c, 16);
}

function getsRGB(c: string): number {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor: string): number {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f: string, b: string): number {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function getTextColor(bgColor: string): string {
  const whiteContrast = getContrast(bgColor, "#ffffff");
  const blackContrast = getContrast(bgColor, "#000000");
  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}

async function loadFont(): Promise<ArrayBuffer> {
  if (fontCache) {
    return fontCache;
  }

  // Cargar fuente Inter desde CDN
  const fontResponse = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.15/files/inter-latin-400-normal.woff"
  );

  if (!fontResponse.ok) {
    throw new Error("Failed to load font");
  }

  fontCache = await fontResponse.arrayBuffer();
  return fontCache;
}

const worker = {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Obtener parámetros
    const name = url.searchParams.get("name") || "Torneos Poker Live";
    const logoUrl = url.searchParams.get("logo") || "";
    const color = decodeURIComponent(
      url.searchParams.get("color") || "#ffffff"
    );
    const subtitle = url.searchParams.get("subtitle") || "Torneos Poker Live";
    const type = url.searchParams.get("type") || "default"; // casino, torneo, evento, circuito

    try {
      // Función helper para cargar imágenes
      const loadImage = async (url: string): Promise<string> => {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "TorneosPokerLive-OG-Generator/1.0",
            },
          });
          if (response.ok) {
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            let binary = "";
            for (let i = 0; i < bytes.byteLength; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            const base64 = btoa(binary);
            const contentType =
              response.headers.get("content-type") || "image/png";
            return `data:${contentType};base64,${base64}`;
          }
        } catch (e) {
          console.error("Error loading image:", url, e);
        }
        return "";
      };

      // Cargar logos (puede ser múltiples para eventos, separados por coma)
      const logoUrls = logoUrl
        ? logoUrl.split(",").filter((u) => u.trim())
        : [];
      const logosRaw = await Promise.all(
        logoUrls.map((url) => loadImage(url.trim()))
      );
      const logos = logosRaw.filter((l) => l); // Filtrar logos que no se pudieron cargar
      const watermarkLogo = await loadImage(
        "https://torneospokerlive.com/logo-torneospokerlive.png"
      );

      // Calcular color de texto según fondo
      const textColor = getTextColor(color);
      const isLightBg = textColor === "#000000";

      // Diseño según tipo
      let content;

      if (type === "torneo") {
        content = {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              padding: "60px",
            },
            children: [
              // Logo(s)
              logos.length > 0
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "30px",
                        marginBottom: "40px",
                      },
                      children: logos.map((logo) => ({
                        type: "img",
                        props: {
                          src: logo,
                          width: logos.length > 1 ? 300 : 400,
                          height: logos.length > 1 ? 150 : 200,
                          style: {
                            objectFit: "contain",
                          },
                        },
                      })),
                    },
                  }
                : null,
              // Nombre del torneo
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "48px",
                    fontWeight: 700,
                    fontFamily: "Inter",
                    color: textColor,
                    textAlign: "center",
                    marginBottom: "20px",
                    maxWidth: "900px",
                  },
                  children: name,
                },
              },
              // Buy-in o subtítulo
              subtitle !== "Torneos Poker Live"
                ? {
                    type: "div",
                    props: {
                      style: {
                        fontSize: "64px",
                        fontWeight: 700,
                        fontFamily: "Inter",
                        color: textColor,
                        textAlign: "center",
                      },
                      children: subtitle,
                    },
                  }
                : null,
              // Logo marca de agua
              watermarkLogo
                ? {
                    type: "img",
                    props: {
                      src: watermarkLogo,
                      width: 150,
                      height: 50,
                      style: {
                        objectFit: "contain",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        opacity: 0.7,
                        filter: isLightBg ? "none" : "brightness(0) invert(1)",
                      },
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        };
      } else if (type === "evento") {
        content = {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              padding: "60px",
            },
            children: [
              // Logo(s) - eventos pueden tener casino + circuito
              logos.length > 0
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "30px",
                        marginBottom: "40px",
                      },
                      children: logos.map((logo) => ({
                        type: "img",
                        props: {
                          src: logo,
                          width: logos.length > 1 ? 300 : 400,
                          height: logos.length > 1 ? 150 : 200,
                          style: {
                            objectFit: "contain",
                          },
                        },
                      })),
                    },
                  }
                : null,
              // Nombre del evento
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "56px",
                    fontWeight: 700,
                    fontFamily: "Inter",
                    color: textColor,
                    textAlign: "center",
                    marginBottom: "20px",
                    maxWidth: "900px",
                  },
                  children: name,
                },
              },
              // Fechas
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "32px",
                    fontWeight: 500,
                    fontFamily: "Inter",
                    color: textColor,
                    textAlign: "center",
                  },
                  children: subtitle,
                },
              },
              // Logo marca de agua
              watermarkLogo
                ? {
                    type: "img",
                    props: {
                      src: watermarkLogo,
                      width: 150,
                      height: 50,
                      style: {
                        objectFit: "contain",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        opacity: 0.7,
                        filter: isLightBg ? "none" : "brightness(0) invert(1)",
                      },
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        };
      } else {
        // casino, circuito o default
        content = {
          type: "div",
          props: {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: color,
              padding: "80px",
            },
            children: [
              // Logo(s) - si hay múltiples, mostrarlos en fila
              logos.length > 0
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "40px",
                      },
                      children: logos.map((logo) => ({
                        type: "img",
                        props: {
                          src: logo,
                          width: logos.length > 1 ? 450 : 600,
                          height: logos.length > 1 ? 300 : 400,
                          style: {
                            objectFit: "contain",
                          },
                        },
                      })),
                    },
                  }
                : null,
              // Logo marca de agua
              watermarkLogo
                ? {
                    type: "img",
                    props: {
                      src: watermarkLogo,
                      width: 150,
                      height: 50,
                      style: {
                        objectFit: "contain",
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        opacity: 0.7,
                        filter: isLightBg ? "none" : "brightness(0) invert(1)",
                      },
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        };
      }

      // Cargar fuente
      const fontData = await loadFont();

      // Generar SVG con satori
      const svg = await satori(content as any, {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            weight: 400,
            style: "normal",
          },
        ],
      });

      // Inicializar WASM si es necesario
      if (!wasmInitialized) {
        await initWasm(initWasm as any);
        wasmInitialized = true;
      }

      // Convertir SVG a PNG usando resvg-wasm
      const resvg = new Resvg(svg, {
        fitTo: {
          mode: "width",
          value: 1200,
        },
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      return new Response(pngBuffer, {
        headers: {
          ...corsHeaders,
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (error: any) {
      return new Response(`Error: ${error.message}`, {
        status: 500,
        headers: corsHeaders,
      });
    }
  },
};

export default worker;
