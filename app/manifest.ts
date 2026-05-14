import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Levo Tennis Billing",
    short_name: "LevoBilling",
    description: "Mobile-first tennis academy POS and billing app",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0e7490"
  };
}
