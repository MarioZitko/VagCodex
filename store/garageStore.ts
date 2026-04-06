import { create } from 'zustand';
import type { Vehicle } from '@/types';

interface GarageState {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: string) => void;
}

export const useGarageStore = create<GarageState>((set) => ({
  vehicles: [],
  addVehicle: (vehicle) =>
    set((state) => ({ vehicles: [...state.vehicles, vehicle] })),
  removeVehicle: (id) =>
    set((state) => ({ vehicles: state.vehicles.filter((v) => v.id !== id) })),
}));
