/**
 * Toast notifications, loaded on demand.
 *
 * Sonner is ~14 kB gzipped and is only ever needed after a form submission, so
 * it must stay out of the initial bundle. The first call fetches it and asks
 * the root layout to mount the <Toaster /> that renders the queue.
 */

type SonnerModule = typeof import("sonner");
type ToastOptions = Parameters<SonnerModule["toast"]>[1];

/** Fired once the sonner chunk is requested so the root can mount its toaster. */
export const TOASTER_READY_EVENT = "ironpeak:toaster-ready";

let sonnerPromise: Promise<SonnerModule> | null = null;
let requested = false;

/** True once any toast has been requested, so a late listener can catch up. */
export function toastRequested(): boolean {
  return requested;
}

function loadSonner(): Promise<SonnerModule> {
  requested = true;
  window.dispatchEvent(new Event(TOASTER_READY_EVENT));
  sonnerPromise ??= import("sonner");
  return sonnerPromise;
}

export const toast = {
  success(message: string, options?: ToastOptions) {
    void loadSonner().then((mod) => mod.toast.success(message, options));
  },
  error(message: string, options?: ToastOptions) {
    void loadSonner().then((mod) => mod.toast.error(message, options));
  },
  message(message: string, options?: ToastOptions) {
    void loadSonner().then((mod) => mod.toast(message, options));
  },
};
