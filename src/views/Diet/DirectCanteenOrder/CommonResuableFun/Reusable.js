

export const groupOrders = (orders = []) => {
    const map = {};

    orders?.forEach(item => {
        const key =
            item.type === "CANTEEN"
                ? item.canteen_order_id
                : `extra-${item.extra_order_id}`;

        if (!map[key]) {
            map[key] = {
                order_time: item.order_time,
                order_status: item.order_status,
                type: item.type,
                items: []
            };
        }

        map[key].items.push(item);
    });

    return Object.values(map).sort(
        (a, b) => new Date(b.order_time) - new Date(a.order_time)
    );
};