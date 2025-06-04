import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

export type Order = {
  id: string;
  name: string;
  price: string;
};

const data: Order[] = [
  {
    id: "1",
    name: "Teclado Mecânico RGB",
    price: "R$ 349,90",
  },
  {
    id: "2",
    name: "Mouse Gamer 7200 DPI",
    price: "R$ 149,90",
  },
  {
    id: "3",
    name: "Monitor 24'' Full HD",
    price: "R$ 899,90",
  },
  {
    id: "4",
    name: "Headset com Microfone",
    price: "R$ 199,90",
  },
  {
    id: "5",
    name: "Cadeira Gamer Ergonômica",
    price: "R$ 1.299,90",
  },
];

export const GET = withAuth(async () => {
  return NextResponse.json({
    data,
  });
});
