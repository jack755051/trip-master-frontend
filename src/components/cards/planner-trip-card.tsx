import { PlannerTripCardData } from "@/src/types/trip.type";

interface PlannerTripCardProps extends PlannerTripCardData {
  customClass?: string;
}

export default function PlannerTripCard(prop: PlannerTripCardProps) {}
