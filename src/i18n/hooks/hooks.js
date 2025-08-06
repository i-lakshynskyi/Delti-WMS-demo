import { useTranslation } from 'react-i18next';
import useStore from "../../store/useStore.js";

export function usePageTranslation() {
    const currentPage = useStore((state) => state.currentPage);
    const namespace = currentPage?.page || 'common';

    return useTranslation(namespace);
}
