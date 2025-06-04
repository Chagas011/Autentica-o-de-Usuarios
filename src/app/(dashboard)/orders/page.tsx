"use client";

import { Order } from "@/app/api/orders/route";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get("/api/orders");
        setOrders(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos de {user.email}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Preço
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
