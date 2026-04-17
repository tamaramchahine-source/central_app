import { create } from "zustand"
import type { Supplier, SupplierFilters } from "@/lib/types"

interface SuppliersState {
  suppliers: Supplier[]
  filters: SupplierFilters
  isLoading: boolean
  setSuppliers: (suppliers: Supplier[]) => void
  addSupplier: (supplier: Supplier) => void
  updateSupplier: (id: string, data: Partial<Supplier>) => void
  deleteSupplier: (id: string) => void
  setFilters: (filters: SupplierFilters) => void
  setLoading: (loading: boolean) => void
}

export const useSuppliersStore = create<SuppliersState>((set) => ({
  suppliers: [],
  filters: {},
  isLoading: false,
  setSuppliers: (suppliers) => set({ suppliers }),
  addSupplier: (supplier) =>
    set((state) => ({ suppliers: [...state.suppliers, supplier] })),
  updateSupplier: (id, data) =>
    set((state) => ({
      suppliers: state.suppliers.map((s) =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    })),
  deleteSupplier: (id) =>
    set((state) => ({
      suppliers: state.suppliers.filter((s) => s.id !== id),
    })),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
}))
