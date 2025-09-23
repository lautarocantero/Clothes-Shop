import type { Dispatch } from "@reduxjs/toolkit"
import { setClothes} from "./shopSlice"
import { loadClothes } from "./loadClothes";


export const startLoadingClothes = () => {

    return async (dispatch: Dispatch) => {
        const clothesList = await loadClothes();
        dispatch(setClothes(clothesList));
    }

}