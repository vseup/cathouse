import { CatState, CatType, catTypeImagesMap } from "$lib/constants/cat_sprites";

export function getImageByTypeAndState(type: CatType, state: CatState): string {
    const images = catTypeImagesMap.get(type)!;
    switch (state) {
        case CatState.WALK: return images[0];
        case CatState.SLEEP: return images[1];
        case CatState.SIT: return images[2];
        case CatState.LIE: return images[3];
        case CatState.RUN: return images[4];
        case CatState.CLEAN: return images[5];
        case CatState.CUDDLE: return images[6];
        case CatState.BAKING: return images[7];
    }
}

export function getIdleImageByType(type: CatType) {
    return catTypeImagesMap.get(type)![8];
}