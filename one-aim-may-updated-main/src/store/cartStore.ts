import { CartStore, Course, Discount } from "@/types";
import { create } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";

interface CartState {
  courses: CartStore[];
  coupon: Discount;
  addCourse: (course: CartStore) => void;
  removeCourse: (courseId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: Discount) => void;
  removeCoupon: () => void; // Optional: if you want to allow removing/resetting coupon
}

type CartPersist = {
  courses: CartStore[];
  coupon: Discount;
};

const persistOptions: PersistOptions<CartState, CartPersist> = {
  name: "cart-storage", // unique name for the storage
  storage: createJSONStorage(() =>
    typeof window !== "undefined" ? window.localStorage : (undefined as any)
  ), // use localStorage for persistence, undefined for SSR
  partialize: (state) => ({ courses: state.courses, coupon: state.coupon }), // Persist coupon state
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      courses: [],
      coupon: { code: "", percentage: 0 }, // Initial coupon state
      addCourse: (course) =>
        set((state) => {
          // Prevent adding duplicate courses
          if (
            state.courses.find(
              (c) => c.slug === course.slug && c.type === course.type
            )
          ) {
            return state;
          }

          return { courses: [...state.courses, course] };
        }),
      removeCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter((course) => course.slug !== courseId),
        })),
      clearCart: () =>
        set({ courses: [], coupon: { code: "", percentage: 0 } }), // Clear coupon on cart clear
      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: { code: "", percentage: 0 } }), // Optional
    }),
    persistOptions
  )
);
