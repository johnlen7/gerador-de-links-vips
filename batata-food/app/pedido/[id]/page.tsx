'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import OrderTracking from '@/components/OrderTracking';
import { OrderStatus } from '@/lib/types';

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [estimatedDelivery] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45);
    return now;
  });

  // Simular progressão do pedido
  useEffect(() => {
    const statusProgression: OrderStatus[] = [
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'delivering',
      'delivered',
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statusProgression.length) {
        setStatus(statusProgression[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 5000); // Muda status a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="bg-secondary-50 border-2 border-secondary-500 rounded-lg p-6 mb-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pedido Confirmado!
          </h1>
          <p className="text-gray-600 mb-4">
            Número do pedido: <span className="font-bold text-primary-600">#{params.id}</span>
          </p>
          <p className="text-gray-600">
            Suas batatas deliciosas estão a caminho! 🥔
          </p>
        </div>

        {/* Order Tracking */}
        <OrderTracking status={status} estimatedDelivery={estimatedDelivery} />

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition font-semibold"
          >
            Fazer Novo Pedido
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full bg-white text-gray-700 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition font-semibold"
          >
            Voltar ao Início
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">Precisa de ajuda?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Entre em contato conosco se tiver alguma dúvida sobre seu pedido.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              <span>📱</span>
              <span>(11) 99999-9999</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span>📧</span>
              <span>contato@batatafood.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
