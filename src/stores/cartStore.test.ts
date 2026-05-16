import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCartStore } from "./cartStore";
import type { Product } from "@/types/product";

vi.mock("sonner", () => {
  const fn = vi.fn();
  fn.success = vi.fn();
  fn.error = vi.fn();
  fn.warning = vi.fn();
  fn.info = vi.fn();
  return { toast: fn };
});

const mkProduct = (id: string, price: number): Product => ({
  id,
  name: `Beer ${id}`,
  description: "test",
  price,
  image: "",
  category: "piwo",
  abv: 5,
  funFact: "",
});

const reset = () =>
  useCartStore.setState({ items: [], coupon: null, lastInvalidated: null, isOpen: false, removalStreak: 0 });

describe("cartStore — coupon validation on quantity changes", () => {
  beforeEach(() => reset());

  it("invalidates a minTotal coupon when quantity drops below threshold", () => {
    const p = mkProduct("p1", 30); // 3x = 90, below 100
    const { addItem, applyCoupon, updateQuantity } = useCartStore.getState();
    addItem(p);
    addItem(p);
    addItem(p);
    addItem(p); // 4x30 = 120
    const r = applyCoupon("WELCOME"); // minTotal 50, fixed 15
    expect(r.ok).toBe(true);
    expect(useCartStore.getState().coupon?.code).toBe("WELCOME");

    // Drop to 1x30 = 30 < 50
    updateQuantity("p1", 1);
    const s = useCartStore.getState();
    expect(s.coupon).toBeNull();
    expect(s.lastInvalidated?.reason).toBe("minTotal");
    expect(s.lastInvalidated?.coupon.code).toBe("WELCOME");
    expect(s.lastInvalidated?.subtotalAtInvalidation).toBe(30);
  });

  it("invalidates with reason emptyCart when removing all items", () => {
    const p = mkProduct("p1", 60);
    const { addItem, applyCoupon, removeItem } = useCartStore.getState();
    addItem(p);
    applyCoupon("WELCOME");
    removeItem("p1");
    const s = useCartStore.getState();
    expect(s.coupon).toBeNull();
    expect(s.lastInvalidated?.reason).toBe("emptyCart");
  });

  it("keeps coupon active while threshold is still met", () => {
    const p = mkProduct("p1", 60);
    const { addItem, applyCoupon, updateQuantity } = useCartStore.getState();
    addItem(p);
    addItem(p); // 120
    applyCoupon("WELCOME"); // minTotal 50
    updateQuantity("p1", 1); // 60 still >= 50
    expect(useCartStore.getState().coupon?.code).toBe("WELCOME");
  });

  it("discount() returns 0 when coupon is invalidated", () => {
    const p = mkProduct("p1", 60);
    const { addItem, applyCoupon, updateQuantity, discount } = useCartStore.getState();
    addItem(p);
    applyCoupon("WELCOME");
    updateQuantity("p1", 0); // empties cart
    expect(discount()).toBe(0);
  });
});

describe("cartStore — reapplyLastInvalidated", () => {
  beforeEach(() => reset());

  it("reapplies coupon when threshold is reached again", () => {
    const p = mkProduct("p1", 30);
    const { addItem, applyCoupon, updateQuantity, reapplyLastInvalidated } =
      useCartStore.getState();
    addItem(p);
    addItem(p); // 60
    applyCoupon("WELCOME"); // minTotal 50
    updateQuantity("p1", 1); // 30 -> invalidated
    expect(useCartStore.getState().coupon).toBeNull();

    updateQuantity("p1", 3); // 90 >= 50
    const r = reapplyLastInvalidated();
    expect(r.ok).toBe(true);
    const s = useCartStore.getState();
    expect(s.coupon?.code).toBe("WELCOME");
    expect(s.lastInvalidated).toBeNull();
  });

  it("fails to reapply when threshold is still not met", () => {
    const p = mkProduct("p1", 30);
    const { addItem, applyCoupon, updateQuantity, reapplyLastInvalidated } =
      useCartStore.getState();
    addItem(p);
    addItem(p); // 60
    applyCoupon("WELCOME");
    updateQuantity("p1", 1); // 30 -> invalidated
    const r = reapplyLastInvalidated();
    expect(r.ok).toBe(false);
    expect(useCartStore.getState().coupon).toBeNull();
  });

  it("returns error when there is no invalidated coupon to reapply", () => {
    const r = useCartStore.getState().reapplyLastInvalidated();
    expect(r.ok).toBe(false);
  });

  it("dismissInvalidated clears the invalidated record", () => {
    const p = mkProduct("p1", 30);
    const { addItem, applyCoupon, updateQuantity, dismissInvalidated } =
      useCartStore.getState();
    addItem(p);
    addItem(p);
    applyCoupon("WELCOME");
    updateQuantity("p1", 1);
    expect(useCartStore.getState().lastInvalidated).not.toBeNull();
    dismissInvalidated();
    expect(useCartStore.getState().lastInvalidated).toBeNull();
  });
});

describe("cartStore — delivery fee", () => {
  beforeEach(() => reset());

  it("charges delivery fee when subtotal is below threshold", () => {
    const { addItem, subtotal, deliveryFee, total } = useCartStore.getState();
    const p = mkProduct("p1", 30);
    addItem(p);
    addItem(p); // 60 < 100
    expect(subtotal()).toBe(60);
    expect(deliveryFee()).toBe(9.99);
    expect(total()).toBeCloseTo(60 + 9.99, 2);
  });

  it("gives free delivery when subtotal meets threshold", () => {
    const { addItem, subtotal, deliveryFee, total } = useCartStore.getState();
    const p = mkProduct("p1", 60);
    addItem(p);
    addItem(p); // 120 >= 100
    expect(subtotal()).toBe(120);
    expect(deliveryFee()).toBe(0);
    expect(total()).toBe(120);
  });

  it("returns 0 delivery fee for empty cart", () => {
    const { deliveryFee } = useCartStore.getState();
    expect(deliveryFee()).toBe(0);
  });

  it("includes delivery fee in total even with coupon", () => {
    const { addItem, applyCoupon, subtotal, deliveryFee, total } = useCartStore.getState();
    const p = mkProduct("p1", 30);
    addItem(p);
    addItem(p); // 60 < 100, delivery fee applies
    applyCoupon("FISZ10"); // 10% off
    expect(subtotal()).toBe(60);
    expect(deliveryFee()).toBe(9.99);
    // total = subtotal - discount + deliveryFee
    expect(total()).toBeCloseTo(60 - 6 + 9.99, 2);
  });

  it("gives free delivery with coupon when subtotal meets threshold", () => {
    const { addItem, applyCoupon, subtotal, deliveryFee, total } = useCartStore.getState();
    const p = mkProduct("p1", 60);
    addItem(p);
    addItem(p); // 120 >= 100
    applyCoupon("FISZ10"); // 10% off
    expect(deliveryFee()).toBe(0);
    expect(total()).toBeCloseTo(120 - 12, 2);
  });
});
