import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const { accessToken, loading: authLoading } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get favorites from Django
    const getFavorites = async () => {
        if (!accessToken) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8000/api/favorites/",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                return;
            }

            setFavorites(data);
        } catch (error) {
            console.log("Get favorites error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Get favorites when user logs in
    useEffect(() => {
        if (authLoading) return;

        getFavorites();
    }, [accessToken, authLoading]);

    // Check if a movie/show is favorite
    const isFavorite = (tmdbId, mediaType) => {
        return favorites.some(
            (favorite) =>
                favorite.tmdb_id === tmdbId &&
                favorite.media_type === mediaType
        );
    };

    // Add favorite
    const addFavorite = async (tmdbId, mediaType) => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/favorites/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        tmdb_id: tmdbId,
                        media_type: mediaType,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                return false;
            }

            setFavorites((prev) => [...prev, data]);

            return true;
        } catch (error) {
            console.log("Add favorite error:", error);
            return false;
        }
    };

    // Remove favorite
    const removeFavorite = async (tmdbId, mediaType) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/favorites/${mediaType}/${tmdbId}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                return false;
            }

            setFavorites((prev) =>
                prev.filter(
                    (favorite) =>
                        !(
                            favorite.tmdb_id === tmdbId &&
                            favorite.media_type === mediaType
                        )
                )
            );

            return true;
        } catch (error) {
            console.log("Remove favorite error:", error);
            return false;
        }
    };

    // Toggle favorite
    const toggleFavorite = async (tmdbId, mediaType) => {
        if (isFavorite(tmdbId, mediaType)) {
            return await removeFavorite(tmdbId, mediaType);
        }

        return await addFavorite(tmdbId, mediaType);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                loading,
                isFavorite,
                addFavorite,
                removeFavorite,
                toggleFavorite,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}