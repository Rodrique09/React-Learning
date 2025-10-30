import OrdersHeader from './OrdersHeader';
import { OrdersDetailsGrid } from './OrdersDetailsGrid';

export function OrdersGrid({orders}) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">
                        <OrdersHeader order={order} />
                        <OrdersDetailsGrid order={order} />
                    </div>
                )
            })}
        </div>
    );
}