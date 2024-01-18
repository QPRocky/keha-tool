import { create } from 'zustand';
import ForeignKeyDetails from '../../interfaces/ForeignKeyDetails';

interface State {
  foreignKeyDetails: ForeignKeyDetails[]
  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => void
}

const useForeignKeyStore = create<State>()(set => ({
  foreignKeyDetails: [],

  setForeignKeyDetails: (foreignKeyDetails: ForeignKeyDetails[]) => set({
    foreignKeyDetails
  }),

}));

export default useForeignKeyStore;
