import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  closing?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  private generateId() {
    return crypto.randomUUID();
  }

  private findDuplicate(message: string, type: ToastType): Toast | undefined {
    return this.toastsSignal()
      .find(t => t.message === message && t.type === type && !t.closing);
  }

  show(message: string, type: ToastType, duration = 3500) {
    const duplicate = this.findDuplicate(message, type);

    if (duplicate) {
      this.update(duplicate.id, message, type, duration);

      if (type !== 'loading') {
        setTimeout(() => this.dismiss(duplicate.id), duration);
      }

      return duplicate.id;
    }

    const toast: Toast = {
      id: this.generateId(),
      message,
      type,
      duration,
    };

    this.toastsSignal.update((prev) => [...prev, toast]);

    if (type !== 'loading') {
      setTimeout(() => this.dismiss(toast.id), duration);
    }

    return toast.id;
  }

  success(msg: string) {
    return this.show(msg, 'success');
  }

  error(msg: string) {
    return this.show(msg, 'error');
  }

  warning(msg: string) {
    return this.show(msg, 'warning');
  }

  info(msg: string) {
    return this.show(msg, 'info');
  }

  loading(msg: string) {
    return this.show(msg, 'loading', 999999);
  }

  async promise<toast>(
    promise: Promise<toast>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) {
    const id = this.loading(messages.loading);

    try {
      const result = await promise;
      this.update(id, messages.success, 'success', 3500);
      setTimeout(() => this.dismiss(id), 3500);
      return result;
    } catch (err) {
      this.update(id, messages.error, 'error', 3500);
      setTimeout(() => this.dismiss(id), 3500);
      throw err;
    }
  }

  update(id: string, message: string, type: ToastType, duration?: number) {
    this.toastsSignal.update((arr) =>
      arr.map((toast) =>
        toast.id === id
          ? { ...toast, message, type, duration: duration ?? toast.duration }
          : toast
      )
    );
  }

  dismiss(id: string) {
    this.toastsSignal.update((arr) =>
      arr.map(toast =>
        toast.id === id ? { ...toast, closing: true } : toast
      )
    );

    setTimeout(() => {
      this.toastsSignal.update((arr) => arr.filter((toast) => toast.id !== id));
    }, 200);
  }
}
