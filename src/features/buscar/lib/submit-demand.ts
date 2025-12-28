export type LeadProfile = "client" | "barbershop";

export async function submitDemand(_payload: {
  email?: string;
  city: string;
  profile: LeadProfile;
  source: "buscar";
}) {
  await new Promise((resolve) => setTimeout(resolve, 650));
}

export function hasBarbershops(_city: string) {
  return false;
}
