import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Blog Post";

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        backgroundColor: "#000",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 80px",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 60,
            fontWeight: "bold",
            lineHeight: 1.2,
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          William de Azevedo
        </p>
      </div>
    </div>,
    {
      height: 630,
      width: 1200,
    }
  );
}
