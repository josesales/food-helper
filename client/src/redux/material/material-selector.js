import { createSelector } from "reselect";

const selectMaterialState = state => state.material;

export const selectMaterials = createSelector([selectMaterialState], materialState => materialState.materials);
