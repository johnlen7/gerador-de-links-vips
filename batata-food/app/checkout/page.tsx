'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatCurrency } from '@/lib/utils';
import { Address, PaymentMethod } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Seu carrinho está vazio
        </h1>
        <button
          onClick={() => router.push('/')}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition"
        >
          Ver produtos
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular processamento do pedido
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();
    clearCart();
    router.push(`/pedido/${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Pedido</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Endereço de Entrega
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    required
                    value={address.zipCode}
                    onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    placeholder="00000-000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Rua
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    required
                    value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Complemento
                  </label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Bairro
                  </label>
                  <input
                    type="text"
                    required
                    value={address.neighborhood}
                    onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Cidade
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Forma de Pagamento
              </h2>
              
              <div className="space-y-3">
                {[
                  { value: 'credit_card', label: 'Cartão de Crédito', icon: '💳' },
                  { value: 'debit_card', label: 'Cartão de Débito', icon: '💳' },
                  { value: 'pix', label: 'PIX', icon: '📱' },
                  { value: 'cash', label: 'Dinheiro', icon: '💵' },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                      paymentMethod === method.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-5 h-5"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-semibold text-gray-800">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-secondary-500 text-white hover:bg-secondary-600'
              }`}
            >
              {isProcessing ? 'Processando...' : 'Confirmar Pedido'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Resumo do Pedido
            </h2>

            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Taxa de entrega</span>
                <span className="font-semibold">{formatCurrency(cart.deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency(cart.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
