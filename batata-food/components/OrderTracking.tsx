'use client';

import { OrderStatus } from '@/lib/types';
import { getOrderStatusText } from '@/lib/utils';

interface OrderTrackingProps {
  status: OrderStatus;
  estimatedDelivery: Date;
}

const statusSteps: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'delivering',
  'delivered',
];

export default function OrderTracking({ status, estimatedDelivery }: OrderTrackingProps) {
  const currentStepIndex = statusSteps.indexOf(status);

  const getStepIcon = (step: OrderStatus) => {
    const icons: Record<OrderStatus, string> = {
      pending: '⏳',
      confirmed: '✅',
      preparing: '👨‍🍳',
      ready: '📦',
      delivering: '🚚',
      delivered: '🎉',
      cancelled: '❌',
    };
    return icons[step];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Acompanhe seu pedido
      </h2>
      <p className="text-gray-600 mb-6">
        Previsão de entrega: {estimatedDelivery.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      <div className="space-y-4">
        {statusSteps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
                    isCompleted
                      ? 'bg-secondary-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-secondary-200 animate-pulse' : ''}`}
                >
                  {getStepIcon(step)}
                </div>
                {index < statusSteps.length - 1 && (
                  <div
                    className={`w-1 h-12 transition ${
                      isCompleted ? 'bg-secondary-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pt-2">
                <h3
                  className={`font-semibold ${
                    isCompleted ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {getOrderStatusText(step)}
                </h3>
                {isCurrent && (
                  <p className="text-sm text-secondary-600 font-semibold mt-1">
                    Em andamento...
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
