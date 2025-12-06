import { Injectable, signal, computed } from '@angular/core';
import { GpuResponse } from '../../lib/interfaces/IGpu';
import { CartItem } from '../../lib/interfaces/ICart';

@Injectable({
    providedIn: 'root',
})
export class CartService {

    private STORAGE_KEY = 'cart-items';

    private loadInitial(): CartItem[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    }

    items = signal<CartItem[]>(this.loadInitial());

    private save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items()));
    }

    addToCart(gpu: GpuResponse) {
        const list = this.items();
        const existing = list.find(item => item.id === gpu.id);

        if (existing) {
            existing.quantity += 1;
            this.items.set([...list]);
        } else {
            this.items.set([
                ...list,
                {
                    id: gpu.id,
                    name: gpu.name,
                    price: gpu.price,
                    manufacturer: gpu.manufacturer?.name ?? 'Fabricante desconhecida',
                    quantity: 1,
                    image: gpu.images?.[0]?.url ?? '/placeholder-gpu.png',
                }
            ]);
        }

        this.save();
    }

    removeItem(id: string) {
        this.items.set(this.items().filter(i => i.id !== id));
        this.save();
    }

    increaseQty(id: string) {
        this.items.update(list => {
            const item = list.find(i => i.id === id);
            if (item) item.quantity++;
            return [...list];
        });
        this.save();
    }

    decreaseQty(id: string) {
        this.items.update(list => {
            const item = list.find(i => i.id === id);
            if (item) {
                item.quantity--;
                if (item.quantity <= 0) {
                    return list.filter(i => i.id !== id);
                }
            }
            return [...list];
        });
        this.save();
    }

    clearCart() {
        this.items.set([]);
        this.save();
    }

    totalItems = computed(() =>
        this.items().reduce((sum, item) => sum + item.quantity, 0)
    );

    totalPrice = computed(() =>
        this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
}
