export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function calculateCartTotal(items: any[]): number {
  return items.reduce((total, item) => total + item.subtotal, 0);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    frita: 'Batata Frita',
    assada: 'Batata Assada',
    doce: 'Batata Doce',
    rosti: 'Batata Rösti',
    gratinada: 'Batata Gratinada',
    hasselback: 'Batata Hasselback',
    pure: 'Purê de Batata',
    croquete: 'Croquete',
  };
  return names[category] || category;
}

export function getOrderStatusText(status: string): string {
  const texts: Record<string, string> = {
    pending: 'Aguardando confirmação',
    confirmed: 'Pedido confirmado',
    preparing: 'Preparando seu pedido',
    ready: 'Pedido pronto',
    delivering: 'Saiu para entrega',
    delivered: 'Pedido entregue',
    cancelled: 'Pedido cancelado',
  };
  return texts[status] || status;
}
